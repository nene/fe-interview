export default function sumEven(array) {
    total = 0;
    for (var i in array) {
        var x = array[i];
        if (Math.floor(x/2) === x/2) {
            total += array[i];
        }
    }
    return total;
}
