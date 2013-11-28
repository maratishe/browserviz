// draws maps from a definition -- note that you have to define the structure yourself
// setup: { scale: px (height of one line in the grid), ...}
// info: { station|line: desk}
// structure: [ { station: [ lines], ...}, { station: [ lines], ...}, ...]
$.fn.maps = function( setup, structure, info, c, logger) {
	if ( ! setup) setup = {};
	if ( ! setup.scale) setup.scale = 25;
	setup.panel = 0.2; // 20% on the left side
	setup.uh = setup.scale;
	setup.us = 10 * setup.scale;
	setup.th = 0.05;	// thickness, 5% of .us
	setup.vgap = 3; 	// 3 * .uh
	setup.ymax = 0;
	setup.xmax = 0;
	var colors = $.ttl( '#093,#f93,#66f,#c3f,#09c,#f69,#09f,#c90,#099');
	setup.colors = {}; for ( var i in structure) for ( var station in structure[ i]) for ( var ii in structure[ i][ station]) if ( ! setup.colors[ structure[ i][ station][ ii]]) { setup.colors[ structure[ i][ station][ ii]] = colors[ 0]; colors.push( colors.shift()); }
	for ( var i in structure) { setup.xmax = i; var y = 0; for ( var station in structure[ i]) y += $.hk( structure[ i][ station]).length; y += setup.vgap * ( $.hk( structure[ i]).length - 1); if ( y > setup.ymax) setup.ymax = y; }
	//$.log( 'setup', setup);
	var $me = $( this).eq( 0); //me.empty();
	var a = $me.iomakegui( null, 'MAPS'); // no setup and do not hook
	a.setup = setup;
	a.structure = structure;
	a.info = info;
	a.logger = logger;
	a.history = {}; // { line: true,...}   -- whether or not a line was used
	a.boxes = {}; // panel, nav, info, map, mapfloor, status
	a.show = function( name) { a.boxes.info.ioanimoutemptyin( 'fast', function() { 
		a.boxes.info.ioover({ position: 'relative', float: 'right', clear: 'right', margin: '2px 2px', width: '30px', height: '30px'})
		.iodrawFastForward()
		.ioatomsPlainButton({ donotdraw: true, donotwrap: true})
		.onclick( function() { 
			$( 'body').fullscreenclosebox().append( $.s642s( a.info[ name])).css({ 'font-size': $.io.font.large})
			if ( a.logger) a.logger.log({ time: $.iotime(), type: 'show', name: name, mode: 'fullscreen'})
		})
		a.boxes.info.append( $.s642s( a.info[ name])).css({ 'font-size': $.io.font.big})
		if ( a.logger) a.logger.log({ time: $.iotime(), type: 'show', name: name})
	})}
	a.nav = function() { 
		var h1 = {}; h1.w = a.boxes.nav.width(); h1.h = a.boxes.nav.height();
		var h2 = {}; h2.w = a.boxes.map.width(); h2.h = a.boxes.map.height();
		var h3 = {}; h3.w = a.boxes.mapfloor.width(); h3.h = a.boxes.mapfloor.height();
		var w = Math.round( 100 * h2.w / h3.w);
		var h = Math.round( 100 * h2.h / h3.h);
		var $box = a.boxes.nav.ioover().css({ width: w + '%', height: h + '%', border: '1px solid #000'})
		$box.ioground( '#000', 0.5); 
		var boxw = a.boxes.nav.width(); var boxh = a.boxes.nav.height();
		var boxw2 = $box.width(); var boxh2 = $box.height();
		var round = function() { $box.unbind().mousedown( function( e) { 
			var pos = $box.position();
			var x = e.pageX; var y = e.pageY; 
			var done = function() { move(); $box.stopTime(); round(); }	// go again
			var timeout = function() { $box.stopTime().oneTime( '2s', done)}
			var move = function() { a.boxes.mapfloor.stopTime().oneTime( '500ms', function() { 
				var top = Math.round( ( pos.top / boxh) * h3.h);
				var left = Math.round(  ( pos.left / boxw) * h3.w);
				a.boxes.mapfloor.css({ top: ( - top) + 'px', left: ( - left) + 'px'})
			})}
			$box.mousemove( function( e) { 
				var xdiff = e.pageX - x; 
				var ydiff = e.pageY - y;
				if ( pos.top > 0.9 * boxh) ydiff = 0;
				if ( pos.left > 0.9 * boxw) xdiff = 0;
				if ( pos.top + boxh2 < 0.1 * boxh) ydiff = 0;
				if ( pos.left + boxw2 < 0.1 * boxw) xdiff = 0;
				pos.top += ydiff; pos.left += xdiff;
				x = e.pageX; y = e.pageY;
				$box.css({ top: pos.top + 'px', left: pos.left + 'px'})
				timeout();
				move();
			})
			$box.mouseup( done)
			$box.mouseout( done)
			timeout();
		})}
		round();
	}
	a.layout = function( c) { $me.ioanimoutemptyin( 'fast', function() { $me.grid( '1', '' + setup.panel + ',' + ( 1 - setup.panel), '#000,0.1', function( G) { G.outer( 0, 0).empty().grid( '0.3,0.7', '1', '#000,0.1', function( G2) { 
		a.boxes.nav = G2.outer( 0, 0).empty().css({ border: '1px solid #999'}).ioover().css({ overflow: 'hidden'})
		a.boxes.info = G2.inner( 1, 0).css({ overflow: 'hidden'});
		a.boxes.map = G.outer( 0, 1).empty().css({ border: '1px solid #999'})
		.ioover().css({ overflow: 'hidden'})
		a.boxes.status = $me.ioover({ bottom: '0px', right: '0px', width: 'auto', height: 'auto', 'font-size': $.io.font.normal, color: '#666'})
		a.boxes.mapfloor = a.boxes.map.ioover()
		.css({ width: Math.round( setup.us * ( structure.length + 1)) + 'px', height: Math.round( setup.uh * ( setup.ymax + 2)) + 'px'})
		c();
	})})})}
	a.line = function( $box, name) {
		var $box1 = $box.ioover();
		if ( ! a.history[ name]) $box1.css({ left: '50%', width: '50%'})
		$box1.ioground( a.setup.colors[ name], 0.7);
		var $box2 = $box.ioover({ position: 'absolute', right: '10px', top: '0px', width: 'auto', height: '99%', color: '#fff', 'text-align': 'right'})
		$box2.append( name).iofitext( null, true, true);
		$box2.ioatomsPlainButton({ donotwrap: true, donotdraw: true, off: 1.0, hover: 0.7, on: 0.4})
		.onclick( function() { a.show( name); })
		// create a clone box in navigator window
		var h1 = $box.position(); h1.width = $box.width(); h1.height = $box.height();
		var h2 = $box.parent().position(); h2.width = $box.parent().parent().width(); h2.height = $box.parent().parent().height();
		var h3 = $box2.position(); h3.width = $box2.width(); h3.height = $box2.height();
		//$.log( 'width1/width2', h3.width, h1.width);
		var $box3 = a.boxes.shadow.ioover();
		$box3.css({ 
			left: Math.round( 100 * ( h3.left / h1.width)) + '%', 
			top: Math.round( 100 * ( ( h1.top + h2.top) / h2.height)) + '%', 
			height: Math.round( 100 * ( h1.height / h2.height)) + '%',
			width: Math.round( 100 * ( h3.width / h1.width)) + '%'
		})
		$box3.ioground( a.setup.colors[ name], 0.7);
		$box3.ioover({ position: 'absolute', right: '0px', top: '0px', width: '3px', height: '100%'})
		.ioground( '#000', 1.0)
	}
	a.station = function( $box, name) {
		var $box2 = $box.ioover({ position: 'absolute', top: '-10%', right: '-' + Math.round( 0.1 * a.setup.uh) + 'px', width: Math.round( 0.2 * a.setup.uh) + 'px', height: '120%'})
		$box2.css({ 'z-index': 100})
		$box2.ioground( '#000', '1.0');
		var $box3 = $box2.ioover({ position: 'absolute', top: '100%', left: '-100px', width: '200px', height: Math.round( 1.5 * a.setup.uh) + 'px', 'text-align': 'center'})
		var $box4 = $box3.ioover();
		$box4.append( name).iofitext( null, true, false);
		$box4.ioatomsPlainButton({ donotwrap: true, donotdraw: true, off: 1.0, hover: 0.6, on: 0.4})
		.onclick( function() { a.show( name); })
	}
	a.stage = function( x, $box) { 
		var y = 0; 
		// shallow box in navigator window
		a.boxes.shadow = a.boxes.nav.ioover();
		var h1 = $box.position(); h1.width = $box.width();
		var h2 = {}; h2.width = a.boxes.mapfloor.width(); h2.height = a.boxes.mapfloor.height();
		//$.log( h1, h2)
		a.boxes.shadow.css({ left: Math.round( 100 * ( h1.left / h2.width)) + '%', width: Math.round( 100 * ( h1.width / h2.width)) + '%', overflow: 'hidden'})
		// main box on the map floor
		$box.ioover( true).css({ position: 'relative', width: '100%', height: Math.round( 0.5 * a.setup.uh) + 'px', margin: '0px'});
		for ( var station in a.structure[ x]) { 
			var $box2 = $box.ioover( true).css({ position: 'relative', margin: '0px', width: '100%', height: 'auto'})
			for ( var i in a.structure[ x][ station]) {
				var $box3  = $box2.ioover( true).css({ position: 'relative', width: '100%', height: a.setup.uh + 'px', margin: '0px'});
				a.line( $box3, a.structure[ x][ station][ i]);
				a.history[ a.structure[ x][ station][ i]] = true;
			}
			a.station( $box2, station);
			$box.ioover( true).css({ position: 'relative', margin: '0px', width: '100%', height: ( a.setup.vgap * a.setup.uh) + 'px'})
		}
		
	}
	a.draw = function( c) { var x = 0; $me.ioloop( x, '1ms', function( dom, value, sleep, c2) {
		if ( x == a.structure.length) { a.boxes.status.empty(); eval( c2)(); return eval( c)(); }
		a.boxes.status.empty().append( 'Stage <strong>' + ( x + 1) + '</strong>');
		var $box = a.boxes.mapfloor.ioover({ float: 'left', position: 'relative', display: 'block', margin: '0px', height: '99%', width: a.setup.us + 'px'})
		a.stage( x, $box); x++;
		eval( c2)( x);
	})}
	a.layout( function() { a.draw( function() { a.nav(); if ( c) c(); })})
}
