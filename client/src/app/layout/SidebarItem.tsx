import { ReactNode } from 'react'

import { styled } from 'baseui';

type SidebarItemProps = {
    path: string,
    active: boolean,
    title: string,
    onClick: Function,
    children: ReactNode[] | ReactNode
}

const SidebarItem = (props: SidebarItemProps) => {
    const StyledMenuItem = styled('div', $theme => ({
        padding: '1.15rem 1.2rem',
        background: props.active ? '#9FA2B4' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '1rem',
        color: props.active ? '#DDE2FF' : '#A4A6B3',
        cursor: 'pointer',
        width: '100%',
        borderLeft: props.active ? '4px solid #DDE2FF' : 'none',
        ':hover': {
            background: '#9FA2B4',
            color: '#DDE2FF',
            borderLeft: '4px solid #DDE2FF',
        }
    }))

    return (
        <StyledMenuItem onClick={() => props.onClick(props.title, props.path)}>
            {props.children}
            {props.title}
        </StyledMenuItem>
    )
}

export default SidebarItem;
