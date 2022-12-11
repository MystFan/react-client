import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
    Card,
    StyledTitle,
    StyledBody,
    StyledAction
} from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { styled } from "baseui";
import { Input } from "baseui/input";

import IUser, { IUserLogin } from "../../models/user.model";
import IFormError from "../../models/form.error.model";
import UserActions from '../../store/users/user.actions';
import { AppState } from "../../store/appState";

const login: IUserLogin = {
    username: "",
    password: ""
}

const errors: IFormError[] = [];

type LoginProps = {
    user: IUser
    loginUser: Function,
    loadUser: Function
}

const Login = (props: LoginProps) => {
    const [userLogin, setUserLogin] = useState(login);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setUserLogin((prevState: IUserLogin) => {
            return { ...prevState, [name]: value }
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.loginUser(userLogin);
    }

    useEffect(() => {
        if (props.user.token) {
            props.loadUser()
        }
    }, [props.user.token])

    if (props.user.isAuth) {
        return <Navigate to="/" />
    }

    return (
        <>
            <LoginWrapper>
                <Card overrides={{
                    Root: {
                        style: {
                            width: "355px",
                            margin: "0 auto",
                            position: "relative",
                            top: "50%",
                            "-ms-transform": "translateY(-50%)",
                            transform: "translateY(-50%)"
                        }
                    }
                }}>
                    <StyledTitle title="Welcome">
                        <LoginHeader>Welcome</LoginHeader>
                    </StyledTitle>
                    <StyledBody>
                        <FormControl
                            label={() => "Username"}>
                            <Input autoFocus={true}
                                required name="username" onChange={handleChange} value={userLogin.username} />
                        </FormControl>
                        <FormControl
                            label={() => "Password"}>
                            <Input name="password" onChange={handleChange} type="password" value={userLogin.password} />
                        </FormControl>
                    </StyledBody>
                    <StyledAction>
                        <Button
                            onClick={handleSubmit}
                            overrides={{
                                BaseButton: { style: { width: "100%" } }
                            }}>
                            Sign In
                        </Button>
                    </StyledAction>
                </Card>
            </LoginWrapper>
        </>
    )
}

const LoginHeader = styled('header', {
    textAlign: 'center',
    width: '100%'
});

const LoginWrapper = styled('section', {
    position: 'absolute',
    margin: '0 auto',
    width: '100%',
    height: '100vh',
    background: '#363740',
    zIndex: '1'
});

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        loginUser: bindActionCreators(UserActions.login, dispatch),
        loadUser: bindActionCreators(UserActions.loadUserFromStore, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);