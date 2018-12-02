import React, { Component } from 'react';
import LeftDrawer from './Components/LeftDrawer';
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//const baseURL = "http://dcm.uhcl.edu/c438818fa01g2";
const baseURL = "http://localhost:65365";

const libaxios = require("axios");
export const axios = libaxios.create({
	baseURL,
	timeout: 1000,
});

const theme = createMuiTheme({
		palette: {
				primary: {
						main: '#018744',
				},
				secondary: {
						main: '#0078ad',
				},
		},
});

export default class App extends Component {
		constructor(props) {
			super(props);
			console.log("App userId: " + props.userId);
			this.state = {
				userId: props.userId,
			};
		}

		render() {
				return(
						<div className="App">
								<MuiThemeProvider theme={theme}>
										<LeftDrawer userId={this.state.userId}/>
								</MuiThemeProvider>
						</div>
				);
		}
}
