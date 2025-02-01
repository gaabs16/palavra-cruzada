// matriz 10x10
// loop -> renderizar linhas
// aninhado -> colunas

// 1 branco
// 0 preto

let values = [
    "1010111110001", 
    "1010101010101",
    "0000111110000",
    "1111111111111"
];

let span_value = {"0,0": "50", "3,5": "60", "1,4": "10"};

let current = null

function criarCaixas() {
    let caixas = "";
    for (let i = 0; i < values.length; i++) { // 2
        caixas += "<tr>";
        for (let j = 0; j < values[i].length; j++) { // 13
            let s = span_value[i+ "," +j]??"";
            if(values[i][j]=="1"){
                caixas += `<th onclick='myclick(this)' row='${i}' col='${j}' class="${values[i][j]}"><span>${s}</span><b></b></th>`;
            }
            else{
                caixas += `<th class="black"></th>`;
            }
        }
        caixas+="</tr>";
    }
    document.getElementById("table").innerHTML = caixas;
}
criarCaixas();

function myclick(caixa){
    if(caixa.classList.contains("white")){
        let row = caixa.getAttribute("row")
        let col = caixa.getAttribute("col")

        if(current!=null){
            current.style.background = "transparent";
        }

        current=caixa;
        current.style.background = "orange"
    }

    document.body.onkeyup=function(event){
        console.log(event)
    }
}