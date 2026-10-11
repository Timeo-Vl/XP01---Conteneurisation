<div align="center">

# ♠️ Blackjack ♥️

**Un jeu de blackjack web, conteneurisé avec Docker et vérifié par une CI.**

[![CI](https://github.com/Timeo-Vl/blackjack-docker/actions/workflows/ci.yml/badge.svg)](https://github.com/Timeo-Vl/blackjack-docker/actions)
![Node](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![Version](https://img.shields.io/badge/version-1.1.0-f1c40f)

<img src="docs/screenshot.png" alt="Capture du jeu" width="700">

</div>

---

## 🚀 Lancer en 30 secondes

Seuls **Git** et **Docker** sont nécessaires.

```bash
git clone https://github.com/Timeo-Vl/blackjack-docker.git
cd blackjack-docker
docker compose up -d --build
```

Puis ouvrir **http://localhost:8080** 🎰

Pour arrêter : `docker compose down`

## ✨ Fonctionnalités

- Partie contre le croupier : tirer, rester, valeur des As gérée
- Score cumulé : victoires, défaites, égalités
- Affichage de la version de l'application
- Interface style table de casino, en HTML / CSS / JS pur

## 🛠️ Stack

| Domaine | Outils |
|---|---|
| Application | Node.js, Express |
| Tests | Jest,