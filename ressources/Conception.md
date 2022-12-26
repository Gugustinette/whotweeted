# Conception pour WhoTweeted

## Modes de jeu

- Mode "Célébrités"
    - Permet de jouer avec les comptes de personnalités connues sur Twitter
    - Plusieurs catégories ? (Sport, Politique, Influenceurs,...)
- Mode "Entre potes"
    - Permet de jouer avec les comptes de ses amis

Pour chaque partie, des réglages du type :
- Mode "Proposition" ou Mode "Libre"
    - Proposition : Il y a 2 à 4 propositions qui s'affichent à l'utilisateur
    - Libre : Un simple champ texte pour donner la réponse
        - @Identifiant Twitter ? Accepter le pseudo ?
- Nombre de rounds

## Cas d'utilisation

### Batch - Mode Célébrité
Pour maintenir le mode célébrité à jour, des batchs doivent se lancer toutes les semaines pour récupérer les personnalités les plus connus de Twitter ?
On récupère les 1000 célébrité les plus connus pour un mode "All-Star" ?
+ les 200 personnalités les plus connus pour chaque catégorie

### Connexion ?
Il faut un compte pour jouer ?
-> Connexion via Twitter ?

### Partie
- Un joueur créer un salon et devient maître de jeu.
    - Il envoie le lien autres joueurs
    - ou les autres joueurs rentrent l'identifiant directement dans un champ
- Le maître de jeu peu effectuer des réglages.
- Le maître de jeu lance la partie
- Les rounds s'enchaînent
    - Affichage d'un tweet d'une personne au hasard parmis les comptes jouées (célébrités ou autres)
    - On donne la réponse
        - Stockage des réponses dans le Round ?
    - Au bout d'un certain temps, la réponse s'affiche ?
        - Pour le mode libre, ça peut être bien sympa
        - Cron ? (ça va être lourd hein)
- Les résultats s'affichent, avec le gagnant

### Autres possibilité
- Permettre à une utilisateur de "bannir" son compte pour interdire de jouer avec ?

## Modèles
- User
    - id
    - username : string
    - url_pp : string
    - nb_won_game : int
- Room
    - id
    - id_master
    - id_players[]
    - scores<>
    - actual_rounds
    - id_rounds[]
    - id_twitter_users[]
- Round
    - id
    - id_tweet
    - id_twitter_user_response
    - id_twitter_user_propositions[]
    - player_responses<>
