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

let tempoEmSegundos = 300;
let intervalo = null;
const timerElemento = document.getElementById("timer");
const botaoStartPause = document.getElementById("startPause");

document.addEventListener("DOMContentLoaded", function () {
    criarTabuleiro();
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

            if (event.key.length === 1 && (event.key >= 'A' && event.key <= 'Z' || event.key >= 'a' && event.key <= 'z')) {
                const letra = event.key.toUpperCase();
                current.textContent = letra;
                moverPara(linha, coluna + 1);
            }

            if (event.key === "Backspace") {
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
                case "ArrowUp": // cima
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
        const celula = document.querySelectorAll('.cell.white');
        celula.forEach(cell => {
            const linha = parseInt(cell.getAttribute('data-linha'));
            const coluna = parseInt(cell.getAttribute('data-coluna'));
            const letra = cell.textContent;

            if (letra === ans_key[linha][coluna]) {
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

    iniciarOuPausar();
    limparTabuleiro();
    verificar();
    botaoStartPause.addEventListener("click", iniciarOuPausar);
    atualizarTempo();
});