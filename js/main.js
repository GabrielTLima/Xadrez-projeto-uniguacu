let pecaArrastada = null

let linhaOrigem = null
let colunaOrigem = null

criarTabuleiro()
atualizarVez()

const pecas = document.querySelectorAll(".peca")
const celulas = document.querySelectorAll(".celula")

pecas.forEach(peca => {
    peca.draggable = true
    peca.addEventListener("dragstart", function (event) {
        pecaArrastada = peca

        const celulaOrigem = peca.parentElement

        linhaOrigem = celulaOrigem.dataset.linha
        colunaOrigem = celulaOrigem.dataset.coluna

        event.dataTransfer.setData("text/plain", linhaOrigem + "," + colunaOrigem)

        // Destaca a casa da peça que está sendo movimentada
        celulaOrigem.classList.add("casaSelecionada")
    })
    peca.addEventListener("dragend", function () {
        // Quando soltar a peça (em qualquer lugar), tira o destaque
        const selecionada = document.querySelector(".casaSelecionada")
        if(selecionada !== null) {
            selecionada.classList.remove("casaSelecionada")
        }
    })
});

celulas.forEach(celula => {
    celula.addEventListener("dragover", function (event) {
        event.preventDefault()
    })
    celula.addEventListener("drop", function (event) {
        // Evita que o navegador tente abrir a imagem solta
        event.preventDefault()

        const linhaDestino = celula.dataset.linha
        const colunaDestino = celula.dataset.coluna

        // A jogada só acontece se passar pela validação das regras
        if(movimentoValido(tabuleiroPecas, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino, jogadorAtual) === false) {
            textoMensagem.textContent = "Jogada inválida!"
            return
        }

        const nomePeca = tabuleiroPecas[linhaOrigem][colunaOrigem]
        tabuleiroPecas[linhaOrigem][colunaOrigem] = null
        tabuleiroPecas[linhaDestino][colunaDestino] = nomePeca

        // Captura: se tinha uma peça adversária no destino, ela sai da tela
        const pecaCapturada = celula.querySelector(".peca")
        if(pecaCapturada !== null) {
            pecaCapturada.remove()
        }

        celula.appendChild(pecaArrastada)

        adicionarJogadaNoHistorico(nomePeca, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)

        // Promoção: o peão chegou na última linha (linha 0 para as brancas, linha 7 para as pretas)
        if(tipoDaPeca(nomePeca) === "peao" && (linhaDestino === "0" || linhaDestino === "7")) {
            let escolha = prompt("Escolha a promoção: rainha, torre, bispo ou cavalo")

            // Enquanto digitar algo diferente das 4 opções, pergunta de novo
            while(escolha !== "rainha" && escolha !== "torre" && escolha !== "bispo" && escolha !== "cavalo") {
                escolha = prompt("Opção inválida! Digite: rainha, torre, bispo ou cavalo")
            }

            const novaPeca = escolha + "-" + jogadorAtual
            tabuleiroPecas[linhaDestino][colunaDestino] = novaPeca
            pecaArrastada.src = `assets/pecas/${novaPeca}.svg`
        }

        finalizarJogada()
    })
})
