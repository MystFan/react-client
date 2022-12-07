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
import * as ProductActions from '../../store/products/product.actions';
import { AppState } from '../../store/appState';
import { Avatar } from 'baseui/avatar';

type ProductListProps = {
    products: IProduct[],
    actions: {
        loadProducts: Function
    }
};

const ProductList = (props: ProductListProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.products.length === 0) {
            props.actions.loadProducts();
        }
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
        products: state.products.all.length === 0 ? [] : state.products.all
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: {
            loadProducts: bindActionCreators(ProductActions.getProducts, dispatch)
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ProductList);