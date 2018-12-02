import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Calendar from "react-big-calendar";
import moment from "moment";
import { myEvents } from './Events.js';
import { axios } from "../App";

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
		position: 'absolute',
	}
});

class App extends Component {
	constructor(props) {
		super(props);

		let customEvents = [];
		axios.post("api/event/getall", { userId: 1000002 })
			.then((response) => {
				for (let datum in response) {
					let title = datum.Title;
					let description = datum.Description;
					let startTime = datum.StartTime;
					let endTime = datum.EndTime;

					console.log(title, description, startTime, endTime);
					//customEvents.push();
				}
			})
			.catch((error) => {
				console.log("failed to get custom events: " + error);
			});

		this.state = {
			events: myEvents,
			customEvents,
			open: false,
			newOpen: false,
			title: 'placeholder',
			desc: 'placeholder',
			start: new Date(),
			end: new Date(),
			selected:
				{
					start: new Date(),
					end: new Date(),
					title: 'placeholder',
					desc: 'placeholder',
				}

		};
	}

	handlePopUp = (event) => {
		this.setState({open: true});
		this.setState({selected: event})
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleCustomDialog = ({start, end}) => {
		console.log({start});
		this.setState({newOpen: true});
		this.setState({cStart: start});
		this.setState({cEnd: end});
	};

	handleCustomClose = () => {
		this.setState({newOpen: false});
		this.setState({
				customEvents: [
					...this.state.customEvents,
					{
						start: this.state.cStart,
						end: this.state.cEnd,
						title: this.state.title,
						desc: this.state.desc,
					},
				],
			});
	};

	handleTitle = (e) => {
		this.setState({title: e.target.value});
	};

	handleDesc = (e) => {
		this.setState({desc: e.target.value});
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
					selectable
					events={[...this.state.events,...this.state.customEvents]}
					localizer={localizer}
					style={style}
					views = {['month','day']}
					components={{
						event: Event,

					}}
					onSelectEvent = {this.handlePopUp}
					onSelectSlot = {this.handleCustomDialog}
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
				<Dialog open = {this.state.newOpen}
					onClose = {this.handleCustomClose}
				>
					<DialogTitle>New Event</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="title"
							label="Title"
							fullWidth
							onChange = {this.handleTitle}
						/>
						<TextField
							margin="dense"
							id="desc"
							label="Description"
							fullWidth
							onChange = {this.handleDesc}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCustomClose} color="primary">
							Okay
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(App);
