all: immutable-quadtree.js

immutable-quadtree.js: build/immutable-object-type.js build/quadtree-route.js build/quaternary.js build/tree.js
	cat build/immutable-object-type.js build/quadtree-route.js build/quaternary.js build/tree.js > build/immutable-quadtree.js

build/tree.js: src/immutable-object-type.ts src/quadtree-route.ts src/quaternary.ts src/tree.ts
	tsc src/tree.ts --outDir build
