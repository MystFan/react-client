import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';

import { AppState } from "../../../store/appState";
import IUser from "../../../models/user.model";

type RedirectGuardProps = {
    user: IUser
};

const RedirectGuard = (props: RedirectGuardProps) => {
    return (
        props.user.isAuth ? <Navigate to="/" /> : <Navigate to="/login" />
    )
}

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user
    };
}

export default connect(
    mapStateToProps
)(RedirectGuard);