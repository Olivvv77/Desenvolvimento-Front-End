// Menu responsivo
const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-menu');
toggleBtn?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
});

// Utilidades
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message || '';
}
function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

// IMC
const imcForm = document.getElementById('imc-form');
imcForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const peso = parseFloat(document.getElementById('peso').value);
  const alturaCm = parseFloat(document.getElementById('altura').value);
  const objetivo = document.getElementById('objetivo').value;

  let valid = true;
  if (isNaN(peso) || peso <= 0) { showError('peso-error', 'Informe um peso válido.'); valid = false; } else { showError('peso-error', ''); }
  if (isNaN(alturaCm) || alturaCm < 50 || alturaCm > 250) { showError('altura-error', 'Altura entre 50 e 250 cm.'); valid = false; } else { showError('altura-error', ''); }
  if (isEmpty(objetivo)) { showError('objetivo-error', 'Selecione um objetivo.'); valid = false; } else { showError('objetivo-error', ''); }

  if (!valid) return;

  const alturaM = alturaCm / 100;
  const imc = peso / (alturaM * alturaM);

  const valorEl = document.getElementById('imc-valor');
  const classEl = document.getElementById('imc-classificacao');
  valorEl.textContent = `Seu IMC é ${imc.toFixed(1)}.`;

  let classe = '';
  if (imc < 18.5) classe = 'Abaixo do peso';
  else if (imc < 25) classe = 'Peso normal';
  else if (imc < 30) classe = 'Sobrepeso';
  else classe = 'Obesidade';

  classEl.textContent = `Classificação: ${classe} • Objetivo: ${objetivo}.`;
});

// Lista dinâmica de treinos
const treinoForm = document.getElementById('treino-form');
const lista = document.getElementById('lista-treinos');

treinoForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome-treino').value.trim();
  const duracao = parseInt(document.getElementById('duracao').value, 10);
  const nivel = document.getElementById('nivel').value;

  if (isEmpty(nome) || isNaN(duracao) || duracao < 5 || isEmpty(nivel)) {
    alert('Preencha o formulário de treino corretamente.');
    return;
  }

  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
    <button class="remove" aria-label="Remover treino">&times;</button>
    <h4>${nome}</h4>
    <div class="meta">Duração: ${duracao} min • Nível: ${nivel}</div>
  `;
  lista.appendChild(li);
  treinoForm.reset();
});

// Remoção com delegação de eventos
lista?.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove');
  if (btn) {
    const card = btn.closest('.card');
    card?.remove();
  }
});

// Validação de contato
const contatoForm = document.getElementById('contato-form');
const successMsg = document.getElementById('contato-success');

contatoForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  let valid = true;

  if (isEmpty(nome)) { showError('nome-error', 'Informe seu nome.'); valid = false; } else { showError('nome-error', ''); }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email-error', 'Email inválido.'); valid = false; } else { showError('email-error', ''); }
  if (mensagem.trim().length < 10) { showError('mensagem-error', 'Mensagem muito curta (mín. 10 caracteres).'); valid = false; } else { showError('mensagem-error', ''); }

  if (!valid) return;

  successMsg.hidden = false;
  contatoForm.reset();
  setTimeout(() => { successMsg.hidden = true; }, 4000);
});
