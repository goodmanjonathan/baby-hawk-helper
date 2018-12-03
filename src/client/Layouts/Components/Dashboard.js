import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from '@material-ui/core/ListSubheader';
import { Timeline } from 'react-twitter-widgets'
import InstagramEmbed from 'react-instagram-embed'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	Button: {
    margin: theme.spacing.unit,
  },
	gridList: {
		height: '100'
	},
	subheader: {
		width: '100%',
	},
});

function Dashboard(props) {
	const { classes } = props;

	return (
		<Grid container justify = 'center' spacing = {24}>
				<Grid item xs={12}>
					<Paper>
						<div style = {{textAlign: "center"}}>
							<a href="http://www.instagram.com/uhclearlake">
								<Button mini = {true} className={classes.Button} >
									<img src={require('./images/iconi.png')} width="40" height="40" />
								</Button>
							</a>
							<a href="https://twitter.com/UHClearLake">
								<Button className={classes.Button}>
									<img src={require('./images/icont.png')} width="40" height="40" />
								</Button>
							</a>
							<a href="https://www.facebook.com/UHClearLake/">
								<Button className={classes.Button}>
									<img src={require('./images/iconf.png')} width="40" height="40" />
								</Button>
							</a>
							<a href="https://www.youtube.com/user/uhclearlake" >
								<Button className={classes.Button}>
									<img src={require('./images/icony.png')} width="40" height="40" />
								</Button>
							</a>
						</div>
					</Paper>
				</Grid>
				<Grid item xs ={12} md={6} style = {{textAlign: 'center'}}>
					<Paper>
						<Timeline
									dataSource={{
										sourceType: 'profile',
										screenName: 'UHClearLake'
									}}
									options={{
										username: 'UHClearLake',
										height: '926',
										width: '95vh'
									}}
									onLoad={() => console.log('Timeline is loaded!')}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper>
						<div style={{margin: 'auto'}}>
							<InstagramEmbed
							url='https://www.instagram.com/p/BqftGKEgS7I/' />
						</div>
					</Paper>
				</Grid>
		</Grid>
	);
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
