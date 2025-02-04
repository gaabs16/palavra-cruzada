// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

// 1 branco
// 0 preto

const board = document.getElementById('board');

const values = [
    "1111111111",
    "1000101010",
    "1011101011",
    "1010001010",
    "1111011110",
    "1010100010",
    "0010111110",
    "1000100010",
    "1110111101",
    "1000101000"
];

const ans_key = [
    "GRIFINORIA-",
    "----L---U--",
    "--LUMOS---A",
    "----A---R--",
    "--DRAGAO---",
    "----C---O--",
    "--SONIFERO",
    "----G---A--",
    "--GATO-----",
    "----T---R--"
];

let current = null;

function criarTabuleiro() {
    for (let linha = 0; linha < values.length; linha++) {
        for (let coluna = 0; coluna < values[linha].length; coluna++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(values[linha][coluna] === '1' ? 'white' : 'black');
            cell.setAttribute('data-linha', linha);
            cell.setAttribute('data-coluna', coluna);

            if (values[linha][coluna] === '1' && ans_key[linha][coluna] !== '-') {
                cell.textContent = ans_key[linha][coluna];
            }

            cell.addEventListener('click', () => myclick(cell));
            board.appendChild(cell);
        }
    }
}

criarTabuleiro();

function myclick(cell) {
    if (cell.classList.contains("white")) {
        if (current !== null) {
            current.style.backgroundColor = "transparent";
        }
        current = cell;
        current.style.backgroundColor = "orange";
    }
}

document.body.onkeydown = function (event) {
    if (current !== null) {
        const linha = parseInt(current.getAttribute('data-linha'));
        const coluna = parseInt(current.getAttribute('data-coluna'));

        if (event.keyCode >= 65 && event.keyCode <= 90) { // Letras de A a Z
            const letter = event.key.toUpperCase();
            current.textContent = letter;
            moverPara(linha, coluna + 1); // Move para a próxima célula
        }

        if (event.keyCode === 8) { // Backspace para apagar
            current.textContent = "";
        }

        // setas
        switch (event.key) {
            case "ArrowLeft": // esquerda
                moverPara(linha, coluna - 1);
                break;
            case "ArrowRight": // direita
                moverPara(linha, coluna + 1);
                break;
            case "ArrowUp": // topo
                moverPara(linha - 1, coluna);
                break;
            case "ArrowDown": // baixo
                moverPara(linha + 1, coluna);
                break;
        }
    }
};

function moverPara(novaLinha, novaColuna) {
    if (novaLinha >= 0 && novaLinha < 10 && novaColuna >= 0 && novaColuna < 10) {
        const novaCelula = document.querySelector(`.cell[data-linha='${novaLinha}'][data-coluna='${novaColuna}']`);
        if (novaCelula.classList.contains("white")) {
            if (current !== null) {
                current.style.backgroundColor = "transparent";
            }
            current = novaCelula;
            current.style.backgroundColor = "orange";
        }
    }
}

function key_check() {
    const cells = document.querySelectorAll('.cell.white');
    cells.forEach(cell => {
        const linha = cell.getAttribute('data-linha');
        const coluna = cell.getAttribute('data-coluna');
        const letter = cell.textContent;
        if (letter === ans_key[linha][coluna]) {
            cell.style.backgroundColor = "green";
        } else {
            cell.style.backgroundColor = "red";
        }
    });
}

function limparTabuleiro() {
    const cells = document.querySelectorAll('.cell.white');
    cells.forEach(cell => {
        cell.style.backgroundColor = "transparent";
        cell.textContent = "";
    });
}