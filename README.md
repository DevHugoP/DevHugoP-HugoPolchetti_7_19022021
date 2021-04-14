# HugoPolchetti_7_19022021

                                                  PROJET 7 OPENCLASSROOMS


                                                CREATION D'UN RESEAU SOCIAL

Pour pouvoir mettre en oeuvre le site après avoir téléchargé le code il faut suivre plusieurs étapes afin d'installer les packages additionnels utilisés dans le code, mettre en place la BDD MySQL et inclure des données afin de simuler de l'activité.

/// packages npm Back :
(il faut avoir installé node sur sa machine)

-   nodemon server
-   jwt (JSON WEB TOKEN) : npm install jsonwebtoken
-   multer : npm install --save multer
-   express : npm install express
-   sequelize : npm i sequelize
-   bcrypt : npm install bcrypt
-   body-parser : npm install body-parser
-   MySQL : npm install mysql

//// packages npm Front :

-   axios : npm install axios
-   jwt-decode : npm install jwt-decode
-   history : npm install history
-   moment : npm install moment

Lorsque l'ensembles des packages ont été installés dans les dossiers concernés (back et front), il faut mettre en oeurvre la base de donnée sur MySQL (penser à mettre dans le fichier back/app.js les identifiants de la BDD crée afin de la connecter au back via SEQUELIZE )

CREATION DE LA BDD :

-   Créer une base de donnée dans MySQL avec la commande :

          CREATE DATABASE database_development;

(le nom 'database_development' est important car certains fichiers de config de la migration sont nommés ainsi )

-   Après avoir crée la BDD via le terminal aller dans le dossier Back et utiliser la commande :

         npm sequelize db:migrate

(cela crée l'ensemble des tables avec leurs caracteristiques ainsi que les associations entre certaines colones via les clef étrangères)

-   Pour vérifier que la BDD est bien créee avec les bonnes tables dans le terminal MySQL taper les commandes :

          USE database_development;       => on se place dans la database que l'on a créée
          SHOW TABLES;                    => on voit les tables créées avec leurs noms (comments, messages, users)

Il manque à injecter les données contenues sur le fichier insertData.sql via importer sur PHPMydmin soit via la commande :

        mysql > USE database_development
        mysql > SOURCE inserData.sql ( SOURCE  + route du fichier)

Après cette étape il reste à démarer l'ensemble en allant dans le dossier back et taper la commande :

       nodemon server

Et dans le dossier front taper la commande :

       npm start

Le site se lance sur le navigateur !

HUGO POLCHETTI
