$.fn.myinput = function( name, ground, c) { $( this).empty().css({ position: 'relative'}).formtextgrid( '1', '1', name, ground ? ground : $.io.defs.colors.fg + ',0.2', function( G) { $.log( 'OK'); G.inner( 0, 0).css({ 'vertical-align': 'middle', 'text-align': 'left', 'background-color': 'transparent', color: '#666'}); G.inner( 0, 0).keyup( function() { G.inner( 0, 0).stopTime().oneTime( '100ms')}); if ( c) eval( c)( G); })}
$.fn.mymsg = function( show, oneline, ground, css, c, centerv) { $( this).empty().grid( '1', '1', ground ? ground : $.io.defs.colors.fg + ',0.2', function( G) { var last = show  ? show : ''; if ( css) G.inner( 0, 0).css( css); if ( show) G.inner( 0, 0).empty().append( show).iofitext( null, oneline, centerv); if ( c) eval( c)( { msg: function( show) { if ( ! show) return last; last = '' + show; G.inner( 0, 0).empty().append( '' + show).iofitext( null, oneline, centerv);}, add: function( show) { this.msg( this.msg() + '' + show); }, clear: function() {  G.inner( 0, 0).empty(); last = '';}});})}
$.fn.myanimsg = function( show, oneline, ground, css, c, centerv) {  $( this).empty().grid( '1', '1', ground ? ground : $.io.defs.colors.fg + ',0.2', function( G) {  var last = show ? show : '';  if ( css) G.inner( 0, 0).css( css);  var wait = function() { G.outer().stopTime().oneTime( '2s', function() { G.inner( 0, 0).ioanimoutemptyin( 'slow', function() { })})}; if ( show) { G.inner( 0, 0).empty().append( show).iofitext( null, oneline, centerv); eval( wait)(); };  if ( c) eval( c)( { msg: function( show) { if ( ! show) return last; last = '' + show; G.inner( 0, 0).empty().append( '' + show).iofitext( null, oneline, centerv); eval( wait)(); }, add: function( show) { this.msg( this.msg() + '' + show); }, clear: function() {  G.inner( 0, 0).empty(); last = '';}}); })  }
$.fn.myupload = function( filename, ground, c) { $( this).empty().formuploadgrid( '1', '1', filename, ground ? ground : $.io.style.canvas.info, function( G) { if ( c) eval( c)( G); });}
$.fn.myclosebutton = function( c) { $( this).empty().iodrawClose( $.io.style.canvas.alert).ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.8, on: 0.5}).onclick( c);} 
$.fn.myreloadbutton = function( c, canvas) { $( this).empty().iodrawRefresh( canvas ? canvas : $.io.style.canvas.alert).ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.8, on: 0.5}).onclick( c);} 
$.fn.myprevbutton = function( c) { $( this).empty().iodrawBackward( $.io.style.canvas.alert).ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.8, on: 0.5}).onclick( c);} 
$.fn.mynextbutton = function( c) { $( this).empty().iodrawForward( $.io.style.canvas.alert).ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.8, on: 0.5}).onclick( c);} 
$.fn.mybutton = function( show, draw, oneline, c, showagain) { 
	var $me = $( this); 
	if ( ! $.browser || ! $.browser.msie) return $me.empty().buttongrid( '1', '1', show, null, function() { if ( c) eval( c)(); if ( showagain) $me.mybutton( show, draw, oneline, c, showagain); }, draw ? draw : $.io.style.info, null, oneline)
	$me.empty();
	$me.ioground( draw[ 0], draw[ 1]);
	var $box = $me.ioover().css({ 'text-align': 'center', 'text-decoration': 'underline'}).append( show)
	$box.iofitext( null, oneline, true);
	$box.ioatomsPlainButton({ donotwrap: true, donotdraw: true})
	.onclick( c)
}
$.fn.myonoffbutton = function( show, draw, oneline, c) { var $me = $( this); $me.empty().onoffbuttongrid( '1', '1', show, null, function( status, label, button) { if ( c) eval( c)( status, label, button);}, draw ? draw : $.io.style.info, null, oneline)}
$.fn.myconfirmbutton = function( show, draw, oneline, c) { $( this).empty().confirmbuttongrid( '1', '1', show, null, c, draw ? draw : $.io.style.info, null, oneline)}
$.fn.myplainbutton = function() { return $( this).ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.8, on: 0.5})}
$.fn.myregulargrid = function( rows, cols, ground, c) {  var $me = $( this).empty(); var row = 1 / rows; var col = 1 / cols; var rows2 = []; for ( var i = 0; i < rows; i++) rows2.push( row); var cols2 = []; for ( var i = 0; i < cols; i++) cols2.push( col); $me.grid( $.ltt( rows2, ','), $.ltt( cols2, ','), ground, function( G) { if ( c) eval( c)( G); }) }
$.fn.mylogbox = function() { var $box = $( this).ioover({ position:'absolute', top: '1%', left: '1%', width: '98%', height: '98%'}).ioatomsMockVFrame({ margin: '0px'}).inner(); return { inner: function() { return $box; }, errs: function( errs) { if ( ! $.isArray( errs)) errs = [ errs]; for ( var i in errs) errs[ i] = 'ERROR! ' + errs[ i]; this.log( errs); }, log: function( msg) { return $box.msg( msg, 'under').css({ color: '#555', 'font-size': $.io.defs.fonts.small}); }};}
$.fn.fullscreenclosebox = function( ground, opacity, c) { 
	var $me = $( this).eq( 0);
	var $box = $me.ioover()
	.css({ overflow: 'hidden', 'z-index': 2000000})
	var $box2 = $box.ioground( ground ? ground : '#000', opacity ? opacity : 0.9).ioover().css({ top: '5%', left: '5%', width: '90%', height: '90%', border: '1px solid #000'})
	var $box3 = $box2.ioover( true).css({ margin: '5px 0px 0px 1%', width: '98%', color: '#fff', 'font-size': $.io.font.normal})
	$box.ioover({ position: 'absolute', top: '5px', right: '5px', width: '50px', height: '50px'})
	.iodrawClose()
	.ioatomsPlainButton({ donotwrap: true, donotdraw: true})
	.onclick( function() {  $box.ioanimoutremove( 'fast')})
	if ( c) c( $box, $box2, $box3);
	return $box3;
}

