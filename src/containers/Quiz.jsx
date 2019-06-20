import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import {
    Typography,
    Button,
    ButtonIcon,
    Grid,
    GridCell,
    List,
    ListItem,
    ListItemGraphic,
    ThemeProvider,
    TopAppBarFixedAdjust,
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    LinearProgress,
    Chip,
    ChipSet,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from "rmwc";
import { CircularProgress } from "@rmwc/circular-progress";

import "@rmwc/circular-progress/circular-progress.css";

const TIME_TO_ANSWER_QUESTION = 10;

class Quiz extends Component {
    static propTypes = {
        quizId: PropTypes.string.isRequired,
        quizName: PropTypes.string,
        joinQuizRequest: PropTypes.func.isRequired,
        leaveQuizRequest: PropTypes.func.isRequired,
        answerQuestionRequest: PropTypes.func.isRequired,
        data: PropTypes.object,
        error: PropTypes.string,
        waitForUsersCount: PropTypes.number.isRequired,
        isInProgress: PropTypes.bool.isRequired,
        isFinished: PropTypes.bool.isRequired,
        isUnexpectedFinished: PropTypes.bool.isRequired,
        activeQuestion: PropTypes.object,
        activeUsers: PropTypes.array.isRequired,
        jwtError: PropTypes.string
    };

    static defaultProps = {
        data: {}
    };

    constructor(props) {
        super(props);

        this.getAnswerIcon = this.getAnswerIcon.bind(this);
        this.handleTimerTick = this.handleTimerTick.bind(this);
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);

        this.state = {
            timer: TIME_TO_ANSWER_QUESTION,
            isPaused: true,
            isDialogOpen: false
        };
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.activeQuestion.questionId !==
            prevProps.activeQuestion.questionId
        ) {
            this.handleStartTimer();
        }
    }

    componentDidMount() {
        this.props.joinQuizRequest(this.props.quizId);
    }

    componentWillUnmount() {
        this.props.leaveQuizRequest(this.props.quizId);
    }

    handleTimerTick() {
        this.setState({ timer: this.state.timer - 1 });
    }

    handleStartTimer() {
        clearInterval(this.interval);
        this.setState({ timer: TIME_TO_ANSWER_QUESTION, isPaused: true });

        this.interval = setInterval(this.handleTimerTick, 1000);
        this.setState({ isPaused: false });
    }

    handleStopTimer() {
        clearInterval(this.interval);
        this.setState({ isPaused: true });
    }

    handleAnswerClick(answerId) {
        if (this.props.activeQuestion.question.userAnswer.answerId !== null) {
            return;
        }

        this.props.answerQuestionRequest({
            quizId: this.props.quizId,
            questionId: this.props.activeQuestion.questionId,
            answerId: answerId
        });

        this.handleStopTimer();
    }

    getAnswerIcon(answerId) {
        const { activeQuestion } = this.props;

        if (activeQuestion.question.userAnswer.answerId === null) {
            return "radio_button_unchecked";
        }

        if (activeQuestion.question.userAnswer.answerId !== answerId) {
            return "radio_button_unchecked";
        }

        if (activeQuestion.question.userAnswer.isCorrect) {
            return "check";
        }

        return "close";
    }

    handleDialogOpen() {
        this.setState({ isDialogOpen: true });
    }

    handleDialogClose(evt) {
        this.setState({ isDialogOpen: false });

        if (evt.detail.action === "accept") {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        const {
            error,
            waitForUsersCount,
            isInProgress,
            isFinished,
            isUnexpectedFinished,
            quizName,
            activeQuestion,
            activeUsers,
            jwtError
        } = this.props;

        const { isPaused } = this.state;

        const timer = new Date(this.state.timer * 1000);

        return (
            <div>
                <Dialog open={jwtError !== ""}>
                    <DialogTitle>Authentication Error</DialogTitle>
                    <DialogContent>{jwtError}</DialogContent>
                    <DialogActions>
                        <Link to="/dashboard">
                            <DialogButton>Tutup</DialogButton>
                        </Link>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.isDialogOpen}
                    onClose={evt => this.handleDialogClose(evt)}
                >
                    <DialogTitle>Apakah kamu yakin</DialogTitle>
                    <DialogContent>Anda tidak akan mendapatkan poin</DialogContent>
                    <DialogActions>
                        <DialogButton action="close">Batal</DialogButton>
                        <DialogButton action="accept" isDefaultAction>
                            Yes
                        </DialogButton>
                    </DialogActions>
                </Dialog>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection alignEnd>
                            {isInProgress ? (
                                <Button
                                    unelevated
                                    onClick={this.handleDialogOpen}
                                >
                                    <ButtonIcon icon="close" />
                                    Game Berakhir
                                </Button>
                            ) : (
                                <Link to="/dashboard">
                                    <Button unelevated>
                                        <ButtonIcon icon="arrow_back" />
                                        Kembali Ke Menu
                                    </Button>
                                </Link>
                            )}
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
                <div className="page">
                    <Grid fixedColumnWidth align="left">
                        {isFinished ? (
                            <GridCell span="12">
                                <Typography use="headline1" tag="h1">
                                    Selesai
                                </Typography>
                                {isUnexpectedFinished ? (
                                    <Typography use="headline6" tag="h6">
                                    Oh tidak, Seseorang telah meninggalkan game. Anda masih bisa mempertahankan poin Anda!
                                    </Typography>
                                ) : null}
                            </GridCell>
                        ) : null}
                        {!isInProgress &&
                        !isFinished &&
                        !isUnexpectedFinished ? (
                            <GridCell span="12">
                                <Typography use="headline1" tag="h1">
                                    {quizName}
                                </Typography>
                            </GridCell>
                        ) : null}
                        <GridCell span="4">
                            {waitForUsersCount !== 0 && !isInProgress ? (
                                <ThemeProvider
                                    options={{
                                        primary: "#03dac4"
                                    }}
                                >
                                    <Typography use="headline6" tag="h6">
                                    Menunggu {waitForUsersCount}
                                         pemain untuk bergabung 
                                    </Typography>
                                    <LinearProgress determinate={false} />
                                </ThemeProvider>
                            ) : null}
                            {error ? <span>{error}</span> : null}
                        </GridCell>
                        {Object.keys(activeQuestion).length &&
                        activeQuestion.question ? (
                            <GridCell span="12">
                                <List theme="textPrimaryOnDark">
                                    <Typography use="headline2" tag="h2">
                                        {isPaused ? (
                                            <ThemeProvider
                                                options={{
                                                    primary: "#03dac4"
                                                }}
                                            >
                                                <CircularProgress size="xlarge" />
                                            </ThemeProvider>
                                        ) : (
                                            <span>
                                                00:
                                                {timer.getSeconds() < 10
                                                    ? "0"
                                                    : ""}
                                                {timer.getSeconds()}
                                            </span>
                                        )}
                                    </Typography>
                                    <Typography use="headline5" tag="h5">
                                        {activeQuestion.question.name}
                                    </Typography>
                                    {activeQuestion.question.answers.map(
                                        (answer, answerId) => (
                                            <ListItem
                                                key={answerId}
                                                disabled={
                                                    activeQuestion.question
                                                        .userAnswer.answerId !==
                                                        null &&
                                                    activeQuestion.question
                                                        .userAnswer.answerId !==
                                                        answerId
                                                }
                                                onClick={() =>
                                                    this.handleAnswerClick(
                                                        answerId
                                                    )
                                                }
                                            >
                                                <ListItemGraphic
                                                    style={{ color: "inherit" }}
                                                    icon={this.getAnswerIcon(
                                                        answerId
                                                    )}
                                                />{" "}
                                                {answer}
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </GridCell>
                        ) : null}
                        {activeUsers.length > 0 ? (
                            <GridCell span="12">
                                <ChipSet>
                                    {activeUsers.map((activeUser, index) => (
                                        <Chip
                                            key={index}
                                            selected
                                            leadingIcon="person"
                                        >
                                            {activeUser.name}:{" "}
                                            <b>{activeUser.points}</b>
                                        </Chip>
                                    ))}
                                </ChipSet>
                            </GridCell>
                        ) : null}
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: selectors.getQuizError(state),
    waitForUsersCount: selectors.getWaitForUsersCount(state),
    quizName: selectors.getQuizName(state),
    isInProgress: selectors.getQuizIsInProgress(state),
    isFinished: selectors.getQuizIsFinished(state),
    isUnexpectedFinished: selectors.getQuizIsUnexpectedFinished(state),
    activeQuestion: selectors.getActiveQuestion(state),
    activeUsers: selectors.getActiveUsers(state),
    jwtError: selectors.getJwtAuthenticatedError(state)
});

const mapDispatchToProps = dispatch => ({
    joinQuizRequest: quizId => dispatch(actions.joinQuizRequest(quizId)),
    leaveQuizRequest: quizId => dispatch(actions.leaveQuizRequest(quizId)),
    answerQuestionRequest: params =>
        dispatch(actions.answerQuestionRequest(params))
});

const ConnectedQuiz = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Quiz)
);

export default ConnectedQuiz;
