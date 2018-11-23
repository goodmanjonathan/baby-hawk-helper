import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Timeline } from 'react-twitter-widgets'
import InstagramEmbed from 'react-instagram-embed'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 600,
  },
  subheader: {
    width: '100%',
  },
});

function Dashboard(props) {
  const { classes } = props;

  return (
	
	<div className={classes.root}>

      <GridList cellHeight={160} className={classes.gridList} cols={3}>
			<GridListTile key="Subheader" cols={3} style={{ height: '60' }}>
          <ListSubheader style={{textAlign: 'right'}} component="div"><p></p>
          <a href="http://www.instagram.com/uhclearlake"><img src={require('./images/iconi.png')} width="40" height="40" /></a>    
					<span>  </span><a href="https://twitter.com/UHClearLake"><img src={require('./images/icont.png')} width="40" height="40" /></a>
					<span>  </span><a href="https://www.facebook.com/UHClearLake/"><img src={require('./images/iconf.png')} width="40" height="40" /></a>
					<span>  </span><a href="https://www.youtube.com/user/uhclearlake" ><img src={require('./images/icony.png')} width="40" height="40" /></a>
					
					</ListSubheader>
        </GridListTile>
				<GridListTile key="Subheader" cols={3} style={{ height: '400' }}>
			<Timeline
							dataSource={{
								sourceType: 'profile',
								screenName: 'UHClearLake'
							}}
							options={{
								username: 'UHClearLake',
								height: '400',
								width: '600'
							}}
							onLoad={() => console.log('Timeline is loaded!')}
						/>
        </GridListTile>
				<GridListTile key="Subheader" cols={3} style={{ height: '750' }}>
				<InstagramEmbed url='https://www.instagram.com/p/BqftGKEgS7I/' />
        </GridListTile>
       
      </GridList>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);