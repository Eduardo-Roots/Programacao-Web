function sorteio() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;

    let sort = Math.floor(Math.random() * Math.floor(num2))
    let sort2 = Math.floor(Math.random() * Math.floor(num1))

    if (num2 > num1) {
        while (sort < num1) {
            sort = Math.floor(Math.random() * Math.floor(num2));
        }
        document.getElementById("result").innerHTML = sort;
    } else if(num1 > num2) {
        while (sort2 < num2) {
            sort2 = Math.floor(Math.random() * Math.floor(num1));
        }
        document.getElementById("result").innerHTML = sort2;
    }
    else{
        document.getElementById("result").innerHTML = 'Escolha um intervalo!'
    }
}
