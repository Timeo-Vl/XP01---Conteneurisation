const request = require('supertest');
const { app, handValue } = require('../src/app');

describe('handValue', () => {
  test('additionne les cartes numérotées', () => {
    expect(handValue([{ rank: '5' }, { rank: '9' }])).toBe(14);
  });

  test('les figures valent 10', () => {
    expect(handValue([{ rank: 'K' }, { rank: 'Q' }])).toBe(20);
  });

  test("l'As vaut 11 quand c'est possible", () => {
    expect(handValue([{ rank: 'A' }, { rank: '9' }])).toBe(20);
  });

  test("l'As vaut 1 pour éviter de dépasser 21", () => {
    expect(handValue([{ rank: 'A' }, { rank: '9' }, { rank: '5' }])).toBe(15);
  });

  test('un blackjack vaut 21', () => {
    expect(handValue([{ rank: 'A' }, { rank: 'K' }])).toBe(21);
  });
});

describe('API', () => {
  test('GET /score renvoie les compteurs', async () => {
    const res = await request(app).get('/score');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('victoires');
    expect(res.body).toHaveProperty('defaites');
    expect(res.body).toHaveProperty('egalites');
  });

  test('POST /new distribue 2 cartes au joueur', async () => {
    const res = await request(app).post('/new');
    expect(res.status).toBe(200);
    expect(res.body.player).toHaveLength(2);
  });

  test('POST /hit sans partie en cours renvoie 400', async () => {
    await request(app).post('/stand'); // termine la partie en cours si besoin
    const res = await request(app).post('/hit');
    expect(res.status).toBe(400);
  });
});