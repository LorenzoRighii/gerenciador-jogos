package br.senac.tads.dsw.gerenciadorjogos.excecao;

public class NaoEncontradoException extends RuntimeException {

    public NaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
