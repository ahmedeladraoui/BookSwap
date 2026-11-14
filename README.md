# BookSwap

Une interface web simple permettant de consulter des demandes d’échange de livres. Elle affiche les livres, les informations de leurs propriétaires ainsi que les offres associées, avec des fonctionnalités de recherche et de filtrage.

## Fonctionnalités

- Affichage des demandes d’échange de livres et des détails de chaque livre.
- Recherche par titre du livre.
- Filtrage par type d’échange : tous, permanent ou temporaire.
- Filtrage par catégorie.
- Affichage du statut de la demande, des informations du propriétaire et des livres proposés en échange.
- Actualisation des données depuis le serveur.

## Technologies utilisées

- HTML
- JavaScript
- Tailwind CSS via CDN
- Font Awesome via CDN

## Prérequis

- Un navigateur web moderne. 
- Le serveur API du projet doit être opérationnel à l’adresse `http://127.0.0.1:8000`.
- L’API doit être accessible via la route `GET /api/v1/exchange-requests` et retourner les données dans la propriété `data` d'une réponse JSON.
- Les requêtes CORS doivent être autorisées depuis l’origine du frontend si le serveur et l’interface fonctionnent sur des domaines ou des ports différents.

> Le frontend dépend de l’API. L’exécution des fichiers frontend seuls ne permet pas d’afficher les données des livres.

## Installation et exécution locale

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/ahmedeladraoui/BookSwap.git
   cd BookSwap
   ```

2. Démarrer le serveur API sur `127.0.0.1:8000` et vérifier que la route `/api/v1/exchange-requests` est accessible.

3. Lancer un serveur local pour les fichiers frontend depuis le dossier du projet, par exemple avec Python :

   ```bash
   python -m http.server 5500
   ```

4. Ouvrir [http://localhost:5500](http://localhost:5500) dans le navigateur.

## Structure du projet

```text
BookSwap/
├── index.html   # Page principale de l'interface
├── main.js      # Récupération, affichage, recherche et filtrage des données
├── logo.webp    # Logo du projet
├── book-4.svg   # Image par défaut du livre affiché dans certaines offres
└── README.md
```

## Configuration de l'API

L'adresse de l'API est actuellement définie dans `main.js` :

`http://127.0.0.1:8000`

Si le serveur fonctionne sur une adresse ou un port différent, il faut mettre à jour l'URL des requêtes ainsi que les chemins des images utilisés dans le fichier afin qu'ils correspondent à la configuration de votre serveur.

## Contribution

Les suggestions et les améliorations sont les bienvenues.

Vous pouvez ouvrir une *Issue* pour discuter d'une modification ou soumettre une *Pull Request* pour proposer une contribution.


## Backend et API

Ce projet frontend nécessite un backend séparé développé avec Laravel pour fonctionner correctement.

Le backend est responsable de la gestion des données et de la mise à disposition des API utilisées par l'interface.

**Dépôt du Backend :** https://github.com/TayebsouiniYcode/cyphX-e-commerce.git

### Configuration

1. Cloner le dépôt du backend.
2. Installer les dépendances avec Composer.
3. Configurer le fichier `.env`.
4. Configurer la base de données.
5. Exécuter les migrations.
6. Démarrer le serveur Laravel :

   ```bash
   php artisan serve