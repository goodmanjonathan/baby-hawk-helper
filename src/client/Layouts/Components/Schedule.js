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

function makeClassCard(classes) {
    return (
        <Card className={classes.card} elevation={1}>
            <CardContent>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            Design of Database Systems
                        </Typography>
                        <br/>
                        <Typography className={classes.body}>
                            CSCI 4333.01<br/>
                            Dr. Yue<br/>
                            M 1:00-3:50<br/>
                            Delta 241
                        </Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Typography>
                            111-111-1111<br/>
                            yue@uhcl.edu
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </CardContent>
        </Card>
    );
}

function Schedule(props) {
	const { classes } = props;

	return (
		<div>
            {makeClassCard(classes)}
            <br/>
            {makeClassCard(classes)}
        </div>
	);
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Schedule);
