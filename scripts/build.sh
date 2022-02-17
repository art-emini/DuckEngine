[ -d "./dist" ] && rm -rf ./dist/* && echo "Cleaned dist directory"
[ -d "./lib" ] && rm -rf ./lib/* && echo "Cleaned lib directory"
[ -d "./docs" ] && rm -rf ./docs/* && echo "Cleaned docs directory"
echo "Compiling"
yarn run tsc
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