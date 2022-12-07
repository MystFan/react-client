import { Outlet, Navigate } from "react-router-dom";
import { connect } from 'react-redux';

import { AppState } from "../../store/appState";
import IUser from "../../models/user.model";

type RouteGuardProps = {
    user: IUser
};

const RouteGuard = (props: RouteGuardProps) => {
    return (
        props.user.isAuth ? <Outlet /> : <Navigate to="/login" />
    )
}

function mapStateToProps(state: AppState) {
    return {
        user: state.users.user
    };
}

export default connect(
    mapStateToProps
) (RouteGuard);