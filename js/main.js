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

        celulaOrigem.classList.add("casaSelecionada")
    })
    peca.addEventListener("dragend", function () {
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
        event.preventDefault()

        const linhaDestino = celula.dataset.linha
        const colunaDestino = celula.dataset.coluna

        if(movimentoValido(tabuleiroPecas, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino, jogadorAtual) === false) {
            textoMensagem.textContent = "Jogada inválida!"
            return
        }

        const nomePeca = tabuleiroPecas[linhaOrigem][colunaOrigem]
        tabuleiroPecas[linhaOrigem][colunaOrigem] = null
        tabuleiroPecas[linhaDestino][colunaDestino] = nomePeca

        const pecaCapturada = celula.querySelector(".peca")
        if(pecaCapturada !== null) {
            pecaCapturada.remove()
        }

        celula.appendChild(pecaArrastada)

        adicionarJogadaNoHistorico(nomePeca, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino)

        if(tipoDaPeca(nomePeca) === "peao" && (linhaDestino === "0" || linhaDestino === "7")) {
            let escolha = prompt("Escolha a promoção: rainha, torre, bispo ou cavalo")

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
