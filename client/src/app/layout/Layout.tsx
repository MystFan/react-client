import { useState } from 'react'

import { styled } from 'baseui';

import Sidebar from './Sidebar';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import { connect } from 'react-redux';
import { AppState } from '../../store/appState';
import Loader from '../common/components/Loader';

type LayoutProps = {
    loading: boolean
}

const Layout = (props: LayoutProps) => {
    const [open, setOpen] = useState(false);

    const openMenu = (open: boolean) => {
        setOpen(open);
    }

    return (
        <LayoutWrapper>
            <Loader loading={props.loading}></Loader>
            <Sidebar open={open} setOpen={openMenu} />
            <LayoutHeader title={'Products App'} open={open} setOpen={openMenu} />
            <LayoutContent />
        </LayoutWrapper>
    )
}

function mapStateToProps(state: AppState, ownProps: any) {
    return {
        loading: state.commonState.httpRequestsInProgress > 0
    };
}

export default connect(
    mapStateToProps,
    null
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
