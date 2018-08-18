//Script starts

console.log("Hello World");



document.onkeyup = function(event) {
    console.log(event.key);
    var algo = event.key;
    alert(algo);
    document.getElementById("letter1").innerHTML = algo;
};
