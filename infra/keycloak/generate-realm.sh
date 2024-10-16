#!/bin/bash

IMPORT_DIR=/opt/keycloak/data/import
TEMPLATE_FILE=/opt/import-data/realm-export.template.json
TARGET_FILE=$IMPORT_DIR/realm-export.json

mkdir -p $IMPORT_DIR

cp $TEMPLATE_FILE $TARGET_FILE

for var in $(compgen -e); do
  value=$(printenv $var)
  sed -i "s|\${$var}|$value|g" $TARGET_FILE
done

echo "Generated realm-export.json:"
cat $TARGET_FILE

exec /opt/keycloak/bin/kc.sh start --import-realm