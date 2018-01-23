var config = require( './config/config.json' );

var Twitter = require( 'node-twitter' );
var fs = require( 'fs' );
var onecolor = require( 'onecolor' );
var artnet = require( 'artnet' )( { host: config.artnetHost, sendAll: true } );

var tweetEx = /^(#\w+){0,1} ?([A-z|\s]+) ?(#\w+){0,1}$/;

var connect_time = 1000;
var tweets = [];

var location = 0;
var locations = 3;

var twitterStreamClient = new Twitter.StreamClient(
	config.consumer_key,
	config.consumer_secret,
	config.token,
	config.token_secret
);

var file = fs.readFileSync( './colours.csv' ).toString();
var lines = file.split( '\n' );
var colours = {};
for ( var l in lines ) {
	var line = lines[l].split(',');
	var name = line[0].trim().toLowerCase();
	colours[ name ] = onecolor( line[1].trim().substring( 1 ) );
}

setInterval( display, 1000 );
display();

twitterStreamClient.on( 'close', function() {
	console.log( 'Connection closed.' );
	reconnect();
} );

twitterStreamClient.on( 'end', function() {
	console.log( 'End of line.' );
	reconnect();
} );

twitterStreamClient.on( 'error', function( error ) {
	console.log( 'Error: ' + ( error.code ? error.code + ' ' + error.message : error.message ) );

} );

twitterStreamClient.on( 'tweet', function( tweet ) {
	connect_time = 1000;

	var match = tweet.text.match( tweetEx );
	if ( match ) {
		console.log( 'Tweet detected: ' + tweet.text );
		var colour = match[2].trim().toLowerCase();

		if ( colours[colour] ) {
			var rgb = colours[colour];
			console.log( 'Colour R:' + rgb.red() + ' G: ' + rgb.green() + ' B: ' + rgb.blue() );
			tweets.push( rgb );
		}
	}
} );

function display() {
	var rgb = tweets.pop();

	if ( rgb ) {
		var address = config.startChannel + ( location * 3 );

		var red = rgb.red() * 255;
		var green = rgb.green() * 255;
		var blue = rgb.blue() * 255;

		artnet.set( address, [ red, green, blue ] );

		location++;
		if ( location >= locations ) location = 0;
	}
}

function connect() {
	console.log( 'Connecting to Twitter...' );
	twitterStreamClient.start( config.keywords );
}

function reconnect() {
	connect_time *= 2;
	console.log( 'Disconnected, will reconnect in ' + ( connect_time / 1000 ) + ' seconds.' );
	setTimeout( function() { connect(); }, connect_time );
}

connect();
