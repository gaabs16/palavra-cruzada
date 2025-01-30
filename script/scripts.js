// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function(event) {
        let activeInput = document.activeElement;
        let linha = activeInput.dataset.linha;
        let coluna = activeInput.dataset.coluna;
    
        if (event.key === "ArrowRight") {
            moverParaProximaCelula(parseInt(linha), parseInt(coluna));
        } else if (event.key === "ArrowLeft") {
            moverParaCelulaAnterior(parseInt(linha), parseInt(coluna));
        } else if (event.key === "ArrowDown") {
            moverParaCelulaBaixo(parseInt(linha), parseInt(coluna));
        } else if (event.key === "ArrowUp") {
            moverParaCelulaCima(parseInt(linha), parseInt(coluna));
        }
    });

    let tamanho = 10;
    let tabuleiro = Array(tamanho).fill().map(() => Array(tamanho).fill(" "));

    let letras = {
        "00": "1r", "11": "2b", "25": "3l", "13": "4b", "34": "5l",
        "10": "6b", "42": "7r", "66": "8l", "16": "9b", "52": "10r",
        "12": '.', "14": '.', "15": '.', "35": ".",
    };

    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            if (letras[i + '' + j] === undefined) letras[i + "" + j] = " ";
        }
    }

    var Game = {
        x: 7, y: 7,
        letras: letras,
        respostas: [
            { numero: "1", palavra: "proeza", pos: ["01", "02", "03", "04", "05", "06"], dica: "Realizar algo incomum." },
            { numero: "2", palavra: "amor", pos: ["21", "31", "41", "51"], dica: "Querer o bem do outro." },
            { numero: "3", palavra: "lunar", pos: ["24", "23", "22", "21", "20"], dica: "Relativo à Lua." },
            { numero: "4", palavra: "util", pos: ["23", "33", "43", "53"], dica: "Que tem algum uso." },
            { numero: "5", palavra: "tome", pos: ["33", "32", "31", "30"], dica: "Seguidor de Jesus." },
        ],
        acertos: 0,
    };

    function preencherTabuleiro() {
        Game.respostas.forEach(resposta => {
            resposta.pos.forEach((pos, index) => {
                let linha = parseInt(pos[0]);
                let coluna = parseInt(pos[1]);
                tabuleiro[linha][coluna] = resposta.palavra[index].toUpperCase();
            });
        });
    }

    function criarTabuleiro() {
        let container = document.getElementById("matriz");
        container.innerHTML = "";

        for (let linha = 0; linha < tamanho; linha++) {
            let linhaDiv = document.createElement("div");
            linhaDiv.className = "linha";

            for (let coluna = 0; coluna < tamanho; coluna++) {
                let input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.className = "inputCelula";
                input.dataset.linha = linha;
                input.dataset.coluna = coluna;

                if (tabuleiro[linha][coluna] !== " ") {
                    input.value = tabuleiro[linha][coluna];
                } else {
                    input.disabled = true;
                    input.style.backgroundColor = "black";
                }

                linhaDiv.appendChild(input);
            }

            container.appendChild(linhaDiv);
        }
    }

    function moverParaProximaCelula(linha, coluna) {
        let proximaColuna = coluna + 1;
        while (proximaColuna < tamanho) {
            let proximoInput = document.querySelector(`[data-linha="${linha}"][data-coluna="${proximaColuna}"]`);
            if (proximoInput && !proximoInput.disabled) {
                proximoInput.focus();
                break;
            }
            proximaColuna++;
        }
    }

    function moverParaCelulaAnterior(linha, coluna) {
        let colunaAnterior = coluna - 1;
        while (colunaAnterior >= 0) {
            let inputAnterior = document.querySelector(`[data-linha="${linha}"][data-coluna="${colunaAnterior}"]`);
            if (inputAnterior && !inputAnterior.disabled) {
                inputAnterior.focus();
                break;
            }
            colunaAnterior--;
        }
    }

    function moverParaCelulaBaixo(linha, coluna) {
        let linhaBaixo = linha + 1;
        while (linhaBaixo < tamanho) {
            let inputBaixo = document.querySelector(`[data-linha="${linhaBaixo}"][data-coluna="${coluna}"]`);
            if (inputBaixo && !inputBaixo.disabled) {
                inputBaixo.focus();
                break;
            }
            linhaBaixo++;
        }
    }

    function moverParaCelulaCima(linha, coluna) {
        let linhaCima = linha - 1;
        while (linhaCima >= 0) {
            let inputCima = document.querySelector(`[data-linha="${linhaCima}"][data-coluna="${coluna}"]`);
            if (inputCima && !inputCima.disabled) {
                inputCima.focus();
                break;
            }
            linhaCima--;
        }
    }

    function verificarPalavra() {
        let mensagem = document.getElementById("mensagem");
        let acertos = 0;

        Game.respostas.forEach(resposta => {
            let palavraCorreta = resposta.palavra.toUpperCase();
            let palavraJogador = resposta.pos.map(pos => tabuleiro[Math.floor(pos / 10)][pos % 10]).join("").toUpperCase();

            if (palavraJogador === palavraCorreta) {
                acertos++;
                resposta.pos.forEach(pos => {
                    let [linha, coluna] = [Math.floor(pos / 10), pos % 10];
                    let celula = document.querySelector(`[data-linha="${linha}"][data-coluna="${coluna}"]`);
                    celula.classList.add("certa");
                });
            } else {
                resposta.pos.forEach(pos => {
                    let [linha, coluna] = [Math.floor(pos / 10), pos % 10];
                    let celula = document.querySelector(`[data-linha="${linha}"][data-coluna="${coluna}"]`);
                    celula.classList.add("errada"); // Marca as células erradas
                });
            }
        });

        if (acertos === Game.respostas.length) {
            mensagem.textContent = "Você venceu! Parabéns!";
        } else {
            mensagem.textContent = `Você acertou ${acertos} palavras. Continue tentando!`;
        }
    }

    preencherTabuleiro();
    criarTabuleiro();
});
