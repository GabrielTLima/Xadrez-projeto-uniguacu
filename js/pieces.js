function tipoDaPeca(nomePeca) {
    return nomePeca.split("-")[0]
}

function corDaPeca(nomePeca) {
    return nomePeca.split("-")[1]
}

// Verifica se não existe nenhuma peça entre a origem e o destino
// Serve para a torre, o bispo e a rainha, que andam em linha reta
function caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) {
    // Descobre para qual lado andar em cada direção: -1, 0 ou 1
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

    // Começa na casa logo depois da origem e para antes do destino
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

// Verifica se a peça consegue ir da origem até o destino, do jeito que ela anda
function movimentoDaPeca(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) {
    const peca = matriz[linhaOrigem][colunaOrigem]
    const tipo = tipoDaPeca(peca)

    const distanciaLinha = Math.abs(linhaDestino - linhaOrigem)
    const distanciaColuna = Math.abs(colunaDestino - colunaOrigem)

    // Reto: mesma linha ou mesma coluna
    // Diagonal: anda a mesma quantidade de linhas e de colunas
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

    // A rainha anda como a torre ou como o bispo
    if(tipo === "rainha") {
        if((andaReto || andaDiagonal) && caminhoLivre(matriz, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)) {
            return true
        }
    }

    // O "L": 2 casas para um lado e 1 para o outro. O cavalo pode pular peças
    if(tipo === "cavalo") {
        if(distanciaLinha === 2 && distanciaColuna === 1) {
            return true
        }
        if(distanciaLinha === 1 && distanciaColuna === 2) {
            return true
        }
    }

    // O rei anda só uma casa para qualquer lado
    // (se a casa está sendo atacada é verificado em rules.js)
    if(tipo === "rei") {
        if(distanciaLinha <= 1 && distanciaColuna <= 1) {
            return true
        }
    }

    if(tipo === "peao") {
        const pecaDestino = matriz[linhaDestino][colunaDestino]

        // As brancas sobem no tabuleiro (linha diminui) e as pretas descem (linha aumenta)
        let direcao = -1
        let linhaInicial = 6
        if(corDaPeca(peca) === "preto") {
            direcao = 1
            linhaInicial = 1
        }

        const andouParaFrente = linhaDestino - linhaOrigem

        // Anda uma casa para frente, se a casa estiver vazia
        if(distanciaColuna === 0 && andouParaFrente === direcao && pecaDestino === null) {
            return true
        }

        // Anda duas casas na primeira jogada, se as duas casas estiverem vazias
        if(distanciaColuna === 0 && andouParaFrente === direcao * 2 && linhaOrigem === linhaInicial) {
            const casaDoMeio = matriz[linhaOrigem + direcao][colunaOrigem]
            if(casaDoMeio === null && pecaDestino === null) {
                return true
            }
        }

        // Captura na diagonal, uma casa para frente
        if(distanciaColuna === 1 && andouParaFrente === direcao && pecaDestino !== null) {
            return true
        }
    }

    return false
}
