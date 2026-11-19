package br.senac.tads.dsw.gerenciadorjogos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senac.tads.dsw.gerenciadorjogos.entidade.JogoEntity;
import br.senac.tads.dsw.gerenciadorjogos.excecao.NaoEncontradoException;
import br.senac.tads.dsw.gerenciadorjogos.repositorio.JogoRepository;

@Service
public class JogoServiceImpl implements JogoService {

    private final JogoRepository jogoRepository;

    public JogoServiceImpl(JogoRepository jogoRepository) {
        this.jogoRepository = jogoRepository;
    }

    private JogoDto toDto(JogoEntity entity) {
        JogoDto dto = new JogoDto();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setObservacoes(entity.getObservacoes());
        dto.setAnoLancamento(entity.getAnoLancamento());
        dto.setPlataforma(entity.getPlataforma());
        dto.setDisponivel(entity.getDisponivel());
        return dto;
    }

    private void copiarCampos(JogoDto dto, JogoEntity entity) {
        entity.setTitulo(dto.getTitulo().trim());
        entity.setObservacoes(dto.getObservacoes());
        entity.setAnoLancamento(dto.getAnoLancamento());
        entity.setPlataforma(dto.getPlataforma().trim());
        entity.setDisponivel(dto.getDisponivel());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JogoDto> obterJogos() {
        return jogoRepository.findAll(Sort.by("id")).stream().map(this::toDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<JogoDto> obterJogo(Integer id) {
        return jogoRepository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional
    public JogoDto incluirNovoJogo(JogoDto jogo) {
        JogoEntity entity = new JogoEntity();
        copiarCampos(jogo, entity);
        return toDto(jogoRepository.save(entity));
    }

    @Override
    @Transactional
    public JogoDto alterarJogo(Integer id, JogoDto jogo) {
        JogoEntity entity = jogoRepository.findById(id)
            .orElseThrow(() -> new NaoEncontradoException("Jogo " + id + " não encontrado"));
        copiarCampos(jogo, entity);
        return toDto(jogoRepository.save(entity));
    }

    @Override
    @Transactional
    public void removerJogo(Integer id) {
        JogoEntity entity = jogoRepository.findById(id)
            .orElseThrow(() -> new NaoEncontradoException("Jogo " + id + " não encontrado"));
        jogoRepository.delete(entity);
    }
}
