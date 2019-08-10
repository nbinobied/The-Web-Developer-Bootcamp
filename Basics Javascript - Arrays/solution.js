//***********printReverse()**********
function printReverse(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
}

printReverse([3, 6, 7, 8]);

//***********isUniform()**********
function isUniform(arr) {
    var first = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== first) {
            return false;
        }
    }
    return true;
}

console.log(isUniform([2, 2, 1, 2]));
console.log(isUniform([1, 1, 1, 1]));

//***********sumArray()**********
function sumArray(arr) {
    var total = 0;
    arr.forEach(function (element) {
        total += element;
    });
    return total;
}

console.log(sumArray([1, 2, 3, 4]));

//***********max()**********
function max(arr) {
    var max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(max([1, 2, 3, 4]));