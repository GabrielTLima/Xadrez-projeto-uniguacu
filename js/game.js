let jogadorAtual = "branco"

const listaJogadas = document.querySelector(".listaJogadas")
const textoVez = document.querySelector(".vezDoJogador")
const textoMensagem = document.querySelector(".mensagem")
const botaoNovaPartida = document.querySelector(".botaoNovaPartida")

function adicionarJogadaNoHistorico(nomePeca, linhaOrigem, colunaOrigem, linhaDestino, colunaDestino) {
    const casaOrigem = letrasColunas[colunaOrigem] + (8 - linhaOrigem)
    const casaDestino = letrasColunas[colunaDestino] + (8 - linhaDestino)

    const jogada = document.createElement("li")
    jogada.textContent = `${nomePeca}: ${casaOrigem} -> ${casaDestino}`
    listaJogadas.appendChild(jogada)
}

function atualizarVez() {
    if(jogadorAtual === "branco") {
        textoVez.textContent = "Vez das brancas"
    } else {
        textoVez.textContent = "Vez das pretas"
    }
}

function finalizarJogada() {
    if(jogadorAtual === "branco") {
        jogadorAtual = "preto"
    } else {
        jogadorAtual = "branco"
    }
    atualizarVez()

    const celulaEmXeque = document.querySelector(".reiEmXeque")
    if(celulaEmXeque !== null) {
        celulaEmXeque.classList.remove("reiEmXeque")
    }

    const estaEmXeque = reiEmXeque(tabuleiroPecas, jogadorAtual)
    const temJogada = temJogadaValida(tabuleiroPecas, jogadorAtual)

    if(estaEmXeque) {
        const rei = encontrarRei(tabuleiroPecas, jogadorAtual)
        const celulaRei = document.querySelector(`.celula[data-linha="${rei.linha}"][data-coluna="${rei.coluna}"]`)
        celulaRei.classList.add("reiEmXeque")
    }

    if(estaEmXeque && temJogada === false) {
        if(jogadorAtual === "branco") {
            textoMensagem.textContent = "XEQUE-MATE! As pretas venceram."
        } else {
            textoMensagem.textContent = "XEQUE-MATE! As brancas venceram."
        }
    } else if(estaEmXeque === false && temJogada === false) {
        textoMensagem.textContent = "EMPATE! Afogamento."
    } else if(estaEmXeque) {
        textoMensagem.textContent = "XEQUE!"
    } else {
        textoMensagem.textContent = ""
    }
}

botaoNovaPartida.addEventListener("click", function () {
    location.reload()
})
