import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from "@material-ui/core/Card";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { axios } from "../App";

const styles = theme => ({
	card: {
        minWidth: 600,
	},
    heading: {
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 7,
        paddingBottom: 7,
    },
    body: {
        paddingLeft: 20,
        paddingBottom: 7,
        color: "textSecondary",
    },
    panel: {

    }
});

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            userId: props.userId,
        };
    }

    componentDidMount = () => {
        this.mycourses = [];
        console.log(this.state.userId);

        if (this.state.userId !== null) {
            axios.post("api/schedule/getall", { userId: this.state.userId })
                .then((response) => {
                    for (let course of response.data) {
                        this.mycourses.push(course);
                    }
                    this.setState({courses: this.mycourses});
                })
                .catch((error) => console.log("error getting schedule: " + error));
        }

        console.log(this.state.courses);
    };

    courseCardFromInfo = (courseInfo) => {
        const { Department, CourseNumber, SectionNumber } = courseInfo;
        const days = courseInfo.Days.join("");

        return (
            <ListItem>
                <Card style={{flexGrow:1 , maxWidth: 400}} elevation={1}>
                    <CardHeader
                        title = {courseInfo.CourseName}
                    />
                    <CardContent>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={styles.body}>
                                    {Department} {CourseNumber}.{SectionNumber}<br/>
                                    {courseInfo.Professor}<br/>
                                    {days} {courseInfo.StartTime}-{courseInfo.EndTime}<br/>
                                    {courseInfo.Building} {courseInfo.RoomNumber}
                                </Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails>
                                <Typography>
                                    {courseInfo.Phone}<br/>
                                    {courseInfo.Email}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardContent>
                </Card>
            </ListItem>
        );
    };

    render() {
        console.log("courses: " + this.state.courses);
        console.log("userId: " + this.state.userId);

        if (this.state.userId === -1) {
            return (
                <Card style={{flexGrow:1 , maxWidth: 400}} elevation={1}>
                    <CardHeader
                        title = "Schedule Unavailable"
                        subheader = "Please login to view"
                    />
                </Card>
            );
        } else {
            return (
                <List>
                    {this.state.courses.map(this.courseCardFromInfo)}
                </List>
            );
        }
    }
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Schedule);
