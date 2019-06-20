import React, { Component } from "react";
import Header from "../containers/Header";
import { Theme, TopAppBarFixedAdjust } from "rmwc";
import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";

export default class Signup extends Component {
    render() {
        return (
            <Theme tag="main">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <CircularProgress size="xlarge" />
                    </div>
                </div>
            </Theme>
        );
    }
}
