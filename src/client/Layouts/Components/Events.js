import RSSParser from 'rss-parser';
import moment from 'moment';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";


const myEvents = [];

let parser = new RSSParser();
parser.parseURL(CORS_PROXY + 'https://events.uhcl.edu/rss/feed.php?l=7,20,1,39', function(err, feed) {
	//console.log(feed.title);
	feed.items.forEach(function(entry) {
		//console.log(entry.title + ':' + entry.link);
		myEvents.push({
			id: 0, // non-deletable event
			start: new Date(entry.pubDate),
			end: new Date(moment(entry.pubDate).add(2,"hours")),
			title: entry.title.split(' - ')[1],
			desc: entry.content.replace(/<(?:.|\n)*?>/gm, ''),
		})
	})
})

console.log(myEvents);
export { myEvents };

