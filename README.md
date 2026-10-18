# Xadrez-projeto-uniguacu

Jogo de xadrez para dois jogadores no navegador, feito apenas com HTML, CSS e JavaScript.

## Como executar

Basta abrir o arquivo `index.html` no navegador.

## Estrutura do projeto

```text
├── index.html          Página do jogo
├── css/
│   └── style.css       Estilos (tabuleiro, mensagens, histórico, responsividade)
├── js/
│   ├── board.js        Matriz do tabuleiro e criação das casas na tela
│   ├── pieces.js       Regras de movimento de cada peça
│   ├── rules.js        Validação das jogadas, xeque e verificação de jogadas possíveis
│   ├── game.js         Turnos, mensagens, xeque-mate, empate, histórico e nova partida
│   └── main.js         Início do jogo, eventos de arrastar e soltar (Drag and Drop) e promoção
└── assets/
    └── pecas/          Imagens SVG das peças (exemplo: peao-branco.svg)
```

## Como o estado do tabuleiro é armazenado

O tabuleiro é uma matriz 8 × 8 chamada `tabuleiroPecas` (em `board.js`).
Cada posição guarda o nome da peça no formato `tipo-cor` (exemplo: `'peao-branco'`, `'rei-preto'`) ou `null` quando a casa está vazia.
O nome da peça é o mesmo nome do arquivo SVG.

- A linha 0 da matriz é a linha 8 do tabuleiro (lado das pretas).
- A linha 7 da matriz é a linha 1 do tabuleiro (lado das brancas).
- A coluna 0 é a coluna `a` e a coluna 7 é a coluna `h`.

O jogador da vez fica na variável `jogadorAtual` (`'branco'` ou `'preto'`), em `game.js`.

## Como as jogadas são validadas

Quando uma peça é solta em uma casa (evento `drop`), a jogada só acontece se a função `movimentoValido` (em `rules.js`) devolver `true`. Ela verifica, nessa ordem:

1. Se existe uma peça na casa de origem;
2. Se a peça é do jogador da vez;
3. Se o destino não tem uma peça da mesma cor;
4. Se a peça pode se mover daquele jeito, incluindo se o caminho está livre (`movimentoDaPeca`, em `pieces.js`);
5. Se a jogada não deixa o próprio rei em xeque. Para isso, a jogada é feita numa cópia da matriz e é verificado se alguma peça adversária ataca o rei.

Se alguma verificação falhar, o tabuleiro não muda e aparece na tela a mensagem "Jogada inválida!".

## Regras implementadas

- Tabuleiro 8 × 8 com coordenadas e posição inicial oficial;
- Movimento de todas as peças (peão, torre, bispo, cavalo, rainha e rei);
- O peão anda duas casas na primeira jogada e captura na diagonal;
- Torre, bispo e rainha não atravessam outras peças, e o cavalo pode pular;
- Captura de peças adversárias (não é possível capturar peças da mesma cor);
- Turnos alternados, com indicação "Vez das brancas" / "Vez das pretas";
- Nenhuma jogada pode deixar o próprio rei em xeque (inclui peças cravadas e o rei não pode ir para uma casa atacada);
- Indicação de xeque (mensagem e borda vermelha no rei);
- Xeque-mate encerra a partida e mostra o vencedor;
- Empate por afogamento;
- Promoção do peão (rainha, torre, bispo ou cavalo), escolhida com um `prompt` antes da troca de turno;
- Destaque da casa da peça que está sendo movimentada;
- Botão "Nova partida", que recarrega a página e reinicia todo o jogo;
- Tela responsiva (o tabuleiro muda de tamanho junto com a janela).

## Funcionalidades extras

- Histórico de jogadas ao lado do tabuleiro (exemplo: `peao-branco: e2 -> e4`).
