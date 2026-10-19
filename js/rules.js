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

function movimentoValido(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino, corDoJogador) {
    linhaOrigem = Number(linhaOrigem)
    colunaOrigem = Number(colunaOrigem)
    linhaDestino = Number(linhaDestino)
    colunaDestino = Number(colunaDestino)

    const peca = matriz[linhaOrigem][colunaOrigem]
    const pecaDestino = matriz[linhaDestino][colunaDestino]

    if(peca === null) {
        return false
    }

    if(corDaPeca(peca) !== corDoJogador) {
        return false
    }

    if(pecaDestino !== null && corDaPeca(pecaDestino) === corDoJogador) {
        return false
    }

    if(movimentoDaPeca(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) === false) {
        return false
    }
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
