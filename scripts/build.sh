[ -d "./dist" ] && rm -rfv ./dist/*
[ -d "./lib" ] && rm -rfv ./lib/*
[ -d "./docs" ] && rm -rfv ./docs/*

echo "Compiling"
tsc
echo "Compiled"
echo "Bundling Files"
yarn run webpack
echo "Bundled"
echo "Minifying"
yarn run minify
echo "Minified"
echo "Building Docs"
yarn run build:docs
echo "Built Docs"
echo "Finishing"
cp package.json lib/package.json
cp LICENSE lib/LICENSE
cp -a global/ docs/global
echo "Done"