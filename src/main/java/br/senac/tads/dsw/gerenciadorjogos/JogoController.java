package br.senac.tads.dsw.gerenciadorjogos;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.senac.tads.dsw.gerenciadorjogos.excecao.NaoEncontradoException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/jogos")
public class JogoController {

    private final JogoService jogoService;

    public JogoController(JogoService jogoService) {
        this.jogoService = jogoService;
    }

    @GetMapping
    public List<JogoDto> obterJogos() {
        return jogoService.obterJogos();
    }

    @GetMapping("/{id}")
    public JogoDto obterJogo(@PathVariable("id") Integer id) {
        return jogoService.obterJogo(id)
            .orElseThrow(() -> new NaoEncontradoException("Jogo " + id + " não encontrado"));
    }

    @PostMapping
    public ResponseEntity<JogoDto> incluirNovoJogo(@RequestBody @Valid JogoDto jogo) {
        JogoDto salvo = jogoService.incluirNovoJogo(jogo);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(salvo.getId())
            .toUri();
        return ResponseEntity.created(location).body(salvo);
    }

    @PutMapping("/{id}")
    public JogoDto alterarJogo(@PathVariable("id") Integer id, @RequestBody @Valid JogoDto jogo) {
        return jogoService.alterarJogo(id, jogo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerJogo(@PathVariable("id") Integer id) {
        jogoService.removerJogo(id);
        return ResponseEntity.noContent().build();
    }
}
