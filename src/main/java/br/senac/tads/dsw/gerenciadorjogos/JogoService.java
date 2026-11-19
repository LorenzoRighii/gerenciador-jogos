package br.senac.tads.dsw.gerenciadorjogos;

import java.util.List;
import java.util.Optional;

public interface JogoService {

    List<JogoDto> obterJogos();

    Optional<JogoDto> obterJogo(Integer id);

    JogoDto incluirNovoJogo(JogoDto jogo);

    JogoDto alterarJogo(Integer id, JogoDto jogo);

    void removerJogo(Integer id);
}
