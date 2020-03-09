#### Installation

Installer npm :

```
$ sudo apt-get update
$ sudo apt install nodejs
$ sudo apt install npm
```

Vérifier l'installation de npm :

```
$ npm -v
> 'version de node'
```

Lancer l'application :

1. Se déplacer dans le dossier racine

2. lancer les commandes suivantes :

```
$ npm install
$ node server.js
$ node client.js
$ node client.js
```

#### Fonctionnement

Les clients communiquent entres eux via le serveur, il est donc nécessaire de lancer plusieurs clients.

L'application fonctionne en plusieurs étapes :

1. Le serveur se met à l'écoute du port 3000 (par défaut).
2. Lorsqu'un client est lancé, un pseudo est demandé à l'utilisateur.
3. Une fois le pseudo entré, le client se connecte à la socket du serveur.
4. Lors de la connexion du client, le serveur va demander une clé publique au client.
5. Le client va envoyer la clé publique au serveur.
6. Le serveur crypte le mot de passe utilisé pour crypter les messages en DES à l'aide de la clé publique qu'il a reçu.
7. Le serveur envoie le mot de passe crypté au client.
8. Le client peut maintenant envoyer des messages qui seront envoyé via le serveur à toutes les sockets qui écoutent le serveur. Chaque message est crypté en DES et pourra être lu par les sockets qui possèdent le mot de passe.
