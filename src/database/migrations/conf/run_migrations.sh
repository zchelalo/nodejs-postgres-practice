#!/bin/bash

docker run --rm \
  -v $PWD/src/database/migrations:/flyway/sql \
  -v $PWD/src/database/migrations/conf/flyway.conf:/flyway/conf/flyway.conf \
  --network=nodejs-postgres_default \
  redgate/flyway migrate