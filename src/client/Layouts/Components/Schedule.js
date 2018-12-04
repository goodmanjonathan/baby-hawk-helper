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
import CardHeader from '@material-ui/core/CardHeader';
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
/*
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
} */

class Schedule extends React.Component {

    constructor(props) {
        super(props);
				/*this.mycourses = [];

        axios.post("api/schedule/getall", { userId: 1000000/*props.userId })
            .then((response) => {
                for (let course of response.data) {
                    this.mycourses.push(course);
                }
            })
            .catch((error) => console.log("error getting schedule: " + error));
						*/
        this.state = {
            courses: [],
						userId: props.userId,
        };
    }


		componentDidMount = () => {
			this.mycourses = [];
			console.log(this.state.userId)
			axios.post("api/schedule/getall", { userId: this.state.userId })
					.then((response) => {
							for (let course of response.data) {
									this.mycourses.push(course);
							}
							this.setState({courses: this.mycourses})
					})
					.catch((error) => console.log("error getting schedule: " + error));


			console.log(this.state.courses)
		}

    injectCourse = (courseInfo) => {
			const sectionNumber = courseInfo.SectionNumber;
			const days = courseInfo.Days.join("");
			const classes = this.props;
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
            </ListItem>
        );
    };

    render() {
			const { styles } = this.props;
			console.log(this.state.courses)
        return (
            <List>
                {this.state.courses.map((c) => this.injectCourse(c))}
            </List>
        );
    }
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Schedule);
