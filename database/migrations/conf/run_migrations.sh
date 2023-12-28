#!/bin/bash

docker run --rm \
  -v $PWD/database/migrations:/flyway/sql \
  -v $PWD/database/migrations/conf/flyway.conf:/flyway/conf/flyway.conf \
  --network=nodejs-postgres_default \
  redgate/flyway migrate