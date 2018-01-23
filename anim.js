var Animation = require( 'animation' ).Animation;
var onecolor = require( 'onecolor' );

var start = onecolor( 'pink' );
var current = start;
var target = onecolor( 'white' );

var time = 1000;

var animation = new Animation( {
	frame:'100ms'
} );

animation.on( 'tick', function( dt ) {
	var steps = Math.round( time / dt );
	var h_change = precisionRound( ( target.hue() - start.hue() ) / steps, 3 );
	var s_change = precisionRound( ( target.saturation() - start.saturation() ) / steps, 3 );
	var v_change = precisionRound( ( target.value() - start.value() ) / steps, 3 );

	current = current.hue( h_change, true );
	current = current.saturation( s_change, true );
	current = current.value( v_change, true );

	console.log( h_change );

	if ( h_change > 0 && current.hue() > target.hue() )					current.hue() = target.hue();
	if ( s_change > 0 && current.saturation() > target.saturation() )	current.saturation() = target.saturation();
	if ( v_change > 0 && current.value() > target.value() )				current.value() = target.value();
	if ( h_change < 0 && current.hue() < target.hue() )					current.hue() = target.hue();
	if ( s_change < 0 && current.saturation() < target.saturation() )	current.saturation() = target.saturation();
	if ( v_change < 0 && current.value() < target.value() )				current.value() = target.value();

	console.log( current );

	if ( current.equals( target ) ) {
		animation.stop();
		console.timeEnd( 'test' );
	}
} );

// animation.on( 'tick', function( dt ) {
// 	var steps = Math.round( time / dt );
// 	var change = ( target - start ) / steps;
// 	current += change;
//
// 	if ( change > 0 && current > target ) current = target;
// 	if ( change < 0 && current < target ) current = target;
// 	current = Math.round( current );
//
// 	console.log( current );
//
// 	if ( current == target ) {
// 		animation.stop();
// 		console.timeEnd( 'test' );
// 	}
// } );

console.time( 'test' );
animation.start();

function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}
