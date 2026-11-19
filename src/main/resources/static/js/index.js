const URL_JOGOS = '/jogos';

const elLista = document.getElementById('lista');
const elMensagem = document.getElementById('mensagem');
const dialogo = document.getElementById('dialogoExclusao');
const textoExclusao = document.getElementById('textoExclusao');

let jogoParaExcluir = null;

function mostrarMensagem(tipo, texto) {
    elMensagem.textContent = texto;
    elMensagem.className = 'mensagem ' + tipo;
}

function criarElemento(tag, texto, classe) {
    const el = document.createElement(tag);
    if (texto !== undefined) el.textContent = texto;
    if (classe) el.className = classe;
    return el;
}

function criarCartao(jogo) {
    const cartao = criarElemento('div', undefined, 'cartao');
    if (!jogo.disponivel) cartao.classList.add('indisponivel');

    const info = document.createElement('div');

    const titulo = criarElemento('h3', jogo.titulo);
    if (!jogo.disponivel) {
        titulo.appendChild(criarElemento('span', 'INDISPONÍVEL', 'selo'));
    }
    info.appendChild(titulo);
    info.appendChild(criarElemento('p', 'Ano de lançamento: ' + jogo.anoLancamento));
    info.appendChild(criarElemento('p', 'Plataforma: ' + jogo.plataforma));
    if (jogo.observacoes) {
        info.appendChild(criarElemento('p', 'Observações: ' + jogo.observacoes));
    }

    const acoes = criarElemento('div', undefined, 'acoes');

    const btnAlterar = criarElemento('a', 'Alterar', 'botao');
    btnAlterar.href = 'form.html?id=' + jogo.id;

    const btnExcluir = criarElemento('button', 'Excluir', 'perigo');
    btnExcluir.type = 'button';
    btnExcluir.addEventListener('click', () => abrirConfirmacao(jogo));

    acoes.appendChild(btnAlterar);
    acoes.appendChild(btnExcluir);

    cartao.appendChild(info);
    cartao.appendChild(acoes);
    return cartao;
}

async function carregarJogos() {
    try {
        const resposta = await fetch(URL_JOGOS);
        if (!resposta.ok) {
            mostrarMensagem('erro', 'Erro ao carregar a lista de jogos (HTTP ' + resposta.status + ').');
            return;
        }
        const jogos = await resposta.json();

        elLista.replaceChildren();
        if (jogos.length === 0) {
            elLista.appendChild(criarElemento('div', 'Nenhum jogo cadastrado.', 'lista-vazia'));
            return;
        }
        for (const jogo of jogos) {
            elLista.appendChild(criarCartao(jogo));
        }
    } catch (erro) {
        mostrarMensagem('erro', 'Falha de conexão com o servidor: ' + erro.message);
    }
}

function abrirConfirmacao(jogo) {
    jogoParaExcluir = jogo;
    textoExclusao.textContent = 'Deseja realmente excluir o jogo "' + jogo.titulo + '"?';
    dialogo.showModal();
}

document.getElementById('btnNao').addEventListener('click', () => {
    jogoParaExcluir = null;
    dialogo.close();
});

document.getElementById('btnSim').addEventListener('click', async () => {
    const jogo = jogoParaExcluir;
    dialogo.close();
    if (!jogo) return;

    try {
        const resposta = await fetch(URL_JOGOS + '/' + jogo.id, { method: 'DELETE' });
        if (resposta.status === 204) {
            mostrarMensagem('sucesso', 'Jogo excluído com sucesso!');
        } else if (resposta.status === 404) {
            mostrarMensagem('erro', 'O jogo não foi encontrado. Ele pode já ter sido excluído.');
        } else {
            mostrarMensagem('erro', 'Erro ao excluir o jogo (HTTP ' + resposta.status + ').');
        }
    } catch (erro) {
        mostrarMensagem('erro', 'Falha de conexão com o servidor: ' + erro.message);
    }
    jogoParaExcluir = null;
    carregarJogos();
});

const mensagemSalva = sessionStorage.getItem('mensagemSucesso');
if (mensagemSalva) {
    mostrarMensagem('sucesso', mensagemSalva);
    sessionStorage.removeItem('mensagemSucesso');
}

carregarJogos();
