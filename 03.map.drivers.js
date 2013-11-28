$.mapHTML = {
	w: 2,	// width of lines
	font: 20,	// font size
	bgcolor: '#000',
	W: null,
	H: null,
	BOX: null,
	init: function( $box, w, h) { this.BOX  = $box; this.W = w; this.H = h; },
	link: function( h) { h = h.curve; for ( var i = 1; i < h.length; i++) { 
		var one = h[ i - 1]; var two = h[ i];
		var x1 = one.x; var x2 = two.x; if ( x2 < x1) { x1 = x2; x2 = one.x; }
		var y1 = one.y; var y2 = two.y; if ( y2 < y1) { y1 = y2; y2 = one.y; }
		$.log( 'x1~y2', x1, x2, y1, y2);
		var $box = this.BOX.ioover();
		$box.css({ left: ( 100 * x1) + '%', top: ( 100 * ( one.y < two.y ? y2 : y1)) + '%', width: ( 100 * ( x2 - x1)) + '%', height: this.w + 'px', 'background-color': this.bgcolor})
		$box = this.BOX.ioover();
		$box.css({ left: ( 100 * ( one.x < two.x ? x1 : x2)) + '%', top: ( 100 * y1) + '%', width: this.w + 'px', height: ( 100 * ( y2 - y1)) + '%', 'background-color': this.bgcolor})
	}},
	node: function( h, c) { 
		var $box = this.BOX.ioover().append( h.name).css({ 'font-size': this.font + 'px', color: '#fff', height: 'auto', 'background-color': '#000', width: 'auto'})
		var  x = Math.round( this.W * ( h.x + 0.5 * h.width) - 0.5 * $box.width());
		var y = Math.round( this.H * ( h.y + 0.5 * h.height) - 0.5 * $box.height());
		$box.css({ left: ( 100 * x / this.BOX.width()) + '%', top: ( 100 * y / this.BOX.height()) + '%'})
		$box.ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.7, on: 0.4}).onclick( c)
	}
	
}
$.mapSVG = {
	w: 2,	// width of lines
	font: 20,	// font size
	bgcolor: '#000',
	W: null,
	H: null,
	BOX: null,
	SVG: null,
	init: function( $box, w, h) { this.BOX  = $box; this.W = w; this.H = h; this.SVG = $box.svgcanvas( [ this.bgcolor, 1.0, this.bgcolor, 1.0, this.w, 5]); },
	link: function( h) { h = h.curve; for ( var i = 1; i < h.length; i++) { 
		var one =  h[ i - 1]; var two = h[ i];
		var x1 = one.x * this.W; var y1 = one.y * this.H;
		var x2 = two.x * this.W; var y2 = two.y * this.H;
		this.SVG.line( [ x1, y1], [ x2, y2]);
	}},
	node: function( h, c) { 
		var  x = Math.round( this.W * ( h.x + 0.5 * h.width) - 0.5 * this.font);
		var y = Math.round( this.H * ( h.y + 0.5 * h.height)) // ( - 0.5 * this.font);
		var $box = $( this.SVG.text( [ x, y], h.name, null, [ this.bgcolor, 1.0, this.bgcolor, 1.0, 0, 5]));
		$box.css({ width: 'auto', height: 'auto'})
		$box.ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.7, on: 0.4}).onclick( function() { $.log( 'click')})
	}
	
}
$.mapCANVAS = {
	w: 2,	// width of lines
	font: 20,	// font size
	bgcolor: '#000',
	W: null,
	H: null,
	BOX: null,
	C: null,
	init: function( $box, w, h) { this.BOX  = $box; this.W = w; this.H = h; this.C = $box.canvas( [ this.bgcolor, 1.0, this.bgcolor, 1.0, this.w, 5]); },
	link: function( h) { h = h.curve; for ( var i = 1; i < h.length; i++) { 
		var one =  h[ i - 1]; var two = h[ i];
		var x1 = one.x * this.W; var y1 = one.y * this.H;
		var x2 = two.x * this.W; var y2 = two.y * this.H;
		this.C.beginPath();
		this.C.moveTo( [ x1, y1]);
		this.C.lineTo( [ x2, y2]);
		this.C.stroke();
		this.C.closePath();
	}},
	node: function( h, c) { 
		var $box = this.BOX.ioover().append( h.name).css({ 'font-size': this.font + 'px', color: '#fff', height: 'auto', 'background-color': '#000', width: 'auto'})
		var  x = Math.round( this.W * ( h.x + 0.5 * h.width) - 0.5 * $box.width());
		var y = Math.round( this.H * ( h.y + 0.5 * h.height) - 0.5 * $box.height());
		$box.css({ left: ( 100 * x / this.BOX.width()) + '%', top: ( 100 * y / this.BOX.height()) + '%'})
		$box.ioatomsPlainButton({ donotwrap: true, off: 1.0, hover: 0.7, on: 0.4}).onclick( c)
	}
	
}

