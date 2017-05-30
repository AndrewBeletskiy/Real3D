console.log("Camera.js has been connected.")
var Camera = function(position, direction, up, near, far, horizontalAngle, verticalAngle) {
    this.position = position;
    this.direction = direction.getUnitary();
    this.up = up.getUnitary();
    this.near = near;
    this.far = far;
    this.horizontalAngle = horizontalAngle;
    this.verticalAngle = verticalAngle;
}

Camera.prototype.isInSight = function(point) {
    var dr = point.substract(this.position);
    var minAngle = (this.horizontalAngle > this.verticalAngle) 
                    ? this.horizontalAngle
                    : this.verticalAngle;
    return (point.getDistantion(this.position) >= this.near) 
           && (point.getDistantion(this.position) <= this.far) 
           && (Math.cos(minAngle) < point.substract(this.position).cos(this.direction));
}


Camera.prototype.translatePoint = function(point) {

    if (this.isInSight(point) || true)
    {
        var dir = this.direction;
        var pos = this.position;
        var top = this.up;

        var dr = point.substract(pos).getUnitary();
        var cos = dr.cos(dir);
        dr = dr.multiply(this.near / cos);
        var a = dr.substract(dir.multiply(this.near));
        var cosy = a.cos(top);
        var ox = dir.vectorProduct(top);
        var cosx = a.cos(ox);


        var x = a.getLength() * cosx;
        var y = a.getLength() * cosy;
        return new Point(x,y,0);

    } else {
        return null;
    }
}

Camera.prototype.translatePoints = function(points) {
    var res = [];
    for (var i = 0; i < points.length; i++) {
        var newPoint = this.translatePoint(points[i]);
        if (newPoint != null) {
            res.push(newPoint);
        }
    }
    return res;
}

Camera.prototype.toString = function() {
    return "Camera -> Position: " + this.position.toString()
                  + " Direction: " + this.direction.toString()
                  + "\nUp: " + this.up.toString() 
                  + "\nNear: " + this.near
                  + " Far: " + this.far
                  + "\nHorizontalAngle: " + Help.formatNumber(this.horizontalAngle/Math.PI * 180,2) + "°"
                  + " VerticalAngle: " + Help.formatNumber(this.verticalAngle / Math.PI * 180,2) + "°";
}