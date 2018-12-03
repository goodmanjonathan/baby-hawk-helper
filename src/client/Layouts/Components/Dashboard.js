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

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		maxWidth: 800
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
		<Grid container justify = 'center'>
			<Paper className = {classes.root}>
				<List>
					<ListItem >
							<ListSubheader style={{textAlign: 'right'}} component="div"><p></p>
							<a href="http://www.instagram.com/uhclearlake"><img src={require('./images/iconi.png')} width="40" height="40" /></a>
							<span>  </span><a href="https://twitter.com/UHClearLake"><img src={require('./images/icont.png')} width="40" height="40" /></a>
							<span>  </span><a href="https://www.facebook.com/UHClearLake/"><img src={require('./images/iconf.png')} width="40" height="40" /></a>
							<span>  </span><a href="https://www.youtube.com/user/uhclearlake" ><img src={require('./images/icony.png')} width="40" height="40" /></a>

							</ListSubheader>
						</ListItem>
						<Paper>
							<ListItem>
								<Grid container justify = 'center'>
									<Timeline
												dataSource={{
													sourceType: 'profile',
													screenName: 'UHClearLake'
												}}
												options={{
													username: 'UHClearLake',
													height: '500',
													width: '95vh'
												}}
												onLoad={() => console.log('Timeline is loaded!')}
											/>
								</Grid>
							</ListItem>
						</Paper>
						<Paper>
							<ListItem>
								<Grid container justify = 'center'>
									<InstagramEmbed
										url='https://www.instagram.com/p/BqftGKEgS7I/' />
								</Grid>
							</ListItem>
						</Paper>
					</List>
				</Paper>
			</Grid>
	);
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
