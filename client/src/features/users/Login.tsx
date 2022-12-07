import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

import IUserLogin from "../../models/user.login.model";
import IFormError from "../../models/form.error.model";
import * as UserActions from '../../store/users/user.actions';
import { useDispatch } from "react-redux";

const login: IUserLogin = {
    username: "",
    password: ""
}

const errors: IFormError[] = [];

const Login = () => {
    const [userLogin, setUserLogin] = useState(login);
    const [loginErrors, setLoginErrors] = useState(errors);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setUserLogin((prevState: IUserLogin) => {
             return { ...prevState, [name]: value }
        })
    }

    const handleSubmit = () => {
        dispatch(UserActions.authUser(true));
        navigate("/");
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
                            <Input name="username" onChange={handleChange} value={userLogin.username}/>
                         </FormControl>
                         <FormControl
                            label={() => "Password"}
                            error={loginErrors.map(e => e.message).join("")}>
                            <Input name="password" onChange={handleChange} type="password" value={userLogin.password}/>
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

export default Login;

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