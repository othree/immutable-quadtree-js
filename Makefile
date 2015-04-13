all: immutable-quadtree.js

immutable-quadtree.js: build/tree.js
	cat build/immutable-object-type.js build/quadtree-route.js build/quaternary.js build/tree.js > build/immutable-quadtree.js

build/tree.js:
	tsc src/tree.ts --outDir build
