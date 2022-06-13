#!/bin/sh

set -e

pnpm i --frozen-lockfile

pnpm build

cd dist/vinicunca
npm publish
cd -

echo "✅ Publish completed"