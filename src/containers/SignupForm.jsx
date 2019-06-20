import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Record } from "immutable";
import ApplicationService from "../services/ApplicationService";
import { TextField, Button, Snackbar } from "rmwc";

const ErrorRecord = Record({
    name: null,
    password: null
});

const InputRecord = Record({
    name: "",
    password: ""
});

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: new ErrorRecord({}),
            inputs: new InputRecord({}),
            isSnackbarOpen: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    onSubmit(event) {
        const { inputs } = this.state;

        event.preventDefault();

        ApplicationService.register(inputs.get("name"), inputs.get("password"))
            .then(() => {
                ApplicationService.login(
                    inputs.get("name"),
                    inputs.get("password")
                ).then(() => {
                    this.props.history.push("/dashboard");
                    window.location.reload();
                });
            })
            .catch(err => {
                this.setState({
                    errors: new ErrorRecord(err),
                    isSnackbarOpen: true
                });
            });
    }

    onTextFieldChange(event) {
        const { inputs } = this.state;

        this.setState({
            inputs: inputs.set(event.target.name, event.target.value)
        });
    }

    render() {
        const { inputs, errors } = this.state;

        return (
            <form onSubmit={this.onSubmit} method="post">
                <TextField
                    fullwidth
                    placeholder="Nama Pengguna"
                    value={inputs.get("name")}
                    onChange={this.onTextFieldChange}
                    type="text"
                    name="name"
                    invalid={errors.get("name") !== null}
                />
                <TextField
                    fullwidth
                    placeholder="Kata Sandi "
                    value={inputs.get("password")}
                    onChange={this.onTextFieldChange}
                    type="password"
                    name="password"
                    invalid={errors.get("password") !== null}
                />
                <br />
                <Button type="submit" raised theme="secondary-bg on-secondary">
                Daftar
                </Button>
                {Object.values(errors.toJS()).map(
                    (error, index) =>
                        error && (
                            <Snackbar
                                key={index}
                                show={this.state.isSnackbarOpen}
                                onHide={() =>
                                    this.setState({ isSnackbarOpen: false })
                                }
                                message={error}
                                actionText="Dismiss"
                            />
                        )
                )}
            </form>
        );
    }
}

export default withRouter(RegisterForm);
