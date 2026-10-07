const tabuleiro = document.querySelector(".baseTabuleiro")
const tabuleiroPecas = [
    ['torre-preto', 'cavalo-preto', 'bispo-preto', 'rei-preto', 'rainha-preto', 'bispo-preto', 'cavalo-preto', 'torre-preto'],
    ['peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco'],
    ['torre-branco', 'cavalo-branco', 'bispo-branco', 'rei-branco', 'rainha-branco', 'bispo-branco', 'cavalo-branco', 'torre-branco']
]
let pecaArrastada = null

function criarTabuleiro() {
    for(let linha = 0; linha < 8; linha++){
        for(let coluna = 0; coluna < 8; coluna++){
            const celula = document.createElement("div")
            const peca = document.createElement("img")
            celula.classList.add("celula")

            celula.dataset.linha = linha
            celula.dataset.coluna = coluna

            peca.classList.add("peca")
            if((linha + coluna) % 2 === 0) {
                celula.classList.add("baseBranca")
            } else {
                celula.classList.add("basePreta")
            }
            tabuleiro.appendChild(celula)
            if(linha > 1 && linha < 6){
                continue
            } else {   
                peca.src = `Pecas/${tabuleiroPecas[linha][coluna]}.svg`
                celula.appendChild(peca)
            }
            
        }

    }
}

criarTabuleiro()

const pecas = document.querySelectorAll(".peca")
const celulas = document.querySelectorAll(".celula")

let linhaOrigem = null
let colunaOrigem = null

pecas.forEach(peca => {
    peca.draggable = true
    peca.addEventListener("dragstart", function () {
        pecaArrastada = peca

        const celulaOrigem = peca.parentElement

        linhaOrigem = celulaOrigem.dataset.linha
        colunaOrigem = celulaOrigem.dataset.coluna

        console.log("Linha: ", linhaOrigem)
        console.log("Coluna: ", colunaOrigem)
    })
});

celulas.forEach(celula => {
    celula.addEventListener("dragover", function (event) {
        event.preventDefault()
    })
    celula.addEventListener("drop", function (event) {
        const linhaDestino = celula.dataset.linha
        const colunaDestino = celula.dataset.coluna

        const nomePeca = tabuleiroPecas[linhaOrigem][colunaOrigem]
        tabuleiroPecas[linhaOrigem][colunaOrigem] = null
        tabuleiroPecas[linhaDestino][colunaDestino] = nomePeca

        celula.appendChild(pecaArrastada)
        console.log("Linha Destino: ", linhaDestino)
        console.log("Coluna Destino: ", colunaDestino)
    })
})