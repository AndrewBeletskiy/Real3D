var Help = {}
Help.fracNumber = function(number) {
    return Math.abs(number) - Math.floor(Math.abs(number))
}
Help.formatNumber = function(number, exponent) {
    if (exponent >= 0
        && this.fracNumber(exponent) <= 1e8)
    return "" + Math.round(number * Math.pow(10,exponent)) / Math.pow(10, exponent);
}

Help.numberComparator = function(a,b) {
    return (a > b) 
            ? 1 
            : ((a < b) ? -1 : 0)
}

Help.sortArray = function(array, comparator) {
    comparator = comparator || Help.numberComparator;
    for (var i = 0; i < array.size; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (comparator(array[j], array[j+1]) > 0) {
                var c = array[j];
                array[j] = array[j+1];
                array[j+1] = c;
            }
        }
    }
}