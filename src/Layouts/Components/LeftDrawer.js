import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 440,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		backgroundColor: theme.palette.primary,
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		background: theme.palette.secondary,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
	},
	grow: {
		flexGrow: 1,
	},
	about: {
		padding: 20,
		paddingBottom: 50,
	}
});

class ResponsiveDrawer extends React.Component {
	state = {
		mobileOpen: false,
		selectedIndex: 1,
	};

	handleListItemClick = (event, index) => {
		this.setState({ selectedIndex: index });
	};

	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
	};

	render() {
		const { classes, theme } = this.props;

		const drawer = (
			<div>
				<List>
					<ListItem className = {classes.about} >
						<ListItemText primary="Baby Hawk Helper" secondary = "Version 0.1"/>
					</ListItem>
					<Divider />
					<ListItem
						button
						selected={this.state.selectedIndex === 0}
						onClick={event => this.handleListItemClick(event, 0)}
					>
						<ListItemIcon>
							<MapIcon />
						</ListItemIcon>
						<ListItemText primary="Map" />
					</ListItem>
					<Divider />
					<ListItem
						button
						selected={this.state.selectedIndex === 1}
						onClick={event => this.handleListItemClick(event, 1)}
					>
						<ListItemIcon>
							<ScheduleIcon />
						</ListItemIcon>
						<ListItemText primary="Schedule" />
					</ListItem>
					<Divider />
					<ListItem
						button
						selected={this.state.selectedIndex === 2}
						onClick={event => this.handleListItemClick(event, 2)}
					>
						<ListItemIcon>
							<DateRangeIcon />
						</ListItemIcon>
						<ListItemText primary="Calender" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem
						button
						selected={this.state.selectedIndex === 3}
						onClick={event => this.handleListItemClick(event, 3)}
					>
						<ListItemIcon>
							<AccountBoxIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem>
				</List>
			</div>
		);

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.grow} variant="h6" color="inherit" noWrap>
							Baby Hawk Helper
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography noWrap>{'Content'}</Typography>
				</main>
			</div>
		);
	}
}

ResponsiveDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
