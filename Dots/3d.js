setScreenSize(800, 600);
var center = new Point(screenSize.x / 2, screenSize.y / 2, 0);
var mashtab = new Point(3200,3200, 0);
var printPoint = function(point, color, distantion) {
    var last = ctx.fillStyle;
    if (color != undefined) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }

    var maxmin = max - min;
    var delta = max - distantion;
    var size = delta * 2 / maxmin + 1;
    //var size = 1;


    //ctx.fillRect(point.x * mashtab.x + center.x -size/2 , center.y - point.y * mashtab.y - size/2, size,size);
    ctx.beginPath();
    ctx.arc(point.x * mashtab.x + center.x -size/2, center.y - point.y * mashtab.y - size/2, size, 0, Math.PI * 2);
    ctx.fill();
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
var max = -100;
var min = 100;

var points = [];

(function(){
    var dx = 5e-2;
    var dro = 1;
    var dphi = 0.5;
    var k = 1.1;
    
        for (var ro = 0; ro < 5; ro+=dro) {
            dphi = dro/k;
            for (var phi = 0; phi < 2*Math.PI; phi+=dphi) {
                var x = ro * Math.cos(phi);
                var y = ro * Math.sin(phi);
                var z = Math.cos(x*x + y*y)/(ro+1);
                points.push(new Point(x,y,z));
                

            }
            dro /= 1.1;
            if (dro < dx) {
                dro = dx;
            }
        }
    /*for (var x = -3; x <= 3; x+=dx) {
        for ( var y = -3; y <=3; y+=dx) {
            var z = Math.cos(x*x + y*y);
            points.push(new Point(x,y,z));
        }
    }*/
})();

//var camera = new Camera(new Point(3,3,3), new Point(-3,-3,-3), Point.K, Math.PI / 4, Math.PI / 4);
var z = -25;
var zetFunction = function() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,screenSize.x, screenSize.y);
    z+=0.02;
    var pos = new Point(6*Math.sin(z),6*Math.cos(z),6);

    var dir = new Point(-pos.x, -pos.y, -pos.z);

    
    var up = new Point(dir.y, -dir.x, 0).vectorProduct(dir);


    var camera = new Camera(pos, // position
                        dir, // direction
                        up, // up
                        0.1, 100, 
                        Math.PI/2, Math.PI/2);

    var translated = camera.translatePoints(points);
    max = -100;
    min = 100;

    for (var i = 0; i < points.length; i++) {
        var d = camera.position.getDistantion(points[i])
        if (d > max)
            max = d;
        if (d < min)
            min = d;
    }

    for (var i = 0; i < translated.length; i++) {
        //var color = (points[i].z>0) ? "#00f" : "#ff0";
        color = "rgb(" + Math.round(Math.random()*255) + ","
                       + Math.round(Math.random()*255) + ","
                       + Math.round(Math.random()*255) +")";
        printPoint(translated[i], color, camera.position.getDistantion(points[i]));

    }
    /*
    drawPoligon(at,bt,ct,dt);
    drawPoligon(a2t,b2t,c2t,d2t);
    drawPoligon(at,bt,b2t,a2t);
    drawPoligon(bt,ct,c2t,b2t);
    drawPoligon(ct,dt,d2t,c2t);
    drawPoligon(dt,at,a2t,d2t);
    //*/
    /*
    drawLine(at, bt.substract(at).multiply(2).add(at));
    drawLine(at, dt.substract(at).multiply(2).add(at));
    drawLine(at, a2t.substract(at).multiply(2).add(at));
    drawLine(a2t, c2t);
    //*/
    

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




