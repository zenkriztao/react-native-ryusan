import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import { LinearProgress } from "rmwc";
import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableBody,
    DataTableHeadCell,
    DataTableRow,
    DataTableCell
} from "@rmwc/data-table";
import "@rmwc/data-table/data-table.css";

class Leaderboard extends Component {
    static propTypes = {
        data: PropTypes.array,
        getLeaderboard: PropTypes.func.isRequired,
        isPending: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired
    };

    static defaultProps = {
        data: []
    };

    componentWillMount() {
        this.props.getLeaderboard();
    }

    render() {
        const { data, isPending, isError } = this.props;

        return (
            <DataTable>
                <DataTableContent style={{ minWidth: "250px" }}>
                    <DataTableHead>
                        <DataTableRow>
                            <DataTableHeadCell>Pengguna</DataTableHeadCell>
                            <DataTableHeadCell alignEnd>
                                Poin Diraih
                            </DataTableHeadCell>
                        </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                        {isPending ? (
                            <DataTableRow>
                                <DataTableCell alignMiddle colSpan="2">
                                    <LinearProgress determinate={false} />
                                </DataTableCell>
                            </DataTableRow>
                        ) : null}
                        {isError ? (
                            <DataTableRow activated>
                                <DataTableCell alignMiddle colSpan="2">
                                    Coba Lagi Nanti
                                </DataTableCell>
                            </DataTableRow>
                        ) : null}
                        {data.length > 0
                            ? data.map((user, index) => (
                                  <DataTableRow key={index}>
                                      <DataTableCell>{user.name}</DataTableCell>
                                      <DataTableCell alignEnd>
                                          {user.total_points}
                                      </DataTableCell>
                                  </DataTableRow>
                              ))
                            : null}
                    </DataTableBody>
                </DataTableContent>
            </DataTable>
        );
    }
}

const mapStateToProps = state => ({
    data: selectors.getLeaderboard(state),
    isPending: selectors.getLeaderboardIsPending(state),
    isError: selectors.getLeaderboardIsError(state)
});

const mapDispatchToProps = dispatch => ({
    getLeaderboard: () => dispatch(actions.getLeaderboard())
});

const ConnectedLeaderboard = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Leaderboard)
);

export default ConnectedLeaderboard;
