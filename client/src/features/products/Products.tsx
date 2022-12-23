import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useStyletron } from 'baseui';
import { Avatar } from 'baseui/avatar';
import { CustomColumn, RowAction, StatefulDataTable, StringColumn } from 'baseui/data-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

import IProduct from '../../models/product.model';
import ProductActions, { ThunkDeleteProductFunction, ThunkLoadProductsFunction } from '../../store/products/product.actions';
import { AppState } from '../../store/appState';
import ProductEdit from './ProductEdit';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';

type ProductsProps = {
    products: IProduct[],
    loadProducts: ThunkLoadProductsFunction,
    deleteProduct: ThunkDeleteProductFunction
};

type RowData = {
    id: number,
    name: string,
    price: number,
    product: IProduct
};

const newProduct: IProduct = {
    id: 0,
    name: "",
    price: 0,
    image: ""
}

const Products = (props: ProductsProps) => {
    const [css, theme] = useStyletron();
    const [isEdit, setIsEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(newProduct);

    useEffect(() => {
        if (props.products.length === 0) {
            props.loadProducts();
        }
    }, [])

    const rowActions: RowAction[] = [
        {
            label: 'Edit',
            onClick: ({ row }) => {
                setEditProduct((prev: IProduct) => {
                    return { ...row.data.product }
                });
                setIsEdit(true);
            },
            renderIcon: FaEdit
        },
        {
            label: 'Delete',
            onClick: ({ row }) => {
                const product: IProduct = { ...row.data.product };
                props.deleteProduct(product);
            },
            renderIcon: FaTrash
        }
    ];

    const handleAdd = () => {
        setIsEdit(true);
        setEditProduct(newProduct)
    }

    return (
        <>
            <h1 className={css({ paddingLeft: "10px" })}>Products</h1>
            <div className={css({ height: "700px", maxHeight: '700px', paddingLeft: "10px", paddingRight: "10px" })}>
                <Button
                    onClick={() => handleAdd()}
                    kind={KIND.primary}
                    size={SIZE.default}
                    shape={SHAPE.default}
                >
                    Add
                </Button>
                <StatefulDataTable
                    filterable={false}
                    resizableColumnWidths={true}
                    columns={columns}
                    rowActions={rowActions}
                    rowHeight={64}
                    rows={props.products.map((product: IProduct) => {
                        return { data: { id: product.id, name: product.name, price: product.price, product }, id: product.id }
                    })}
                />
            </div>
            {isEdit && <ProductEdit isOpen={isEdit} close={() => setIsEdit(false)} save={() => true} product={editProduct}></ProductEdit>}
        </>
    )
}

function mapStateToProps(state: AppState, ownProps: any) {
    return {
        products: state.productState.products.length === 0 ? [] : state.productState.products
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadProducts: bindActionCreators(ProductActions.loadProducts, dispatch),
        deleteProduct: bindActionCreators(ProductActions.deleteProduct, dispatch)
    };
}

const columns = [
    StringColumn({
        title: 'Name', mapDataToValue(data: RowData) {
            return data.name;
        },
    }),
    CustomColumn<number, {}>({
        title: 'Price',
        mapDataToValue(data: RowData) {
            return data.price;
        },
        renderCell: (props: { value: number }) => {
            const [css, theme] = useStyletron();
            return (
                <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <span className={css({ ...theme.typography.MonoParagraphSmall })}>
                        {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(props.value)}
                    </span>
                </div>
            );
        },
    }),
    CustomColumn<IProduct, {}>({
        title: 'Image',
        mapDataToValue(data: RowData) {
            return data.product;
        },
        renderCell: (props: { value: IProduct }) => {
            const [css] = useStyletron();

            return (
                <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <Avatar name={props.value.name} size="48px" src={props.value.image} />
                </div>
            );
        }
    })
];

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);
