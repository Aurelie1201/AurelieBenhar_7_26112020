# GROUPOMANIA
***
## Contexte

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. 

Ce repo comporte les parties Backend et Frontend du MVP.

### Technos utilisés

La partie backend utilise un serveur express de nodeJs ainsi que l'ORM sequelize pour la gestion de la base de données SQL.
La partie frontend Javascript et Sass ont été utilisés. 

### Utilisation

Après avoir cloner, dans le dossier Backend, un fichier .env est à utiliser, le fichier .env.example doit être copié et rempli avec des codes valides.

Remplir le fichier config.js qui se trouve dans backend\config\config.js avec des données valides pour se connecter via sequelize.

C'est la base "development" qui est utilisée ici.

Toujours dans le dossier backend taper les commandes :

``npm install``

``npm install --save-dev sequelize-cli``

Ensuite créer une base de données "database_development" dans mysql.

Puis :

``npx sequelize db:migrate``

``node server``


Le lancement du serveur s'effectue sur le port 8080.

Pour le front dans le dossier html ouvrir la page index.html.

Pour avoir un compte administrateur, créer un utilisateur puis effectuer un update sur mysql avec l'identifiant (userId) correspondant à cet utilisateur :

``UPDATE users SET isAdmin = '1' WHERE users.`id` = userId;``