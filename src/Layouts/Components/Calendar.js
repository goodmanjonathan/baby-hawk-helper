import React, { Component, Fragment } from "react";
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Calendar from "react-big-calendar";
import moment from "moment";
import { myEvents } from './Events.js';

import style from 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = Calendar.momentLocalizer(moment);

function EventAgenda({ event }) {
return (
	<Fragment>
		<strong>{event.title}:  </strong>
		{event.desc}
	</Fragment>
)
}


function Event({ event }) {
	return (
		<Fragment>
			<strong>{event.title}</strong>
		</Fragment>
	)
}

const styles = theme => ({
	paperStyle: {
		width: '70vh',
		height: '70vh',
		padding: 0,
		margins: 0,
	},
	content: {
		flexGrow: 1,
		height: '70vh',
		width: '70vh',
		padding: 0,
		margins: 0,
		position: 'absoulte',
	}
});

class App extends Component {

	state = {
		events: myEvents,
		open: false,
		selected:
			{
				start: new Date(),
				end: new Date(),
				title: 'placeholder',
				desc: 'placeholder',
			}

	};

	handlePopUp = (event) => {
		this.setState({open: true});
		this.setState({selected: event})
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props
		console.log(this.state.events)
		return (
			<div className="App">
				<Calendar
					defaultDate={new Date()}
					defaultView="month"
					popup
					events={this.state.events}
					localizer={localizer}
					style={style}
					views = {['month','day','agenda']}
					components={{
						event: Event,
						agenda: {
							event: EventAgenda,
						},
					}}
					onSelectEvent = {this.handlePopUp}
				/>
				<Dialog open = {this.state.open}
					onClose = {this.handleClose}
				>
					<DialogTitle>
						{this.state.selected.title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{this.state.selected.desc}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(App);
