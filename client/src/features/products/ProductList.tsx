import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styled, useStyletron } from 'baseui';
import { FaLightbulb } from 'react-icons/fa';
import {
    TableBuilder,
    TableBuilderColumn,
} from "baseui/table-semantic";

import IProduct from '../../models/product.model';
import ProductActions from '../../store/products/product.actions';
import { AppState } from '../../store/appState';
import { Avatar } from 'baseui/avatar';

type ProductListProps = {
    products: IProduct[],
    loadProducts: Function
};

const ProductList = (props: ProductListProps) => {
    useEffect(() => {
        if (props.products.length === 0) {
            props.loadProducts();
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
        products: state.productState.products.length === 0 ? [] : state.productState.products
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadProducts: bindActionCreators(ProductActions.loadProducts, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);