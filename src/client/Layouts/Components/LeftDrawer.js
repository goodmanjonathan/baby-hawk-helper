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
import './icon.css';

import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import Calendar from "./Calendar";
import Map from "./Map";

const pages = ["Dashboard", "Schedule", "Calendar", "Map"];
const drawerWidth = 60;
let schedule = {};

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
	icon: {
		color: theme.palette.secondary.main,
	}
});


function LoginPrompt(handleLogin) {
	return (
		<div>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="usernameInput"
					label="Username"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="passwordInput"
					label="Password"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLogin} color="primary">
					Login
				</Button>
			</DialogActions>
		</div>
	);
}

function LogoutPrompt(userInfo, handleLogout) {
	return (
		<div>
			<DialogContent>
				<Typography>
					Logged in as: {userInfo.firstName + " " + userInfo.lastName}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLogout} color="primary">
					Logout
				</Button>
			</DialogActions>
		</div>
	);
}

class LeftDrawer extends Component {
		constructor(props) {
			super(props);

			this.state = {
				// 0 => Dashboard
				// 1 => Schedule
				// 2 => Calendar
				// 3 => Map
				// 4 => Login
				selectedIndex: 0,
<<<<<<< HEAD
				loggedInUser: {id: -1},
=======
				loggedInUser: {
					id: null,
				},
>>>>>>> 1ad46f5a... wip
				drawerOpen: true,
				loginOpen: true,
				schedule: [],
			};
		}

		login = (uid, pw) => {
			console.log(`getting non-cached student: { uid: ${uid}, pw: ${pw} }`);

			// contact the server..
			axios.post("/api/student/get",
				// with the userid and password
				{
					id: uid,
					password: pw,
				})
				.then((response) => {
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
						console.log("login failed: " + reason);

						result = null;
					} else if (response.data.Valid === true) {
						result = {
							id: uid,
							firstName: response.data.FirstName,
							lastName: response.data.LastName,
						};
						this.setState({loggedInUser: result});
						this.classData = [];
						schedule = [];
						if (this.props.userId !== null) {
							console.log("getting map data for user " + this.state.loggedInUser.id);
							axios.post("api/location/getall", { userId: this.state.loggedInUser.id })
								.then((response) => {
									for (let datum of response.data) {
										console.log(datum);
										let roomNumber = datum.RoomNumber;
										let professor = datum.Professor;
										let startTime = datum.StartTime;
										let endTime = datum.EndTime;
										let courseName = datum.CourseName;
										this.classData.push([roomNumber, professor, startTime, endTime, courseName]);
										console.log(this.classData);
									}
									this.setState({schedule: this.classData});
									console.log(this.state.schedule)
									for(let c of this.state.schedule){
										let outString = "";
										outString += "<b>" + c[4] + "</b><br/>" + "Room: " + c[0] + "<br/>" + c[2] + "-" + c[3] + "<br/>" + c[1] + "<br/>";
										if(schedule[""+c[0]]){
											schedule[""+c[0]] += outString;
										}
										else {
											schedule[""+c[0]] = outString;
										}
									}
									console.log(schedule);

								})
								.catch((error) => console.log("error getting user map data: " + error));
						} else {
							console.log("skipping map data for non-logged in user");
						}
					}
					console.log(result);
					return result;
				})
				.catch((error) => {
					console.log(error);
				});
		}

		handleListItemClick = (event, index) => {
			if (index === 4) {
				this.setState({loginOpen: true});
				return;
			}
			this.setState({selectedIndex: index});
		};

		handleDrawerToggle = () => {
			this.setState({drawerOpen: !this.state.drawerOpen});
		};

		handleLoginClose = () => {
			this.setState({loginOpen: false});
		};

		handleLogin = () => {
			let uid = document.getElementById("usernameInput").value;
			let pw = document.getElementById("passwordInput").value;
			if (!this.login(uid, pw)) {
				this.setState({loggedInUser: { id: null }});
			}

			this.setState({loginOpen: false});
		};

		handleLogout = () => {
			this.setState({loggedInUser: {id: -1}});
		};

		componentDidUpdate = () => {

		};

		render() {
				const { classes } = this.props;
				return (
					<BrowserRouter>
						<div className={classes.root}>
							<CssBaseline />
							<Dialog open = {this.state.loginOpen}
								onClose = {this.handleLoginClose}
							>
								{

									this.state.loggedInUser.id != -1
										? LogoutPrompt(this.state.loggedInUser, this.handleLogout)
										: LoginPrompt(this.handleLogin)
								}
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
								open= {this.state.drawerOpen}
							>
								<MenuList>
									<div className = {classes.toolbar} />
									<Link to="/">
										<MenuItem
												className = {classes.menuItem}
												onClick={event => this.handleListItemClick(event,0)}
										>
											<ListItemIcon className={classes.icon} class = "animateDash">
												<DashboardIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/schedule">
										<MenuItem
												className= {classes.menuItem}
												onClick={event => this.handleListItemClick(event,1)}
										>
											<ListItemIcon className={classes.icon} class="animateClock">
												<ScheduleIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/calendar">
										<MenuItem
												className={classes.menuItem}
												onClick={event => this.handleListItemClick(event,2)}
										>
											<ListItemIcon className={classes.icon} class="animateCal">
												<TodayIcon />
											</ListItemIcon>
										</MenuItem>
									</Link>
									<Link to="/map">
										<MenuItem
												className={classes.menuItem}
												onClick={event => this.handleListItemClick(event,3)}
										>
											<ListItemIcon className={classes.icon} class="animateMap">
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
										<ListItemIcon className={classes.icon} class="animateSetting">
											<SettingsIcon />
										</ListItemIcon>
									</MenuItem>
								</MenuList>
							</Drawer>

							<div className = {classes.toolbar} />
							<div className={classNames(classes.content, {
								[classes.contentShift]: this.state.drawerOpen,})}
							>
								{console.log(this.state.loggedInUser)}
								<Route exact path="/" component = {Dashboard} />
								<Route exact path="/schedule" render = {_ => <Schedule userId={this.state.loggedInUser.id}/>} />
								<Route exact path="/calendar" render = {_ => <Calendar userId={this.state.loggedInUser.id} />} />
								<Route exact path="/map" render = {_ => <Map userId={this.state.loggedInUser.id} classInfo = {schedule} schedule = {this.state.schedule} />} />
							</div>
						</div>
					</BrowserRouter>
				);
		}
}


export default withStyles(styles)(LeftDrawer);
