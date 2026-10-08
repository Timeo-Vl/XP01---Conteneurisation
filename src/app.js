const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
  const deck = [];
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ rank, suit });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function handValue(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.rank === 'A') { aces++; total += 11; }
    else if (['J', 'Q', 'K'].includes(card.rank)) total += 10;
    else total += Number(card.rank);
  }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

let game = null;

function newGame() {
  const deck = createDeck();
  game = {
    deck,
    player: [deck.pop(), deck.pop()],
    dealer: [deck.pop(), deck.pop()],
    status: 'playing',
    result: null,
  };
  if (handValue(game.player) === 21) stand();
}

function stand() {
  while (handValue(game.dealer) < 17) game.dealer.push(game.deck.pop());
  const p = handValue(game.player);
  const d = handValue(game.dealer);
  game.status = 'finished';
  if (d > 21 || p > d) game.result = 'victoire';
  else if (p === d) game.result = 'égalité';
  else game.result = 'défaite';
}

function view() {
  if (!game) return { status: 'idle' };
  const hidden = game.status === 'playing';
  return {
    status: game.status,
    result: game.result,
    player: game.player,
    playerValue: handValue(game.player),
    dealer: hidden ? [game.dealer[0], { rank: '?', suit: '' }] : game.dealer,
    dealerValue: hidden ? null : handValue(game.dealer),
  };
}

app.get('/state', (req, res) => res.json(view()));

app.post('/new', (req, res) => {
  newGame();
  res.json(view());
});

app.post('/hit', (req, res) => {
  if (!game || game.status !== 'playing') {
    return res.status(400).json({ error: 'Aucune partie en cours' });
  }
  game.player.push(game.deck.pop());
  if (handValue(game.player) > 21) {
    game.status = 'finished';
    game.result = 'défaite';
  }
  res.json(view());
});

app.post('/stand', (req, res) => {
  if (!game || game.status !== 'playing') {
    return res.status(400).json({ error: 'Aucune partie en cours' });
  }
  stand();
  res.json(view());
});

module.exports = { app, handValue };