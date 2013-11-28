// c( button clicked)  data: links, nodes
$.fn.mapper = function( w, h, driver, data, donec, c) { var $me = $( this).first().css({ overflow: 'visible'}); $me.ioanimoutemptyin( 'fast', function() { 
	var $floor = $me.ioover( true).css({ margin: '10px', width: Math.round( parseInt( '' + w)) + 'px', height: Math.round( parseInt( '' + h)) + 'px', border: '1px solid #555'});
	driver.init( $floor, w, h); // initiate the floor
	var $over = $floor.ioover().css({ 'z-index': 100000}).ioground( '#000', 0.9)
	.ioover().append( 'initiating...').css({ height: 'auto', 'font-size': $.io.font.bigass, color: '#fff', 'text-align': 'center'})
	$over.iocenterv();
	var link = function( h, c) { driver.link( h); c(); }
	var node = function( h, c2) { driver.node( h, c); c2(); }
	var L = []; 
	for ( var i in data.nodes) L.push( data.nodes[ i]);
	for ( var i in data.links) L.push( data.links[ i]);
	$me.ioloop( L, '10ms', function( dom, value, sleep, c2) { 
		if ( ! value.length) return $over.parent().ioanimoutremove( 'fast', function() { c2();})
		var h = value.shift(); 
		if ( h.curve) return link( h, function() { c2( value) })
		else return node( h, function() { c2( value)})
	})
	donec( $floor); 
})}
