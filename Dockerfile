# Image de base : Node.js 22 sur Alpine Linux (légère)
FROM node:22-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie de package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances (--omit=dev : pas de Jest ni Supertest)
RUN npm ci --omit=dev

# Copie du code de l'application
COPY src ./src

ENV PORT=3000
EXPOSE 3000

# Commande lancée au démarrage du conteneur
CMD ["node", "src/server.js"]