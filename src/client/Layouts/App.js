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
