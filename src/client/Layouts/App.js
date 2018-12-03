import React, { Component } from 'react';
import LeftDrawer from './Components/LeftDrawer';
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//const baseURL = "http://dcm.uhcl.edu/c438818fa01g2";
const baseURL = "http://localhost:65365";

const libaxios = require("axios");
export const axios = libaxios.create({
	baseURL,
	timeout: 30000,
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
		render() {
				return(
						<div className="App">
								<MuiThemeProvider theme={theme}>
										<LeftDrawer />
								</MuiThemeProvider>
						</div>
				);
		}
}
