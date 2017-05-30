console.log("Point.js has been connected!");
var Point = function(x,y,z) {
    this.x = (x) ? x : 0;
    this.y = (y) ? y : 0;
    this.z = (z) ? z : 0;
}

Point.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Point.prototype.getUnitary = function() {
    var len = this.getLength();
    return new Point(this.x / len,
                     this.y / len,
                     this.z / len);
}

Point.prototype.add = function(another) {
    return new Point(this.x + another.x,
                     this.y + another.y,
                     this.z + another.z);
}

Point.prototype.substract = function(another) {
    return new Point(this.x - another.x,
                     this.y - another.y,
                     this.z - another.z);
}

Point.prototype.vectorProduct = function(another) {
    return new Point(this.y * another.z - this.z * another.y,
                     -(this.x * another.z - this.z * another.x),
                     this.x * another.y - this.y * another.x);
}

Point.prototype.scalarProduct = function(another) {
    return this.x * another.x + this.y * another.y + this.z * another.z;
}

Point.prototype.toString = function() {
    return "("+this.x+", "+this.y+", "+this.z+")";
}

Point.prototype.format = function(k) {
    if (k != undefined) {
        var ten = Math.pow(10, k);
        return "(" + Math.round(this.x*ten)/ten + ", " 
                   + Math.round(this.y*ten)/ten + ", "
                   + Math.round(this.z*ten)/ten + ")";
    } else {
        return null;
    }
}
Point.prototype.getDistantion = function(another) {
    return this.substract(another).getLength();
}
Point.prototype.tripleProduct = function(another1, another2) {
    var main = this.x * another1.y * another2.z;
    main += this.y * another1.z * another2.x;
    main += this.z * another1.x * another2.y;
    var aside = this.z * another1.y * another2.x;
    aside += this.y * another1.x * another2.z;
    aside += this.x * another1.z * another2.y;
    return main - aside;

}

Point.prototype.multiply = function(k) {
    return new Point(this.x * k, this.y * k, this.z * k);
}

Point.prototype.cos = function(another) {
    return this.scalarProduct(another)/this.getLength()/another.getLength();
}


Point.NULL = new Point(0,0,0);
Point.I = new Point(1,0,0);
Point.J = new Point(0,1,0);
Point.K = new Point(0,0,1);


