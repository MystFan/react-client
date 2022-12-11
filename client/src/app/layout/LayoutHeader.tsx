import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem,
    StyledNavigationList,
} from 'baseui/header-navigation';
import { Avatar } from "baseui/avatar";
import { useStyletron } from 'baseui';
import Menu from 'baseui/icon/menu'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../../store/appState';
import UserActions from '../../store/users/user.actions';
import { Button } from 'baseui/button';
import IUser from '../../models/user.model';

type LayoutHeaderProps = {
    title: string,
    open: boolean,
    user: IUser,
    setOpen: Function,
    logoutUser: Function
}

const LayoutHeader = (props: LayoutHeaderProps) => {
    const [css] = useStyletron();

    const handleLogout = (e: any) => {
        props.logoutUser();
    }

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
                            name={props.user.name}
                            size="2.5rem"
                            src={"https://avatars.dicebear.com/api/human/4.svg?width=285&mood=happy"}
                        />
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Button onClick={handleLogout}>Sign Out</Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>
        </div>
    )
}

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        logoutUser: bindActionCreators(UserActions.logout, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutHeader);
