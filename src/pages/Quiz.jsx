import React, { Component } from "react";
import QuizContainer from "../containers/Quiz";
import { Theme } from "rmwc";

export default class Quiz extends Component {
    render() {
        const { quizId } = this.props.match.params;
        return (
            <Theme tag="main" use="primary-bg on-primary">
                <QuizContainer quizId={quizId} />
            </Theme>
        );
    }
}
