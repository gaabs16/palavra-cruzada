// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

// 1 branco
// 0 preto

let values = [
    "1010111110",
    "1010101010",
    "0000111110",
    "1110110111",
    "0101010101",
    "1100011110",
    "0011101101",
    "0110110000",
    "1010111011",
    "0001100111"
];

let ans_key = [
    "A-B-CDEFG---H",
    "I-J-K-L-M-N-O",
    "----PQRST----",
    "UVWX-YZ-ABCDE"
];

let span_value = { "0,0": "50", "3,5": "60", "1,4": "10" };

let current = null;
let total_linhas = values.length;
let total_colunas = values[0].length;

function criarCaixas() {
    let caixas = "";
    for (let linha = 0; linha < total_linhas; linha++) {
        caixas += "<tr>";
        for (let coluna = 0; coluna < total_colunas; coluna++) {
            let s = span_value[linha + "," + coluna] ?? "";
            let cor = values[linha][coluna] === "1" ? "white" : "black"; // Corrigido
            caixas += `<th onclick='myclick(this)' linha='${linha}' coluna='${coluna}' class="${cor}"><span>${s}</span><b></b></th>`;
        }
        caixas += "</tr>";
    }
    document.getElementById("table").innerHTML = caixas;
}

criarCaixas();

function myclick(caixa) {
    if (caixa.classList.contains("white")) {
        let linha = caixa.getAttribute("linha");
        let coluna = caixa.getAttribute("coluna");

        if (current != null) {
            current.style.background = "transparent";
        }

        current = caixa;
        current.style.background = "orange";
    }
}

document.body.onkeyup = function (event) {
    if (current != null) {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            nextmover(event.keyCode);
        }

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            let letra = event.key.toUpperCase();
            let letraElemento = current.querySelector("b");
            if (letraElemento) {
                letraElemento.innerHTML = letra;
            }
            nextmover(39); // Move para a direita após digitar
        }

        if (event.keyCode == 8) { // Backspace para apagar
            let letraElemento = current.querySelector("b");
            if (letraElemento) {
                letraElemento.innerHTML = "";
            }
        }
    }
};

function nextmover(code) {
    let linha = parseInt(current.getAttribute("linha"));
    let coluna = parseInt(current.getAttribute("coluna"));

    switch (code) {
        case 37: // Esquerda
            coluna = coluna == 0 ? total_colunas - 1 : coluna - 1;
            break;
        case 38: // Cima
            linha = linha == 0 ? total_linhas - 1 : linha - 1;
            break;
        case 39: // Direita
            coluna = coluna == total_colunas - 1 ? 0 : coluna + 1;
            break;
        case 40: // Baixo
            linha = linha == total_linhas - 1 ? 0 : linha + 1;
            break;
    }

    if (current.classList.contains("white")) {
        current.style.background = "transparent"; // Limpa a cor da célula anterior
    }

    current = document.querySelectorAll("tr")[linha].querySelectorAll("th")[coluna];

    if (current.classList.contains("black")) {
        nextmover(code); // Se for preto, pula para a próxima célula
    } else {
        current.style.background = "orange";
    }
}

let red = [];
let green = [];

function key_check() {
    let whites = document.querySelectorAll('.white')
    // console.log(whites);
    whites.forEach(element => {
        console.log(element.querySelector("b").innerHTML);

        if (text.length > 0) {
            let linha = element.getAttribute("linha")
            let coluna = element.getAttribute("coluna")
            console.log(linha, coluna, text, ans_key[linha][coluna]);
            if(text==ans_key[linha][coluna]){
                element.style.background="greenyellow";
                green.push(element)
            }
            else{
                element.style.background="red";
                red.push(element);
            }
        }
        else{
            blanks++
        }
    })
}

function color_clear(){
    red.forEach(element =>{
        element.style.background="transparent";
        element.querySelector("b").innerHTML="";
    })

    green.forEach(element =>{
        element.style.background="transparent";
    })

    console.log("wrong", red);
    console.log("correct",red);

    red.splice(0)
    green.splice(0)
}