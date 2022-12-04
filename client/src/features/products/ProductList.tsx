import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useStyletron } from 'baseui';
import { FaLightbulb } from 'react-icons/fa';
import {
    TableBuilder,
    TableBuilderColumn,
} from "baseui/table-semantic";

import IProduct from '../../models/product.model';
import * as ProductActions  from '../../store/products/product.actions';
import { AppState } from '../../store/appState';
import { Avatar } from 'baseui/avatar';

type ProductListProps = {
    products: IProduct[],
    actions: ProductActions.IProductAction
};

const ProductList = (props: ProductListProps) => {
    const dispatch = useDispatch();

    function handleAddProducts(){
        dispatch(ProductActions.addProduct({ id: 229, name: 'Test', price: 10, image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }));
    }

    function handleRemoveProducts(){
        dispatch(ProductActions.removeProduct({ id: 229, name: 'Test', price: 10, image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }));
    }

    useEffect(() => {
        props.actions.getProducts();
    }, [])

    return (
        <>
            <h1>Products</h1>
            <TableBuilder
                overrides={{ Root: { style: { maxHeight: '700px' } } }}
                data={props.products}
            >
                <TableBuilderColumn<IProduct> header="Name">
                    {(product: IProduct) => (
                        product.name
                    )}
                </TableBuilderColumn>
                <TableBuilderColumn<IProduct> header="Price">
                    {(product: IProduct) => (
                        <NumberCell value={product.price} />
                    )}
                </TableBuilderColumn>
                <TableBuilderColumn<IProduct> header="Image">
                    {(product: IProduct) => (
                        product.image ?
                            <AvatarCell
                                src={product.image ? product.image : ""}
                                name={product.name}
                            /> : <FaLightbulb />
                    )}
                </TableBuilderColumn>
            </TableBuilder>
        </>
    )
}

function AvatarCell({ src, name }: { src: string; name: string; }) {
    const [css] = useStyletron();

    return (
        <div className={css({ display: 'flex', alignItems: 'center' })}>
            <Avatar name={name} size="48px" src={src} />
        </div>
    );
}

function NumberCell({ value }: { value: number; }) {
    const [css, theme] = useStyletron();
    return (
        <div className={css({ display: 'flex', alignItems: 'center' })}>
            <span className={css({ ...theme.typography.MonoParagraphSmall })}>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(value)}
            </span>
        </div>
    );
}

function mapStateToProps(state: AppState, ownProps: any) {
    return {
        products: state.products.all
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(ProductActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ProductList);