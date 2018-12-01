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
