# API - Websocket

La connexion WebSocket se lance lors de l'accès à une partie.

## Module Room

-> Lancement de la partie (MJ)
    <- Lancement de la partie (à tous les joueurs)
- Configuration de la partie avec les réglages
    [O] <- Lancement du premier round (envoie des informations du tweet et de la configuration du round)
- Affichage du tweet
-> Envoie de la réponse (de la part de tous les joueurs)
- Au bout du temps limite OU lorsque tous les joueurs ont répondus
    <- Envoie des réponses des joueurs ET de la bonne réponse + les scores
- Affiches des réponses + scores
-[O] Au bout de X secondes, lance le round suivant
- Lorsque tous les rounds sont joués
    <- Envoie des scores
- Affichage des scores
- Au bout de X secondes, fin de la partie, suppression de toutes les données

## Sécurités

- Le serveur doit tenir à jour le nombre de joueurs connectés à une partie, si une partie n'a plus de joueurs, elle doit être intégralement supprimée.
    -> Détection déconnexion, vérification du nombre de joueurs
