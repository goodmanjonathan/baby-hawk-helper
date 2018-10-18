import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';


class MainLayout extends React.Component {
	
	state = {
		open: false,
		anchor: 'left',
	};

	handleDrawerOpen = () => {
		this.setState({open: true})
	}
	
	handleDrawerClose = () => {
		this.setState({open: false})
	}
	
	render() {
		const {anchor, open } = this.state;
		const drawer = (
		<Drawer
			variant="persistant"
			anchor = {anchor}
			open = {open}
		>
			<div className='drawerHeader'>
			  <IconButton onClick={this.handleDrawerClose}>
				<ChevronLeftIcon />
			  </IconButton>
			</div>
		</Drawer>
		);
		return (
			
			<div className='root'>
				<AppBar
					className = 'mainBar'
				>
					<Toolbar disableGutters={!open}>
						<IconButton 
							color='inherit'
							aria-label='Open drawer'
							onClick={this.handleDrawerOpen}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' noWrap>
							Hello
						</Typography>
					</Toolbar>
				</AppBar>
				{drawer}
				<main>
				</main>
			</div>
		);
	}
}

export default (MainLayout);