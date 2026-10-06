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

function criarTabuleiro() {
    for(let linha = 0; linha < 8; linha++){
        for(let coluna = 0; coluna < 8; coluna++){
            const celula = document.createElement("div")
            const peca = document.createElement("img")

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

