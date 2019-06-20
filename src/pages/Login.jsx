import React, { Component } from "react";
import LoginForm from "../containers/LoginForm";
import Header from "../containers/Header";
import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

export default class Login extends Component {
    render() {
        return (
            <Theme tag="main">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                    <Typography use="headline5" tag="h2">
                            Login Online 
                        </Typography>
                        <LoginForm />
                    </div>
                </div>
            </Theme>
        );
    }
}
