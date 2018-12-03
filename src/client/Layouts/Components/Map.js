import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { render } from 'react-dom';
import { Map, TileLayer, GeoJSON, LayersControl, Tooltip } from 'react-leaflet';
import {firstFloor} from './firstFloor.js';
import {secondFloor} from './secondFloor.js';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/fibermanualrecord';

import { axios } from "../App";

const mapCenter = [29.57766548841692,-95.10419867344351];
const zoomLevel = 19;

let schedule = {
	rooms: [
	],
	classes: {
		'119B' : 'Class 1',
		'140' : 'Class 2',
		'216' : 'Class 3',
	}
}

const styles = theme => ({
	avatar: {
		margin: 10,
	},
	enrolledAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#ff0000",
	},
	classAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#0078ad",
	},
	officeAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#018744",
	},
	labAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#000000",
	},
	restroomAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#bb33ff",
	},
});


class App extends Component {
	constructor(props) {
		super(props);

		let rooms = [];
		let classes = {};
		if (props.userId !== null) {
			console.log("getting map data for user " + props.userId);
			axios.post("api/location/getall", { userId: props.userId })
				.then((response) => {
					for (let datum in response) {
						let roomNumber = datum.RoomNumber;
						let professor = datum.Professor;
						let startTime = datum.StartTime;
						let endTime = datum.EndTime;
						let courseName = datum.CourseName;

						if (!rooms.includes(roomNumber))
							rooms.push(roomNumber);
						classes[roomNumber] = {
							courseName,
							professor,
							startTime,
							endTime
						};
					}
				})
				.catch((error) => console.log("error getting user map data: " + error));
		} else {
			console.log("skipping map data for non-logged in user");
		}

		this.state = {
			loggedInUser: props.userId,
			legend: false,
			schedule: {
				rooms,
				classes,
			},
		};
	}

	onEachFeature = (feature, layer) => {
		if (this.state.schedule.rooms.includes(feature.properties.Room)) {
			layer.bindPopup(this.state.schedule.classes[feature.properties.Room]);
		} else if (feature.properties.Faculty) {
			layer.bindPopup(
				"<b>" + feature.properties.Type + "</b><br/>Room: " + feature.properties.Room
					+ "<br/>" + feature.properties.Faculty + "<br/>" + feature.properties.Email
			);
		} else {
			layer.bindPopup(
				"<b>" + feature.properties.Type + "</b><br/>Room: " + feature.properties.Room
			);
		}
	};

	handleLegend = () => {
		this.setState({legend: true});
	};

	handleClose = () => {
		this.setState({legend: false});
	};

	render() {
		const { classes } = this.props;
		const attribution = "&copy; "
			+ "<a href=http://osm.org/copyright>OpenStreetMap</a>";

		return (
			<div>
				<Map
					center={mapCenter}
					zoom={zoomLevel}
				>
					<LayersControl>
						<LayersControl.BaseLayer name = "Map" checked = 'true'>
							<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution={attribution}
							/>

						</LayersControl.BaseLayer>
						<LayersControl.Overlay checked name="Floor1">
							<GeoJSON data = {firstFloor} style = {(feature) => {
								switch (feature.properties.Type) {
								case 'Classroom': {
									return this.state.schedule.rooms.includes(feature.properties.Room)
										? {color: "#ff0000"}
										: {color: "#0078ad"};
								}
								case 'Office':
									return {color: "#018744"};
								case 'Lab':
									return {color: "#000000"};
								case 'Restroom':
									return {color: "#bb33ff"};
								}
							}}
							onEachFeature = {this.onEachFeature}
							/>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Floor2">
							<GeoJSON data = {secondFloor} style = {(feature) => {
								switch (feature.properties.Type) {
								case 'Classroom': {
									return this.state.schedule.rooms.includes(feature.properties.Room)
										? {color: "#ff0000"}
										: {color: "#0078ad"};
								}
								case 'Office':
									return {color: "#018744"};
								case 'Lab':
									return {color: "#000000"};
								case 'Restroom':
									return {color: "#bb33ff"};
								}
							}}
							onEachFeature = {this.onEachFeature}
							/>
						</LayersControl.Overlay>
					</LayersControl>
				</Map>
				<Button onClick = {this.handleLegend}>Legend</Button>
				<Dialog open = {this.state.legend}
					onClose = {this.handleClose}>
					<DialogTitle>Legend</DialogTitle>
					<DialogContent>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar className = {classes.enrolledAvatar}>
										<FiberManualRecordIcon/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Enrolled Classes</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar className = {classes.classAvatar}>
										<FiberManualRecordIcon/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Classes</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar className = {classes.officeAvatar}>
										<FiberManualRecordIcon/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Offices</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar className = {classes.labAvatar}>
										<FiberManualRecordIcon/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Labs</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar className = {classes.restroomAvatar}>
										<FiberManualRecordIcon/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Restrooms</ListItemText>
							</ListItem>
						</List>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}
export default withStyles(styles)(App);
