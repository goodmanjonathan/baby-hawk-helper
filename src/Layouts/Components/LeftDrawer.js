import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MapIcon from "@material-ui/icons/Map";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import Calendar from "./Calendar";
import Map from "./Map";

const pages = ["Dashboard","Schedule","Calendar","Map"];

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	drawer:{
		width: 70,
	},
	drawerPaper: {
		width: 70,
	},
	toolbar: theme.mixins.toolbar,
	appBar:{
		zIndex: theme.zIndex.drawer + 1,
	},
	appBarText: {
	}
});



class LeftDrawer extends Component {
		state = {
				selectedIndex: 0,
		};

		handleListItemClick = (event, index) => {
				this.setState({selectedIndex: index});
		};

		render() {
				const { classes } = this.props;

				return (
					<BrowserRouter>
						<div className={classes.root}>
							<CssBaseline />
							<AppBar position="fixed" className={classes.appBar}>
								<Toolbar>
									<Typography className={classes.appBarText}
										variant='h6' color='inherit'
									>
										{pages[this.state.selectedIndex]}
									</Typography>
								</Toolbar>
							</AppBar>
							<Grid container spacing={0}>
								<Grid item xs={.5}>
								<Drawer variant="permanent"
									className = {classes.drawer}
									classes={{paper: classes.drawerPaper,}}
								>
									<List>
										<div className = {classes.toolbar} />
										<Link to="/">
											<ListItem
													button
													selected={this.state.selectedIndex === 0}
													onClick={event => this.handleListItemClick(event,0)}
											>
												<ListItemIcon>
													<DashboardIcon />
												</ListItemIcon>
											</ListItem>
										</Link>
										<Link to="/schedule">
											<ListItem
													button
													selected={this.state.selectedIndex === 1}
													onClick={event => this.handleListItemClick(event,1)}
											>
												<ListItemIcon>
													<ScheduleIcon />
												</ListItemIcon>
											</ListItem>
										</Link>
										<Link to="/calendar">
											<ListItem
													button
													selected={this.state.selectedIndex === 2}
													onClick={event => this.handleListItemClick(event,2)}
											>
												<ListItemIcon>
													<TodayIcon />
												</ListItemIcon>
											</ListItem>
										</Link>
										<Link to="/map">
											<ListItem
													button
													selected={this.state.selectedIndex === 3}
													onClick={event => this.handleListItemClick(event,3)}
											>
												<ListItemIcon>
													<MapIcon />
												</ListItemIcon>
											</ListItem>
										</Link>
									</List>
								</Drawer>
								</Grid>
								<Grid item xs>
								<div className={classes.toolbar} />
								<div>
									<Route exact path="/" component = {Dashboard} />
									<Route exact path="/schedule" component = {Schedule} />
									<Route exact path="/calendar" component = {Calendar} />
									<Route exact path="/map" component = {Map} />
								</div>
							</Grid>
							</Grid>
						</div>
					</BrowserRouter>
				);
		}
}


export default withStyles(styles)(LeftDrawer);
