var center = new Point(screenSize.x / 2, screenSize.y / 2, 0);
var mashtab = new Point(16000, 16000, 0);
var printPoint = function(point, color) {
    var last = ctx.fillStyle;
    if (color != undefined) {
        ctx.fillStyle = color;
    }

    ctx.fillRect(point.x * mashtab.x + center.x -2 , center.y - point.y * mashtab.y - 2, 4,4);
    ctx.fillStyle = last;
}
var setCursor = function(point) {
    ctx.beginPath();
    ctx.moveTo(point.x * mashtab.x + center.x, center.y - point.y * mashtab.y);
}
var moveCursor = function(point) {
    
    ctx.lineTo(point.x * mashtab.x + center.x, center.y - point.y * mashtab.y);
    ctx.stroke();
}
var drawLine = function(a,b) {
    setCursor(a);
    moveCursor(b);
}
var drawPoligon = function(a,b,c,d) {
    setCursor(a);
    moveCursor(b);
    moveCursor(c);
    moveCursor(d);
    moveCursor(a);
}
//var camera = new Camera(position, direction, up, near, far, horizontalAngle, verticalAngle)


//var camera = new Camera(new Point(3,3,3), new Point(-3,-3,-3), Point.K, Math.PI / 4, Math.PI / 4);
var z = -25;
var zetFunction = function() {
    ctx.clearRect(0,0,screenSize.x, screenSize.y);
    z+=0.02;
    var pos = new Point(8*Math.sin(z),8*Math.cos(z),10*Math.sin(z/4));

    var dir = new Point(-pos.x, -pos.y, -pos.z);

    
    var up = new Point(dir.y, -dir.x, 0).vectorProduct(dir);


    var camera = new Camera(pos, // position
                        dir, // direction
                        up, // up
                        0.1, 100, 
                        Math.PI/2, Math.PI/2);

    var a = Point.NULL.add(new Point(0,0,0));
    var b = a.add(Point.I);
    var c = b.add(Point.J);
    var d = a.add(Point.J);
    var a2 = a.add(Point.K.multiply(0.5));
    var b2 = b.add(Point.K);
    var c2 = c.add(Point.K.multiply(0.5));
    var d2 = d.add(Point.K);
    var klmn = Math.abs(Math.sin(z/2))*2;
    var lastRandom = (lastRandom <0.0001) ? Math.random()*0.5 + lastRandom : 0.5;
   
    var points = [];

    points.push(a);
    points.push(b);
    points.push(c);
    points.push(d);

    points.push(a2);
    points.push(b2);
    points.push(c2);
    points.push(d2);

    at = camera.translatePoint(a);
    bt = camera.translatePoint(b);
    ct = camera.translatePoint(c);
    dt = camera.translatePoint(d);

    a2t = camera.translatePoint(a2);
    b2t = camera.translatePoint(b2);
    c2t = camera.translatePoint(c2);
    d2t = camera.translatePoint(d2);




    var translated = camera.translatePoints(points);
    for (var i = 0; i < translated.length; i++) {
        printPoint(translated[i], "#f0f");
    }
    //*
    drawPoligon(at,bt,ct,dt);
    drawPoligon(a2t,b2t,c2t,d2t);
    drawPoligon(at,bt,b2t,a2t);
    drawPoligon(bt,ct,c2t,b2t);
    drawPoligon(ct,dt,d2t,c2t);
    drawPoligon(dt,at,a2t,d2t);
    //*/
    drawLine(at, bt.substract(at).multiply(2).add(at));
    drawLine(at, dt.substract(at).multiply(2).add(at));
    drawLine(at, a2t.substract(at).multiply(2).add(at));
    drawLine(a2t, c2t);

    drawPoligon(kt, lt, mt, nt);
    drawPoligon(k2t, l2t, m2t, n2t);
    drawPoligon(kt, lt, l2t, k2t);
    drawPoligon(nt, mt, m2t, n2t);

    
    

}

//zetFunction();
var loop = setInterval(zetFunction, 10);
var stop = false;
window.addEventListener("click",function() {
    if (!stop)
    {
        clearInterval(loop);
    } else {
        loop = setInterval(zetFunction, 10);
    }
    stop = !stop;
});




