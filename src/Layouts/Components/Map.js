import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import {firstFloor} from './firstFloor.js';
import {secondFloor} from './secondFloor.js';

const mapCenter = [29.57766548841692,-95.10419867344351];
const zoomLevel = 19;

const schedule = {
	rooms : [
		'119B',
		'140',
		"216",

	],
	classes: {
		'119B' : 'Class 1',
		'140' : 'Class 2',
		'216' : 'Class 3',
	}
}

export default class App extends Component {
			onEachFeature = (feature, layer) => {
			// does this feature have a property named popupContent?
			if (schedule.rooms.includes(feature.properties.Room)) {
					layer.bindPopup(schedule.classes[feature.properties.Room]);
			}
			else{
				layer.bindPopup(feature.properties.Type);
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
										<LayersControl.Overlay checked name="Floor1">
											<GeoJSON data = {firstFloor} style = {function(feature) {
													switch (feature.properties.Type) {
													case 'Classroom': return (schedule.rooms.includes(feature.properties.Room) ? {color: "#ff0000"} : {color: "#0078ad"});
													case 'Office':   return {color: "#018744"};
													case 'Lab': return {color: "#000000"};
													case 'Restroom': return {color: "#bb33ff"}
											}
											}}
											onEachFeature = {this.onEachFeature}
											/>
										</LayersControl.Overlay>
										<LayersControl.Overlay name="Floor2">
											<GeoJSON data = {secondFloor} style = {function(feature) {
													switch (feature.properties.Type) {
													case 'Classroom': return (schedule.rooms.includes(feature.properties.Room) ? {color: "#ff0000"} : {color: "#0078ad"});
													case 'Office':   return {color: "#018744"};
													case 'Lab': return {color: "#000000"};
													case 'Restroom': return {color: "#bb33ff"}
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
