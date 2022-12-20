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
import UserActions from '../../store/users/user.actions';
import { AppState } from "../../store/appState";
import Loader from "../../app/common/components/Loader";
import NegativeIcon from "../../app/common/components/NegativeIcon";

type LoginProps = {
    user: IUser,
    loading: boolean,
    loginUser: Function,
    loadUser: Function
}

const Login = (props: LoginProps) => {
    const [username, setUsername] = useState("");
    const [isUsernameValid, setUsernameIsValid] = useState(false);
    const [isUsernameVisited, setUsernameIsVisited] = useState(false);
    const shouldShowUsernameError = !isUsernameValid && isUsernameVisited;

    const [password, setPassword] = useState("");
    const [isPasswordValid, setPasswordIsValid] = useState(false);
    const [isPasswordVisited, setPasswordIsVisited] = useState(false);
    const shouldShowPasswordError = !isPasswordValid && isPasswordVisited;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        if (name === "username") {
            setUsernameIsValid(value.length > 0);
            setUsername(value);
        } else if (name === "password") {
            setPasswordIsValid(value.length > 0);
            setPassword(value);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userLogin: IUserLogin = {
            username,
            password
        }

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
            <Loader loading={props.loading}></Loader>
            {<LoginWrapper>
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
                        <FormControl label="Username" error={shouldShowUsernameError ? 'Please input a valid username' : null}>
                            <Input name="username"
                                autoFocus={true}
                                onBlur={() => setUsernameIsVisited(true)}
                                error={shouldShowUsernameError}
                                overrides={shouldShowUsernameError ? { After: NegativeIcon } : {}}
                                onChange={handleChange} value={username} />
                        </FormControl>
                        <FormControl label="Password" error={shouldShowPasswordError ? 'Please input a valid password' : null}>
                            <Input name="password"
                                onBlur={() => setPasswordIsVisited(true)}
                                error={shouldShowPasswordError}
                                overrides={shouldShowPasswordError ? { After: NegativeIcon } : {}}
                                onChange={handleChange} type="password" value={password} />
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
            </LoginWrapper>}
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
        user: state.userState.user,
        loading: state.commonState.httpRequestsInProgress > 0
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