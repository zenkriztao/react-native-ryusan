import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    Button,
    ButtonIcon
} from "rmwc";

class Header extends Component {
    static propTypes = {
        userName: PropTypes.string,
        isAuthenticated: PropTypes.bool.isRequired,
        logoutAction: PropTypes.func.isRequired
    };

    render() {
        const { history, isAuthenticated, logoutAction, userName } = this.props;

        return (
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarTitle>
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <Button theme="onPrimary">
                                        {userName}
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/">
                                    <Button theme="onPrimary">App</Button>
                                </Link>
                            )}
                        </TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <Link to="/about">
                            <Button unelevated>Tentang</Button>
                        </Link>
                        {isAuthenticated ? (
                            <div>
                                <Link to="/leaderboard">
                                    <Button unelevated>Peringkat</Button>
                                </Link>
                                &nbsp;
                                <Button
                                    unelevated
                                    theme="secondary-bg on-secondary"
                                    onClick={() => {
                                        logoutAction();
                                        history.push("/");
                                        window.location.reload();
                                    }}
                                >
                                    <ButtonIcon icon="exit_to_app" />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Link to="/sign-up">
                                    <Button unelevated>Daftar</Button>
                                </Link>
                                <Link to="/login">
                                    <Button unelevated>Login</Button>
                                </Link>
                            </div>
                        )}
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
        );
    }
}

const mapStateToProps = state => ({
    userName: selectors.getCurrentUserName(state),
    isAuthenticated: selectors.getIsAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(actions.logoutRequest())
});

const ConnectedHeader = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Header)
);

export default ConnectedHeader;
