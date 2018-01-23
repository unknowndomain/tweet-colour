var regex = /^([\w|\s]+),#([\dA-F]){6}$/;

var fs = require( 'fs' );

var file = fs.readFileSync( './colours.csv' ).toString();
var lines = file.split( '\n' );

var output = '';

for ( var l in lines ) {
	var line = lines[l].trim().match( regex );
	if ( line ) output+= line[0] + '\n';
}

console.log( output );

fs.writeFileSync( './newColours.csv', output );
