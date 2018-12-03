import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { axios } from "../App";

const styles = theme => ({
	card: {
        minWidth: 275,
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

function Course(props) {
    const { courseInfo } = props;
    const sectionNumber = courseInfo.SectionNumber;
    const days = courseInfo.Days.join("");

    return (
        <Card className={styles.card} elevation={1}>
            <CardContent>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={styles.heading}>
                            {courseInfo.CourseName}
                        </Typography>
                        <br/>
                        <Typography className={styles.body}>
                            {courseInfo.Department} {courseInfo.CourseNumber}.{sectionNumber}<br/>
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
    );
}

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        let courses = [];
        axios.post("api/schedule/getall", { userId: 1000000/*props.userId*/ })
            .then((response) => {
                for (let course of response.data) {
                    courses.push(course);
                }
            })
            .catch((error) => console.log("error getting schedule: " + error));

        this.state = {
            userId: props.userId,
            courses: courses,
        };
    }

    injectCourse = (courseInfo) => {
        return (
            <div>
                <Course courseInfo={courseInfo}/>
                <br/>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.state.courses.map((c) => this.injectCourse(c))}
            </div>
        );
    }
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Schedule);
