function tipoDaPeca(nomePeca) {
    return nomePeca.split("-")[0]
}

function corDaPeca(nomePeca) {
    return nomePeca.split("-")[1]
}

function caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) {
    let passoLinha = 0
    if(linhaDestino > linhaOrigem) {
        passoLinha = 1
    } else if(linhaDestino < linhaOrigem) {
        passoLinha = -1
    }

    let passoColuna = 0
    if(colunaDestino > colunaOrigem) {
        passoColuna = 1
    } else if(colunaDestino < colunaOrigem) {
        passoColuna = -1
    }

    let linha = linhaOrigem + passoLinha
    let coluna = colunaOrigem + passoColuna

    while(linha !== linhaDestino || coluna !== colunaDestino) {
        if(matriz[linha][coluna] !== null) {
            return false
        }
        linha = linha + passoLinha
        coluna = coluna + passoColuna
    }

    return true
}

function movimentoDaPeca(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) {
    const peca = matriz[linhaOrigem][colunaOrigem]
    const tipo = tipoDaPeca(peca)

    const distanciaLinha = Math.abs(linhaDestino - linhaOrigem)
    const distanciaColuna = Math.abs(colunaDestino - colunaOrigem)

    const andaReto = linhaOrigem === linhaDestino || colunaOrigem === colunaDestino
    const andaDiagonal = distanciaLinha === distanciaColuna

    if(tipo === "torre") {
        if(andaReto && caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)) {
            return true
        }
    }

    if(tipo === "bispo") {
        if(andaDiagonal && caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)) {
            return true
        }
    }

    if(tipo === "rainha") {
        if((andaReto || andaDiagonal) && caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)) {
            return true
        }
    }

    if(tipo === "cavalo") {
        if(distanciaLinha === 2 && distanciaColuna === 1) {
            return true
        }
        if(distanciaLinha === 1 && distanciaColuna === 2) {
            return true
        }
    }
    if(tipo === "rei") {
        if(distanciaLinha <= 1 && distanciaColuna <= 1) {
            return true
        }
    }

    if(tipo === "peao") {
        const pecaDestino = matriz[linhaDestino][colunaDestino]
        let direcao = -1
        let linhaInicial = 6
        if(corDaPeca(peca) === "preto") {
            direcao = 1
            linhaInicial = 1
        }

        const andouParaFrente = linhaDestino - linhaOrigem

        if(distanciaColuna === 0 && andouParaFrente === direcao && pecaDestino === null) {
            return true
        }

        if(distanciaColuna === 0 && andouParaFrente === direcao * 2 && linhaOrigem === linhaInicial) {
            const casaDoMeio = matriz[linhaOrigem + direcao][colunaOrigem]
            if(casaDoMeio === null && pecaDestino === null) {
                return true
            }
        }

        if(distanciaColuna === 1 && andouParaFrente === direcao && pecaDestino !== null) {
            return true
        }
    }

    return false
}
