const $ = id => document.getElementById(id);

function cardHtml(c) {
  if (c.rank === '?') return '<div class="card back"></div>';
  const red = c.suit === '♥' || c.suit === '♦' ? ' red' : '';
  return `
    <div class="card${red}">
      <div class="corner">${c.rank}<br>${c.suit}</div>
      <div class="center">${c.suit}</div>
      <div class="corner bottom">${c.rank}<br>${c.suit}</div>
    </div>`;
}

function setScore(id, value) {
  const el = $(id);
  el.hidden = value === null || value === undefined;
  el.textContent = value;
}

async function loadScore() {
  const s = await (await fetch('/score')).json();
  $('sv').textContent = s.victoires;
  $('sd').textContent = s.defaites;
  $('se').textContent = s.egalites;
}

function render(s) {
  if (s.status === 'idle') return;
  $('dealer').innerHTML = s.dealer.map(cardHtml).join('');
  $('player').innerHTML = s.player.map(cardHtml).join('');
  setScore('dv', s.dealerValue);
  setScore('pv', s.playerValue);

  const r = $('result');
  r.textContent = s.result ? s.result.toUpperCase() : '';
  r.className = s.result || '';

  const playing = s.status === 'playing';
  $('hit').disabled = !playing;
  $('stand').disabled = !playing;
  if (s.status === 'finished') loadScore();
}

async function act(action) {
  const res = await fetch('/' + action, { method: 'POST' });
  render(await res.json());
}

$('new').addEventListener('click', () => act('new'));
$('hit').addEventListener('click', () => act('hit'));
$('stand').addEventListener('click', () => act('stand'));

fetch('/state').then(r => r.json()).then(render);

loadScore();