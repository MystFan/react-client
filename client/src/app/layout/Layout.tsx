import { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { styled } from 'baseui';
import { ToasterContainer, toaster } from 'baseui/toast';

import Sidebar from './Sidebar';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import { AppState } from '../../store/appState';
import Loader from '../common/components/Loader';
import IRequestError from '../../models/request.error';
import { bindActionCreators } from 'redux';
import CommonActions from '../../store/common/common.actions';

type LayoutProps = {
    loading: boolean,
    requestErrors: IRequestError[],
    removeRequestError: Function
}

const Layout = (props: LayoutProps) => {
    const [open, setOpen] = useState(false);

    const openMenu = (open: boolean) => {
        setOpen(open);
    }

    useEffect(() => {
        if (props.requestErrors.length) {
            const reqError: IRequestError = props.requestErrors.map(e => e).pop() || { error: "", id: "0" };
            const err = { ...reqError };
            const errorKey = toaster.negative(
                <>
                    {err.error}
                </>,
                {
                    overrides: {
                        InnerContainer: {
                            style: { width: "100%" }
                        }
                    }
                }
            );

            err.id = errorKey.toString();
            props.removeRequestError(err);
        }

    }, [props.requestErrors.length])


    return (
        <LayoutWrapper>
            <Loader loading={props.loading}></Loader>
            <ToasterContainer />
            <Sidebar open={open} setOpen={openMenu} />
            <LayoutHeader title={'Products App'} open={open} setOpen={openMenu} />
            <LayoutContent />
        </LayoutWrapper>
    )
}

function mapStateToProps(state: AppState, ownProps: any) {
    return {
        loading: state.commonState.httpRequestsInProgress > 0,
        requestErrors: state.commonState.requestErrors
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        removeRequestError: bindActionCreators(CommonActions.removeRequestError, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

const LayoutWrapper = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: '#F7F8FC',
    position: 'relative',
    paddingLeft: '285px',
    paddingRight: '2rem',
    width: '100%',
    minHeight: '100vh',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    '@media (max-width: 768px)': {
        paddingLeft: '0',
    }
});
