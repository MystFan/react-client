import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';

import { styled, useStyletron } from 'baseui';
import { FaLightbulb, FaHome } from 'react-icons/fa';

import SidebarItem from './SidebarItem';
import logo from '../../logo.svg'

type MenuItem = {
    title: string,
    icon: ReactNode,
    active: boolean,
    path: string
}

const menuItems: MenuItem[] = [
    {
        title: 'Overview',
        icon: <FaHome style={{ marginRight: '0.5rem' }} />,
        active: true,
        path: "/overview"
    },
    {
        title: 'Products',
        icon: <FaLightbulb style={{ marginRight: '0.5rem' }} />,
        active: false,
        path: "/products"
    }
]

type SidebarProps = {
    open: boolean,
    setOpen: Function
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
    const [items, setItems] = useState(menuItems);
    const [css] = useStyletron();
    const navigate = useNavigate();
    
    const handleMenuItem = (itemPath: string) => {
        setItems((previousItems: MenuItem[]) => {
            const path = itemPath.split("/").find(i => !!i)
                || menuItems[0].path.split("/").find(i => !!i);

            return previousItems.map((currentItem: MenuItem, index: number) => {
                const currentItemPath = currentItem.path.split("/").find(i => !!i);
                if (currentItemPath === path) {
                    currentItem.active = true;
                } else {
                    currentItem.active = false;
                }

                return currentItem;
            });
        });
    }

    const onClick = (itemPath: string) => {
        handleMenuItem(itemPath)
        navigate(itemPath);
    };

    const location: Location = useLocation();
    useEffect(() => {
        handleMenuItem(location.pathname);
    }, [])


    return (
        <SidebarWrapper className={css({
            '@media (max-width: 768px)': {
                display: open ? 'block' : 'none',
            }
        })}>
            <div className={css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                background: 'rgba(0, 0, 0, 0.5)',
                height: '100vh',
                zIndex: '-1',
                display: 'none',
                '@media (max-width: 768px)': {
                    display: open ? 'block' : 'none',
                }
            })}
                onClick={() => setOpen(!open)}
            />
            <Logo>
                <img className={css({
                    width: '2rem',
                    height: '2rem',
                    marginRight: '0.3rem',
                })} src={logo} alt="logo" />
                Project Name
            </Logo>
            {
                items.map(({ path, icon, title, active }, index) => (
                    <SidebarItem onClick={() => onClick(path)} key={index} path={path} active={active} title={title}>
                        {icon}
                    </SidebarItem>
                ))
            }
        </SidebarWrapper>
    )
}

export default Sidebar;

const SidebarWrapper = styled('section', {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    maxWidth: '255px',
    height: '100vh',
    background: '#363740',
    zIndex: '1',
    overflowX: 'hidden',
});

const Logo = styled('div', {
    padding: '2.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    color: '#f2f2f2',
    fontWeight: 'bold',
    boxSizing: 'border-box',
    background: 'none',
})
