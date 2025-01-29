// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("matriz");
    let tamanho = 10;
    let tabuleiro = [];
    let palavras = ["CÓDIGO", "JAVASCRIPT", "HTML", "CSS"];

    for (let linha = 0; linha < tamanho; linha++) {
        tabuleiro[linha] = [];
        for (let coluna = 0; coluna < tamanho; coluna++) {
            tabuleiro[linha][coluna] = "";
        }
    }

    
    function inserirPalavra(palavra, linha, coluna) {
        for (let i = 0; i < palavra.length; i++) {
            tabuleiro[linha][coluna + i] = palavra[i];
        }
    }

    inserirPalavra("CÓDIGO", 1, 1);
    inserirPalavra("JAVASCRIPT", 3, 2);
    inserirPalavra("HTML", 5, 4);
    inserirPalavra("CSS", 7, 6);


    function criarTabuleiro() {
        container.innerHTML = "";
        for (let linha = 0; linha < tamanho; linha++) {
            for (let coluna = 0; coluna < tamanho; coluna++) {
                let celula = document.createElement("div");
                celula.className = "celula";
                celula.dataset.linha = linha;
                celula.dataset.coluna = coluna;
                celula.textContent = tabuleiro[linha][coluna];
                container.appendChild(celula);
            }
        }
    }

    criarTabuleiro();

    window.verificarPalavra = function () {
        let entrada = document.getElementById("entradaPalavra").value.toUpperCase();
        let mensagem = document.getElementById("mensagem");

        if (palavras.includes(entrada)) {
            mensagem.textContent = "Palavra correta!";
            mensagem.style.color = "green";

            document.querySelectorAll(".celula").forEach(celula => {
                let linha = Number(celula.dataset.linha);
                let coluna = Number(celula.dataset.coluna);

                let palavraHorizontal = tabuleiro[linha].slice(coluna, coluna + entrada.length).join("");
                let palavraVertical = tabuleiro.map(row => row[coluna]).slice(linha, linha + entrada.length).join("");

                if (entrada === palavraHorizontal || entrada === palavraVertical) {
                    for (let i = 0; i < entrada.length; i++) {
                        if (palavraHorizontal === entrada) {
                            document.querySelector(`[data-linha="${linha}"][data-coluna="${coluna + i}"]`).classList.add("certa");
                        }
                        if (palavraVertical === entrada) {
                            document.querySelector(`[data-linha="${linha + i}"][data-coluna="${coluna}"]`).classList.add("certa");
                        }
                    }
                }
            });
        } else {
            mensagem.textContent = "Palavra errada!";
            mensagem.style.color = "red";
        }

        verificarFimDoJogo();
    };

    function verificarFimDoJogo() {
        let todasCorretas = palavras.every(palavra => {
            return [...document.querySelectorAll(".certa")].some(celula => celula.textContent === palavra[0]);
        });

        if (todasCorretas) {
            document.getElementById("mensagem").textContent = "Parabéns! Você encontrou todas as palavras!";
        }
    }
});
