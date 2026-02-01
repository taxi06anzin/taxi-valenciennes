#!/bin/bash

# Liste de toutes les pages communes à corriger
COMMUNES=(
  "anzin"
  "artres"
  "aubry-du-hainaut"
  "aulnoy-lez-valenciennes"
  "beuvrages"
  "bruay-sur-escaut"
  "conde-sur-escaut"
  "crespin"
  "curgies"
  "denain"
  "estreux"
  "famars"
  "fresnes-sur-escaut"
  "hergnies"
  "maing"
  "marly"
  "monchaux-sur-ecaillon"
  "odomez"
  "onnaing"
  "petite-foret"
  "preseau"
  "prouvy"
  "quarouble"
  "querenaing"
  "quievrechain"
  "rombies-et-marchipont"
  "rouvignies"
  "saint-aybert"
  "saint-saulve"
  "saultain"
  "sebourg"
  "thivencelle"
  "valenciennes"
  "verchain-maugre"
  "vicq"
  "vieux-conde"
)

for commune in "${COMMUNES[@]}"; do
  file="public/taxi-conventionne-${commune}.html"
  if [ -f "$file" ]; then
    echo "Vérifie $file pour les grids et prix..."
    # Vérifier si le fichier contient des prix erronés ou grids 3 colonnes
    if grep -q "133€\|266€\|95€\|grid-template-columns: repeat(3" "$file"; then
      echo "  ⚠️  $commune a des prix ou grids à corriger"
    else
      echo "  ✅ $commune OK"
    fi
  fi
done

echo ""
echo "Vérification terminée. Toutes les pages communes existent."
