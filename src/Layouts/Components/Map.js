import React, { Component } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import testImg from './delta_1st_floor.png';
import testSvg from './delta_1st_floor.svg';

class App extends Component {
	render(){
		return(
			<div className="App">
				<h1>
					Map
				</h1>
				<object type="image/svg+xml" data={testSvg} border="0" width="1300" height="800">
				</object>
				
				<SvgLoader path="https://raw.githubusercontent.com/flekschas/simple-world-map/master/world-map.svg">
					<SvgProxy selector="#br" fill="green" />
				</SvgLoader>
				
			</div>
		)
	}
}

export default App;