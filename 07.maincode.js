// https://dl.dropboxusercontent.com/s/6iop3tlgwnqvg9h/cloudq9maps.html
// http://tinyurl.com/cloudq9maps
// backup/temp:  https://dl.dropboxusercontent.com/s/rsmp9fl9t2e0hrq/cloudq9mapstemp.html
$.ioutils.nolog = true;
var T = {}; var logger = { log: function() { }} // real logger dumps stuff to dropbox
T.metromap = function( logger, $box) { $box.maps({ scale: 40}, MAPS[ 'metromap'], N2D, function() {}, logger)}
T.mindmap = function( logger, $box) { $box.maps({ scale: 40}, MAPS[ 'mindmap'], N2D, function() {}, logger)}
T.list = function( logger, $box) {
	$box.ioover( true).css({ height: '10px'});
	var $box1 = $box.ioover().css({ width: '30%', 'border-right': '1px solid #000'});
	var $box2 = $box.ioover().css({ left: '31%', width: '65%'});
	var show = function( name) { $box2.ioanimoutemptyin( 'fast', function() { 
		$box2.ioover({ position: 'relative', float: 'left', clear: 'left', margin: '2px 2px', width: '35px', height: '35px'})
		.iodrawFastForward()
		.ioatomsPlainButton({ donotdraw: true, donotwrap: true})
		.onclick( function() { 
			$( 'body').fullscreenclosebox().append( $.s642s( N2D[ name])).css({ 'font-size': $.io.font.large})
			logger.log({ time: $.iotime(), type: 'show', name: name, mode: 'fullscreen'})
		})
		$box2.append( $.s642s( N2D[ name])).css({ 'font-size': $.io.font.large, color: '#000'})
		logger.log({ time: $.iotime(), type: 'show', name: name})
	})}
	var one = function( name) { $box1.ioover({ position: 'relative', float: 'left', margin: '2px 3px', width: 'auto', height: 'auto', 'font-size': $.io.font.large, 'text-decoration': 'underline', color: '#666'}).append( name).ioatomsPlainButton({ donotdraw: true, donotwrap: true, off: 1.0, hover: 0.7, on: 0.4}).onclick( function() { show( name); })}
	$box.ioloop( $.hk( N2D), '1ms', function( dom, value, sleep, c) { 
		if ( ! value) return eval( c)();
		one( value.shift());
		c( value);
	})
	
}
$( 'body').empty().grid( '0.25,0.2,0.3,0.25', '1', '#000,0.1', function( G) { 
	var L = $.ttl( 'metromap,mindmap,list');
	$.mathShuffle( L); $.log( 'button list', L);
	L = $.ttl( 'metromap,list,mindmap'); // remove when commercial
	var start = function( type) { var name = 'somename'; if ( name == 'name' || name == 'name?' || name == '?') return input.val( '?'); $.log( 'name', name); $( 'body').fullscreenclosebox( '#fff', 1.0, function( $box, $box2, $box3) { 
		$.LSset( 'cloudq9name', name);
		$box2.remove();
		var $box3 = $box.children().first().ioafter();
		$box3.css({ border: '1px solid #000'});
		$box3.ioover().css({ top: '-1px', left: '-1px', width: '1px', height: '1px'})
		eval( T[ type])( logger, $box3);
	})}
	var button = function( pos, $box) { $box.mybutton( L[ pos], $.io.style.canvas.info, true, function() { start( L[ pos]);}, true)}
	// change 1 > 3 buttons when layout is OK and you can go commercial
	G.outer( 2, 0).empty().grid( '1', '0.33,0.33,0.33', '#000,0.1', function( G2) { for ( var i = 0; i < 3; i++) { button( i, G2.outer( 0, i)); }})
})


