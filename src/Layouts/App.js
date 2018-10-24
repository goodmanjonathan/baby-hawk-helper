import React, { Component } from 'react';
import LeftDrawer from './Components/LeftDrawer';
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';



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

export default class extends Component {
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
