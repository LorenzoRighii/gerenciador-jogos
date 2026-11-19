package br.senac.tads.dsw.gerenciadorjogos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class JogoDto {

    private Integer id;

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 100, message = "O título deve ter no máximo 100 caracteres")
    private String titulo;

    @Size(max = 500, message = "As observações devem ter no máximo 500 caracteres")
    private String observacoes;

    @NotNull(message = "O ano de lançamento é obrigatório")
    @Min(value = 1950, message = "O ano de lançamento deve ser igual ou maior que 1950")
    private Integer anoLancamento;

    @NotBlank(message = "A plataforma é obrigatória")
    @Size(max = 50, message = "A plataforma deve ter no máximo 50 caracteres")
    private String plataforma;

    @NotNull(message = "Informe se o jogo está disponível")
    private Boolean disponivel;

    public JogoDto() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public Integer getAnoLancamento() { return anoLancamento; }
    public void setAnoLancamento(Integer anoLancamento) { this.anoLancamento = anoLancamento; }

    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }

    public Boolean getDisponivel() { return disponivel; }
    public void setDisponivel(Boolean disponivel) { this.disponivel = disponivel; }
}
