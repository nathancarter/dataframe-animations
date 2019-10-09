
var slider, main, boxes = [ ], color='white', reverse = false;
const w = 75, h = 75;

function setColor ( c ) { color = c; }
function setReverse ( r ) { reverse = r; update(); }

function addBox ( text, x1, y1, x2, y2 ) {
    var box = document.createElement( 'div' );
    box.innerHTML = '<p style="margin: auto;">' + text + '</p>';
    box.style.display = 'flex';
    box.style.border = '1px solid black';
    box.style.width = w;
    box.style.height = h;
    box.style.background = color;
    main.appendChild( box );
    box.style.position = 'absolute';
    box.style.left = x1 * w;
    box.style.top = y1 * h;
    box.limits = { x1 : x1 * w, y1 : y1 * h,
                   x2 : x2 * w, y2 : y2 * h };
    boxes.push( box );
}

function addBoxes () {
    for ( var i = 0 ; i < arguments.length ; i += 5 )
        addBox( arguments[i], arguments[i+1],
                arguments[i+2], arguments[i+3], arguments[i+4] );
}

function update () {
    boxes.map( box => {
        var t = slider.value / 100;
        if ( reverse ) t = 1 - t;
        box.style.left = ( 1 - t ) * box.limits.x1 + t * box.limits.x2;
        box.style.top  = ( 1 - t ) * box.limits.y1 + t * box.limits.y2;
    } );
}

window.addEventListener( 'load', function () {
    slider = document.createElement( 'input' );
    slider.setAttribute( 'type', 'range' );
    slider.setAttribute( 'min', 0 );
    slider.setAttribute( 'max', 100 );
    slider.setAttribute( 'value', 0 );
    slider.style.width = 500;
    slider.addEventListener( 'input', update );
    document.body.appendChild( slider );
    document.body.appendChild( document.createElement( 'p' ) );
    main = document.createElement( 'div' );
    main.style.position = 'relative';
    document.body.appendChild( main );
} );

