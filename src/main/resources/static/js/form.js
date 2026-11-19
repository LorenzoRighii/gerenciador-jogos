const URL_JOGOS = '/jogos';
const CAMPOS = ['titulo', 'observacoes', 'anoLancamento', 'plataforma', 'disponivel'];

const parametros = new URLSearchParams(window.location.search);
const idJogo = parametros.get('id');

const form = document.getElementById('formJogo');
const elMensagem = document.getElementById('mensagem');

function mostrarMensagem(tipo, texto) {
    elMensagem.textContent = texto;
    elMensagem.className = 'mensagem ' + tipo;
}

function limparErros() {
    elMensagem.className = 'mensagem oculto';
    for (const campo of CAMPOS) {
        document.getElementById('erro-' + campo).textContent = '';
        document.getElementById('campo-' + campo).classList.remove('com-erro');
    }
}

function mostrarErrosDosCampos(erros) {
    for (const campo of Object.keys(erros)) {
        const elErro = document.getElementById('erro-' + campo);
        const elCampo = document.getElementById('campo-' + campo);
        if (elErro) elErro.textContent = erros[campo];
        if (elCampo) elCampo.classList.add('com-erro');
    }
}

function lerFormulario() {
    const ano = document.getElementById('anoLancamento').value;
    const disponivel = form.elements['disponivel'].value;
    return {
        titulo: document.getElementById('titulo').value,
        observacoes: document.getElementById('observacoes').value,
        anoLancamento: ano === '' ? null : Number(ano),
        plataforma: document.getElementById('plataforma').value,
        disponivel: disponivel === '' ? null : disponivel === 'true'
    };
}

function preencherFormulario(jogo) {
    document.getElementById('titulo').value = jogo.titulo;
    document.getElementById('observacoes').value = jogo.observacoes ?? '';
    document.getElementById('anoLancamento').value = jogo.anoLancamento;
    document.getElementById('plataforma').value = jogo.plataforma;
    form.elements['disponivel'].value = String(jogo.disponivel);
}

async function carregarJogo() {
    document.getElementById('tituloPagina').textContent = 'Alterar jogo - ID ' + idJogo;
    try {
        const resposta = await fetch(URL_JOGOS + '/' + idJogo);
        if (resposta.status === 404) {
            mostrarMensagem('erro', 'Jogo não encontrado.');
            form.classList.add('oculto');
            return;
        }
        if (!resposta.ok) {
            mostrarMensagem('erro', 'Erro ao carregar o jogo (HTTP ' + resposta.status + ').');
            return;
        }
        preencherFormulario(await resposta.json());
    } catch (erro) {
        mostrarMensagem('erro', 'Falha de conexão com o servidor: ' + erro.message);
    }
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    limparErros();

    const editando = idJogo !== null;
    const url = editando ? URL_JOGOS + '/' + idJogo : URL_JOGOS;
    const metodo = editando ? 'PUT' : 'POST';

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lerFormulario())
        });

        if (resposta.ok) {
            sessionStorage.setItem('mensagemSucesso',
                editando ? 'Jogo alterado com sucesso!' : 'Jogo cadastrado com sucesso!');
            window.location.href = 'index.html';
            return;
        }

        const corpo = await resposta.json().catch(() => ({}));
        mostrarMensagem('erro', corpo.detail || 'Erro ao salvar o jogo (HTTP ' + resposta.status + ').');
        if (corpo.erros) {
            mostrarErrosDosCampos(corpo.erros);
        }
    } catch (erro) {
        mostrarMensagem('erro', 'Falha de conexão com o servidor: ' + erro.message);
    }
});

if (idJogo !== null) {
    carregarJogo();
}
