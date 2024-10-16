#!/bin/bash

# Define the target directory for the import file
IMPORT_DIR=/opt/keycloak/data/import
TEMPLATE_FILE=/opt/import-data/realm-export.template.json
TARGET_FILE=$IMPORT_DIR/realm-export.json

# Create the directory if it doesn't exist
mkdir -p $IMPORT_DIR

# Copy the template file to the target location
cp $TEMPLATE_FILE $TARGET_FILE

# Loop through all environment variables and substitute them in the target file
for var in $(compgen -e); do
  value=$(printenv $var)
  # Use sed to substitute the placeholders with the environment variable values
  sed -i "s|\${$var}|$value|g" $TARGET_FILE
done

# Print the resulting realm-export.json for debugging
echo "Generated realm-export.json:"
cat $TARGET_FILE

# Start Keycloak and import the realm
exec /opt/keycloak/bin/kc.sh start --import-realm