// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

// 1 branco
// 0 preto

const board = document.getElementById('board');

const values = [
    "1111110001",
    "1011111001",
    "1011110001",
    "1010000001",
    "1011111001",
    "1010000001",
    "1011111101",
    "0010000001",
    "0011111101",
    "0111111111"
];

const ans_key = [
    "HAGRID---D-", 
    "O-AVADA--E-",
    "R-LUNA---M-",
    "C-O------E-",
    "R-HARRY--N-",
    "U-O------T-",
    "X-MALFOY-A-",
    "--O------D-",
    "--RONALD-O-",
    "-PATRONUMR-"
];

const span_value = {
    "0,0": "1", 
    "1,0": "2",
    "1,2": "3", 
    "0,9": "8", 
    "2,2": "4", 
    "4,2": "5", 
    "6,2": "6", 
    "8,2": "7", 
    "9,1": "9"
}

let current = null;

function criarTabuleiro() {
    for (let linha = 0; linha < values.length; linha++) {
        for (let coluna = 0; coluna < values[linha].length; coluna++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(values[linha][coluna] === '1' ? 'white' : 'black');
            cell.setAttribute('data-linha', linha);
            cell.setAttribute('data-coluna', coluna);

            const posicao = linha + "," + coluna;
            if (span_value[posicao]) {
                const numero = document.createElement('span');
                numero.textContent = span_value[posicao];
                numero.classList.add('numero-canto');
                cell.appendChild(numero);
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

function verificar() {
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

let tempoEmSegundos = 300;
let intervalo = null;
const timerElemento = document.getElementById("timer");
const botaoStartPause = document.getElementById("startPause");

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function atualizarTempo() {
    timerElemento.textContent = `Tempo: ${formatarTempo(tempoEmSegundos)}`;
}

function iniciarOuPausar() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
        botaoStartPause.textContent = "Iniciar";
    } else {
        intervalo = setInterval(() => {
            if (tempoEmSegundos > 0) {
                tempoEmSegundos--;
                atualizarTempo();
            } else {
                clearInterval(intervalo);
                alert("Tempo esgotado!");
            }
        }, 1000);
        botaoStartPause.textContent = "Pausar";
    }
}

botaoStartPause.addEventListener("click", iniciarOuPausar);
atualizarTempo();