import { Outlet, Navigate, useLocation } from "react-router-dom";
import { connect } from 'react-redux';

import { AppState } from "../../../store/appState";
import IUser from "../../../models/user.model";

type RouteGuardProps = {
    user: IUser
};

const RouteGuard = (props: RouteGuardProps) => {
    const loacation = useLocation();
    return (
        props.user.isAuth ? <Outlet /> : <Navigate replace to="/login" state={loacation} />
    )
}

function mapStateToProps(state: AppState) {
    return {
        user: state.userState.user
    };
}

export default connect(
    mapStateToProps
)(RouteGuard);