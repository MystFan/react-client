import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem,
    StyledNavigationList,
} from 'baseui/header-navigation';
import { Avatar } from "baseui/avatar";
import { useStyletron } from 'baseui';

import Menu from 'baseui/icon/menu'

type LayoutHeaderProps = {
    title: string,
    open: boolean,
    setOpen: Function
}

const LayoutHeader = (props: LayoutHeaderProps) => {
    const [css] = useStyletron();

    return (
        <div className={css({ 
            width: '100%', 
            borderBottom: 'none !important', 
            marginBottom: '1.5rem', 
            '@media (max-width: 768px)': { 
                paddingLeft: '0' 
            } 
        })}>
            <HeaderNavigation >
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem className={css({ fontSize: '1.5rem' })}>
                        <div className={css({ 
                            display: 'none', 
                            '@media (max-width: 768px)': { 
                                display: 'block'
                            } 
                        })}>
                            <Menu size='1.5rem' onClick={() => props.setOpen(!props.open)} />
                        </div>
                        <span className={css({ 
                            display: 'block', 
                            '@media (max-width: 768px)': { 
                                display: 'none' 
                            } 
                        })}>
                            {props.title}
                        </span>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center} />
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <Avatar
                            name="Jane Doe"
                            size="2.5rem"
                            src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy"
                        />
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>
        </div>
    )
}

export default LayoutHeader;
