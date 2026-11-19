const INTEGRANTES = 'Lorenzo Righi Heliodoro / Nome do aluno 2';
const TURMA = 'TADS 3B Noturno';
const ANO = '2026';
const USOU_IA = 'SIM — Claude (Anthropic), usado para gerar o código do projeto';

const rodape = document.createElement('footer');

const linhaIntegrantes = document.createElement('div');
linhaIntegrantes.textContent = INTEGRANTES + ' / ' + TURMA + ' / ' + ANO;

const linhaIa = document.createElement('div');
linhaIa.textContent = 'Usou IA (SIM/NÃO): ' + USOU_IA;

rodape.appendChild(linhaIntegrantes);
rodape.appendChild(linhaIa);
document.body.appendChild(rodape);
