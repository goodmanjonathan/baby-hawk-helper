import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Login from "../Login";

const styles = theme => ({
	paper: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	}

});


function Settings(props) {
	const { classes } = props;
	return (
		<div className={classes.paper}>
			<Typography>
				Settings
			</Typography>
			<button onClick={() => ReactDOM.render(<Login/>, document.getElementById("root"))}>Logout</button>
		</div>
	);
}

Settings.propTypes ={
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Settings);
