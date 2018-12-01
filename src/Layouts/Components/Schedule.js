import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
	card: {
        minWidth: 275,
	},
    title: {
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 7,
        paddingBottom: 7,
    },
    body: {
        paddingLeft: 20,
        paddingBottom: 7,
    }
});

function makeClassCard(classes) {
    return (
        <Card className={classes.card} elevation={1}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    Design of Database Systems
                </Typography>
                <Typography className={classes.body} color="textSecondary">
                    CSCI 4333.01<br/>
                    Dr. Yue<br/>
                    M 1:00-3:50<br/>
                    Delta 241
                </Typography>
            </CardContent>
        </Card>
    );
}

function Schedule(props) {
	const { classes } = props;

	return (
		<div>
            {makeClassCard(classes)}
            {makeClassCard(classes)}
        </div>
	);
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Schedule);
