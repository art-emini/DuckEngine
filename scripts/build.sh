echo "Compiling"
tsc
echo "Compiled"
echo "Merging Files"
npm run webpack
echo "Merged"
echo "Minifying"
npm run minify
echo "Minified"
echo "Building Docs"
npm run build:docs
echo "Built Docs"
echo "Finishing"
cp package.json lib/package.json
echo "Done"