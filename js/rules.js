// Procura onde está o rei de uma cor e devolve a linha e a coluna dele
function encontrarRei(matriz, cor) {
    for(let linha = 0; linha < 8; linha++){
        for(let coluna = 0; coluna < 8; coluna++){
            if(matriz[linha][coluna] === "rei-" + cor) {
                return { linha: linha, coluna: coluna }
            }
        }
    }
    return null
}

// Verifica se alguma peça adversária consegue chegar na casa do rei
function reiEmXeque(matriz, cor) {
    const rei = encontrarRei(matriz, cor)

    for(let linha = 0; linha < 8; linha++){
        for(let coluna = 0; coluna < 8; coluna++){
            const peca = matriz[linha][coluna]
            if(peca !== null && corDaPeca(peca) !== cor) {
                if(movimentoDaPeca(matriz, linha, coluna, rei.linha, rei.coluna)) {
                    return true
                }
            }
        }
    }
    return false
}

// Função principal de validação: toda jogada passa por aqui antes de acontecer
function movimentoValido(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino, corDoJogador) {
    // Os valores que vêm do dataset do HTML são textos ("6"), então transformamos em números (6)
    linhaOrigem = Number(linhaOrigem)
    colunaOrigem = Number(colunaOrigem)
    linhaDestino = Number(linhaDestino)
    colunaDestino = Number(colunaDestino)

    const peca = matriz[linhaOrigem][colunaOrigem]
    const pecaDestino = matriz[linhaDestino][colunaDestino]

    // Não tem peça na origem
    if(peca === null) {
        return false
    }

    // A peça não é do jogador da vez
    if(corDaPeca(peca) !== corDoJogador) {
        return false
    }

    // Tentou capturar uma peça da mesma cor (soltar a peça no mesmo lugar também cai aqui)
    if(pecaDestino !== null && corDaPeca(pecaDestino) === corDoJogador) {
        return false
    }

    // A peça não anda desse jeito (aqui também é verificado se o caminho está livre)
    if(movimentoDaPeca(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) === false) {
        return false
    }

    // Faz a jogada numa CÓPIA da matriz e verifica se o próprio rei fica em xeque
    // Assim o tabuleiro de verdade não é alterado
    const copia = []
    for(let linha = 0; linha < 8; linha++){
        const novaLinha = []
        for(let coluna = 0; coluna < 8; coluna++){
            novaLinha.push(matriz[linha][coluna])
        }
        copia.push(novaLinha)
    }
    copia[linhaDestino][colunaDestino] = peca
    copia[linhaOrigem][colunaOrigem] = null

    if(reiEmXeque(copia, corDoJogador)) {
        return false
    }

    return true
}

// Testa todas as jogadas possíveis de uma cor
// Se nenhuma for válida, é xeque-mate (se estiver em xeque) ou afogamento (se não estiver)
function temJogadaValida(matriz, cor) {
    for(let linhaOrigem = 0; linhaOrigem < 8; linhaOrigem++){
        for(let colunaOrigem = 0; colunaOrigem < 8; colunaOrigem++){
            for(let linhaDestino = 0; linhaDestino < 8; linhaDestino++){
                for(let colunaDestino = 0; colunaDestino < 8; colunaDestino++){
                    if(movimentoValido(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino, cor)) {
                        return true
                    }
                }
            }
        }
    }
    return false
}
