import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MapIcon from "@material-ui/icons/Map";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import classNames from "classnames";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { axios } from "../App";

import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import Calendar from "./Calendar";
import Map from "./Map";
import Settings from "./Settings";

const pages = ["Dashboard","Schedule","Calendar","Map", "Settings"];
const drawerWidth = 60;

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	drawer:{
		width: 60,
	},
	drawerPaper: {
		width: 60,
		color: theme.palette.secondary,
	},
	toolbar: theme.mixins.toolbar,
	appBar:{
		zIndex: theme.zIndex.drawer + 1,
	},
	appBarText: {
	},
	item: {
		color: theme.palette.primary,
	},
	menuItem: {
		'&:focus': {
			backgroundColor: theme.palette.secondary.main,
			'& $primary, & $icon': {
				color: theme.palette.common.white,
			},
		},
	},
	primary: {},
	icon: {
		color: theme.palette.secondary.main,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: 0,
		height: '90vh',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
		height: '90vh',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginLeft: -10,
		marginRight: 10,
	},
});

function Login(uid, pw){
						console.log("getting non-cached student");


						axios.post("/api/student/get", {
										id: uid,
										password: pw,
								})
								.then((response) => {
										console.log("returned from getStudent: " + response);

										let result;

										if (response.data.Valid === false) {
												let reason;
												switch (response.data.Reason) {
												case 1:
														reason = "authentication error";
														break;
												case 2:
														reason = "db connection error: " + response.data.ReasonEx;
														break;
												default:
														reason = "unknown server error";
												}

												result = {
														student: {
																id: null,
																passwd: null,
																fname: null,
																lname: null,
														},
														valid: false,
														reason: reason,
												};
										} else if (response.data.Valid === true) {
												result = {
														student: {
																id: uid,
																passwd: pw,
																fname: response.data.FirstName,
																lname: response.data.LastName,
														},
														valid: true,
														reason: null
												};
										}

										if (result.valid) {
												console.log("creating App with userId: " + result.student.userId);
												return(true);
										}
										else{
											return(false);
										}
								})
								.catch((error) => {
										console.log(error);
								});
		}


class LeftDrawer extends Component {
		constructor(props) {
			super(props);
			console.log("LeftDrawer userId: " + props.userId);
			this.state = {
					selectedIndex: 0,
					userId: props.userId,
					open: true,
					openLogin: true,
					uid: '',
					pw: '',
			};
		}

		handleListItemClick = (event, index) => {
				if(index == 4){
					this.setState({openLogin: true})
					return
				}
				this.setState({selectedIndex: index});

		};

		handleDrawerToggle = () => {
			this.setState({open: !this.state.open})
		};

		handleLoginClose = () => {
			this.setState({openLogin: false})
		};

		handleUID = (e) => {
			this.setState({uid: e.target.value})
		};

		handlePW = (e) => {
			this.setState({pw: e.target.value})
		};

		handleLogin = () => {
			if(Login(this.state.uid, this.state.pw)){
				this.setState({UserId: this.state.uid})
			}
			this.setState({openLogin: false})
		}

		render() {
				const { classes } = this.props;

				return (
					<BrowserRouter>
						<div className={classes.root}>
							<CssBaseline />
							<Dialog open = {this.state.openLogin}
								onClose = {this.handleLoginClose}
							>
								<DialogContent>
									<TextField
										autoFocus
										margin="dense"
										id="title"
										label="Username"
										fullWidth
										onChange = {this.handleUID}
									/>
									<TextField
										margin="dense"
										id="desc"
										label="Password"
										fullWidth
										onChange = {this.handlePW}
									/>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleLogin} color="primary">
										Login
									</Button>
								</DialogActions>
							</Dialog>
							<AppBar position="fixed" className= {classes.appBar}>
								<Toolbar>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={this.handleDrawerToggle}
										className={classNames(classes.menuButton)}
									>
										<MenuIcon />
									</IconButton>
									<Typography className={classes.appBarText}
										variant='h6' color='inherit'
									>
										{pages[this.state.selectedIndex]}
									</Typography>
								</Toolbar>
							</AppBar>
							<Drawer variant="persistent"
								className = {classes.drawer}
								classes={{paper: classes.drawerPaper,}}
								open= {this.state.open}
							>
								<MenuList>
									<div className = {classes.toolbar} />
									<Link to="/">
										<MenuItem
												className = {classes.menuItem}
												onClick={event => this.handleListItemClick(event,0)}
										>
											<ListItemIcon className={classes.icon}>
												<DashboardIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/schedule">
										<MenuItem
												className= {classes.menuItem}
												onClick={event => this.handleListItemClick(event,1)}
										>
											<ListItemIcon className = {classes.icon}>
												<ScheduleIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/calendar">
										<MenuItem
												className={classes.menuItem}
												onClick={event => this.handleListItemClick(event,2)}
										>
											<ListItemIcon className={classes.icon}>
												<TodayIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/map">
										<MenuItem
												className={classes.menuItem}
												onClick={event => this.handleListItemClick(event,3)}
										>
											<ListItemIcon className={classes.icon}>
												<MapIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Divider />
									<div className={classes.toolbar} />
									<MenuItem
											className={classes.menuItem}
											onClick={event => this.handleListItemClick(event,4)}
									>
										<ListItemIcon className={classes.icon}>
											<SettingsIcon />
										</ListItemIcon>
									</MenuItem>
								</MenuList>
							</Drawer>

							<div className = {classes.toolbar} />
							<div className={classNames(classes.content, {
								[classes.contentShift]: this.state.open,})}
							>
								<Route exact path="/" component = {Dashboard} />
								<Route exact path="/schedule" component = {Schedule} />
								<Route exact path="/calendar" component = {Calendar} />
								<Route exact path="/map" render = {props => <Map userId={this.state.userId}/>} />
							</div>
						</div>
					</BrowserRouter>
				);
		}
}


export default withStyles(styles)(LeftDrawer);
