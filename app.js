var tweetEx = /^(#\w+){0,1} ?([A-z|\s]+) ?(#\w+){0,1}$/;

var config = require( './config/config.json' );

var connect_time = 1000;
var tweets = [];

var Twitter = require( 'node-twitter' );

var twitterStreamClient = new Twitter.StreamClient(
	config.consumer_key,
	config.consumer_secret,
	config.token,
	config.token_secret
);

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

	console.log( tweet.text );
	if ( tweet.text.match( tweetEx ) ) {
		console.log( 'Tweet detected: ' + tweet.text );
		tweets.push( tweet.text );
	}
} );

function startDisplaying() {
	setInterval( display, 10000 );
	display();
}

function display() {
	var str = tweets.pop();

	if ( str ) {
		console.log( 'Displaying: "' + str + '"' );
		// Do something
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
