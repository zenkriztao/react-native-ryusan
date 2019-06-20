import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import selectors from "../redux/selectors";
import Loading from "../pages/Loading";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationService from "../services/ApplicationService";

class Locked extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    componentDidMount() {
        ApplicationService.authenticateUser().then(response => {
            if (!response.isAuthenticated) {
                this.props.history.push("/");
            }
        });
    }

    render() {
        return this.props.isAuthenticated ? this.props.children : <Loading />;
    }
}

const mapStateToProps = state => ({
    isAuthenticated: selectors.getIsAuthenticated(state)
});

const ConnectedLocked = withRouter(connect(mapStateToProps)(Locked));

export default ConnectedLocked;
