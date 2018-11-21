"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import testImg from './delta_1st_floor.jpg';
import mapwize from 'mapwize';


const styles = theme => ({
	paper: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	myMapId : {
		height: '500px',
	},
});

const blueBorder = {
	color: 'blue',
	border: '5px solid blue',
	fill: 'pink'
};

const highlightEffect2 = {
	color: 'yellow',
	border: '5px solid red',
	fill: 'purple'
};

var roomNumbers = {
	mapKey: 'room'
};

/* function displayMap(){
	mapwize.apiKey('8c7983680cdc2510756b99f2ac89a07d')
            const map = new Mapwize.Map({
                container: 'myMapId'
            });

            map.on('mapwize:ready', () => {
                // Mapwize map is now ready to be used
            });
} */



function Map(props) {
	const { classes } = props;
	/*mapwize.apiKey('8c7983680cdc2510756b99f2ac89a07d');
	const map = new mapwize.Map({
		container: 'myMapId'
	});

	map.on('mapwize:ready', () => {
		// Mapwize map is now ready to be used
	});*/
	
	return (
		//create a dictionary and pull out the coordinates related to that students classroom
		//find out how to override css using material UI
		//look into onmouseover to add a highlight color over that area
		//or just render a highlight over the coordinates at the same time.
		<div className={classes.paper} style={blueBorder}>
			
			<h1 style={blueBorder}>
				Map
			</h1>
			//<div className = {classes.myMapId}></div>
			<h2 style={blueBorder}>Student Name: First Last</h2>
				<ul style={blueBorder}>
					<li><a href="#136">Class 1: Room 136, Delta Building 1st Floor</a></li><br/>
					<li><a href="#140">Class 2: Room 140, Delta Building 1st Floor</a></li><br/>
					<li><a href="#128">Class 3: Room 128, Delta Building 1st Floor</a></li><br/>
					<li><a href="#119B">Class 4: Room 119B, Delta Building 1st Floor</a></li><br/>
				</ul>
			
			<img  id="Delta_1st_floor" src={testImg} useMap="#Delta_1st_floor" border="0" width="1300" height="800" alt="" style={highlightEffect2}/>
			
			<map id="_Delta_1st_floor" name="Delta_1st_floor">
				<area shape="rect" room="131" id="131" coords="88,85,177,195," href="#" onmouseover="this.style.backgroundColor='#00FF00';" onmouseout="this.style.backgroundColor='transparent';" alt="Room_131" title="Room_131"   />
				<area shape="rect" room="132" id="132" coords="178,85,286,195," href="#" alt="Room_132" title="Room_132"/>
				<area shape="rect" room="133" id="133" coords="287,85,362,195," href="#" alt="Room_133" title="Room_133"   />
				<area shape="rect" room="136" id="136" coords="470,85,612,195," href="#" alt="Room_136" title="Room_136"   />
				<area shape="rect" room="125" id="125" coords="171,265,280,390," href="#" alt="Room_125" title="Room_125"   />
				<area shape="rect" room="126" id="126" coords="290,230,390,404," href="#" alt="Room_126" title="Room_126"   />
				<area shape="rect" room="128" id="128" coords="493,230,615,404," href="#" alt="Room_128" title="Room_128"   />
				<area shape="rect" room="140" id="140" coords="848,178,966,340," href="#" alt="Room_140" title="Room_140"   />
				<area shape="rect" room="150" id="150" coords="967,178,1045,340," href="#" alt="Room_150" title="Room_150"   />
				<area shape="rect" room="160" id="160" coords="849,340,914,405," href="#" alt="Room_160" title="Room_160"   />
				<area shape="rect" room="159" id="159" coords="914,340,981,408," href="#" alt="Room_159" title="Room_159"   />
				<area shape="rect" room="119A" id="119A" coords="177,443,309,568," href="#" alt="Room_119A" title="Room_119A"   />
				<area shape="rect" room="119B" id="119B" coords="310,443,461,568," href="#" alt="Room_119B" title="Room_119B"   />
				<area shape="rect" room="158A" id="158A" coords="774,443,918,568," href="#" alt="Room_158A" title="Room_158A"   />
				<area shape="rect" room="158B" id="158B" coords="918,443,1047,568," href="#" alt="Room_158B" title="Room_158B"   />
			</map>
			
			
			
			
			
		</div>
	);
}


Map.propTypes ={
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Map);
