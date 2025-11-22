# Configuration Cloudinary pour Florent Food

## Étape 1 : Créer un Upload Preset

1. Va sur https://cloudinary.com/console
2. Clique sur **Settings** (roue dentée en haut à droite)
3. Va dans l'onglet **Upload**
4. Scroll jusqu'à **Upload presets**
5. Clique sur **Add upload preset**

Configuration recommandée :
- **Preset name** : `florent_food` (ou autre nom)
- **Signing Mode** : **Unsigned** ⚠️ Important !
- **Folder** : `florent-food/recipes` (optionnel)
- **Transformation** :
  - Width: 1200
  - Height: 900
  - Crop: limit
  - Quality: auto
  - Format: auto

6. Sauvegarde le preset

## Étape 2 : Variables d'environnement

Ajoute ces variables dans Coolify :

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwgcuhww5
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=florent_food
```

Note : Le nom `dwgcuhww5` est déjà dans ton .env.example

## Étape 3 : Redéployer

Une fois configuré dans Coolify :
1. Sauvegarde les variables d'environnement
2. Redéploie l'application
3. Teste l'upload d'image en créant une recette

## Vérification

Pour vérifier que tout fonctionne :
1. Va sur `/admin/recettes/new`
2. Clique sur "Cliquer pour uploader une image"
3. Sélectionne une image
4. Tu devrais voir "Upload en cours..." puis l'image s'affiche

## Problèmes courants

### Erreur 401 Unauthorized
- Vérifie que le preset est bien en mode **Unsigned**
- Vérifie le nom du cloud (`dwgcuhww5`)

### Erreur 404 Not Found
- Vérifie que le nom du preset est correct
- Vérifie qu'il est bien sauvegardé dans Cloudinary

### L'upload ne démarre pas
- Vérifie que les variables d'environnement sont bien définies
- Redéploie l'application après avoir ajouté les variables
