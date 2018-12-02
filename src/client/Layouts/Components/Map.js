<<<<<<< HEAD:src/client/Layouts/Components/Map.js
import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { axios } from "../App";

import delta_1st_floor_SVG from './delta_1st_floor.svg';
import './maps.css';

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		console.log("Map userId: " + props.userId);
		this.state = {
			userId: props.userId,
		};
		
	    this.selectClassRoooms = () => {
			console.log("getting locations for " + this.state.userId);

			axios.post("api/location/getall", {
					userId: this.state.userId,
				})
				.then((response) => {
					console.log(response);
					for (let datum of response.data) {
						let roomNumber = datum.RoomNumber;
						let professor = datum.Professor;
						let startTime = datum.StartTime;
						let endTime = datum.EndTime;
						
						let room = document.getElementById("room" + roomNumber);
						room.setAttribute("fill", "blue");
						room.setAttribute("opacity", "0.5");
					}
				})
				.catch((error) => {
					console.error(error);
				});		
		};
	}

	showDialogBox() {
	}
	
	render() {
		return (
			<div className="Map" onLoad={this.selectClassRoooms}>
				<h1>
					Maps
				</h1>
				
				<h2>
					First Name: John, Last Name: Doe
				</h2>
				
				<ul>
					<li>Class Room #136, Building: Delta, Floor: 1</li>
					<li>Class Room #128, Building: Delta, Floor: 1</li>
					<li>Class Room #140, Building: Delta, Floor: 1</li>
					<li>Class Room #158A, Building: Delta, Floor: 1</li>
				</ul>
				
				<button onClick={this.selectClassRoooms}>
					Click Here To Show Classes On The Map
				</button>
				<br/>
				
				<div id="info-box"></div> 
				<svg  className="Maps" version="1.1" height="616" width="1002" xmlns="http://www.w3.org/2000/svg">
					 <path
						 data-info="<div>Room: 136</div>"
						 opacity="0.0"
						 d="m 362.57022,65.15802 0.73544,85.31064 h 111.05092 l 0.73543,-84.575203 z"
						 id="room136"
						 //onMouseEnter={this.selectClassRoooms}
						 />
					 <path
						 opacity="0.0"
						 d="m 222.10184,65.15802 -1.47087,87.51695 58.09948,-2.94175 -0.73543,-85.310636 z"
						 id="room133"
						 />
					 <path
						 opacity="0.0"
						 d="m 136.7912,66.628894 85.31064,-1.470874 -1.47087,87.51695 -83.83977,-1.47087 z"
						 id="room132"
						 />
					  <path
						 opacity="0.0"
						 d="m 378.74983,176.94438 94.87131,0.73543 v 135.32033 l -94.13588,1.47087 z"
						 id="room128"
						 />
					  <path
						 opacity="0.0"
						 d="m 300.79355,177.67981 77.95628,-0.73543 v 67.66016 h -77.95628 z"
						 id="room130"
						 />
					  <path
						 opacity="0.0"
						 d="m 224.30815,178.41525 76.4854,-0.73544 1.47087,136.7912 -78.69171,-1.47087 z"
						 id="room126"
						 />
					  <path
						 opacity="0.0"
						 d="m 135.32033,212.24533 h 87.51695 l 0.73543,100.75481 -87.51695,0.73544 z"
						 id="room125"
						 />
					  <path
						 opacity="0.0"
						 d="m 136.05576,339.47586 102.22568,1.47087 1.47088,96.34219 -102.96112,0.73543 z"
						 id="room119A"
						 />
					  <path
						 opacity="0.0"
						 d="m 238.28144,340.94673 h 118.40529 l -1.47087,97.07762 -115.46354,-0.73543 -1.47088,-96.34219"
						 id="room119B"
						 />
					  <path
						 opacity="0.0"
						 d="m 653.06766,135.75993 91.92957,-0.73544 v 127.23053 l -89.72326,0.73543 z"
						 id="room140"
						 />
					  <path
						 opacity="0.0"
						 d="m 744.99723,135.02449 59.57036,1.47088 0.73544,125.75965 h -60.3058 z"
						 id="room150"
						 />
					  <path
						 opacity="0.0"
						 d="m 595.70361,340.21129 h 111.05092 l 1.47087,97.81306 -113.25723,-0.73543 z"
						 id="room158A" 
						 />
					  <path
						 opacity="0.0"
						 d="m 706.75453,340.21129 99.28393,-0.73543 v 98.54849 H 708.2254 l -1.47087,-97.81306"
						 id="room158B"/>
					  
				</svg>
				
				
			</div>
		)
	}
}
=======
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import {features} from './features.js';

const mapCenter = [29.57766548841692,-95.10419867344351];
const zoomLevel = 19;

const schedule = {
	rooms : [
		'119B',
		'140',
	],
	classes: {
		'119B' : 'Class 1',
		'140' : 'Class 2',
	}
}

export default class App extends Component {
			onEachFeature = (feature, layer) => {
			// does this feature have a property named popupContent?
			if (schedule.rooms.includes(feature.properties.Room)) {
					layer.bindPopup(schedule.classes[feature.properties.Room]);
			}
		};
		render() {
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
											 attribution="&copy;<a>href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>contributor"
											/>
										</LayersControl.BaseLayer>
										<LayersControl.Overlay checked = 'true' name="Floor1">
											<GeoJSON data = {features} style = {function(feature) {
													switch (feature.properties.Type) {
													case 'Classroom': return {color: "#ff0000"};
													case 'Office':   return {color: "#0000ff"};
											}
											}}
											onEachFeature = {this.onEachFeature}
											/>
										</LayersControl.Overlay>
									</LayersControl>
								</Map>
						</div>
				);
		}
}
>>>>>>> c13b911b... Working on implementing GeoJSON in Leaflet Map:src/Layouts/Components/Map.js
