import { useState } from 'react'

import { styled } from 'baseui';

import Sidebar from './Sidebar';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';

const Layout = () => {
    const [open, setOpen] = useState(false);

    const openMenu = (open: boolean) => {
        setOpen(open);
    }

    return (
        <LayoutWrapper>
            <Sidebar open={open} setOpen={openMenu} />
            <LayoutHeader title={'Products App'} open={open} setOpen={openMenu} />
            <LayoutContent />
        </LayoutWrapper>
    )
}

export default Layout;

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