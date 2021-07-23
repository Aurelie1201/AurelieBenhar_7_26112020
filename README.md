# GROUPOMANIA
***
## Contexte

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. 

Ce repo comporte les parties Backend et Frontend du MVP.

### Technos utilisés

La partie backend utilise un serveur express de nodeJs ainsi que l'ORM sequelize pour la gestion de la base de données SQL.
La partie frontend Javascript et Sass ont été utilisés. 

### Utilisation

Un fichier .env est à utiliser, le fichier .env.example doit être copié et rempli avec des codes valides.
Remplir le fichier config.js avec des données valides pour se connecter via sequelize.
C'est la base "development" qui est utilisée.
Taper la commande sequelize db:migrate pour obtenir les tables utilisées dans ce projet (à savoir users, messages et coments)

Depuis le dossier backend, exécuter npm install puis node server.
Le lancement du serveur s'effectue sur le port 8080.

Pour le front ouvrir la page index.html