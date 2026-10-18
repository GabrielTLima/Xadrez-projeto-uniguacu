const tabuleiro = document.querySelector(".baseTabuleiro")
const tabuleiroPecas = [
    ['torre-preto', 'cavalo-preto', 'bispo-preto', 'rainha-preto', 'rei-preto', 'bispo-preto', 'cavalo-preto', 'torre-preto'],
    ['peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto', 'peao-preto'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco', 'peao-branco'],
    ['torre-branco', 'cavalo-branco', 'bispo-branco', 'rainha-branco', 'rei-branco', 'bispo-branco', 'cavalo-branco', 'torre-branco']
]

const letrasColunas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

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

            // Coordenadas: os números ficam na primeira coluna e as letras na última linha
            if(coluna === 0) {
                const numero = document.createElement("span")
                numero.classList.add("coordenadaNumero")
                numero.textContent = 8 - linha
                celula.appendChild(numero)
            }
            if(linha === 7) {
                const letra = document.createElement("span")
                letra.classList.add("coordenadaLetra")
                letra.textContent = letrasColunas[coluna]
                celula.appendChild(letra)
            }

            if(linha > 1 && linha < 6){
                continue
            } else {
                peca.src = `assets/pecas/${tabuleiroPecas[linha][coluna]}.svg`
                celula.appendChild(peca)
            }

        }

    }
}
