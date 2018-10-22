import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
	paper: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: "90vh",
	}

});


function Settings(props) {
	const { classes } = props;
	return (
		<Paper className={classes.paper}>
			<Typography>
				Settings
			</Typography>
		</Paper>
	);
}

Settings.propTypes ={
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Settings);
