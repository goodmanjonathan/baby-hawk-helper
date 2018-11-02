import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "./App.css";
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import logo from "./logo.svg";

const localizer = Calendar.momentLocalizer(moment);



class App extends Component {

	state = {
		events: [
			{
				start: new Date(),
				end: new Date(moment().add(1, "days")),
				title: "Some title"
			}
		]
	};

	render() {
		return (
			<div className="App">
				<Calendar
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					localizer={localizer}
					style={style}
				/>
			</div>
		);
	}
}

export default App;
