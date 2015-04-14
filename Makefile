all: immutable-quadtree.js

immutable-quadtree.js: build/tree.js
	cat src/resource/header.js.tmpl build/tree.js src/resource/footer.js.tmpl > build/immutable-quadtree.js

build/tree.js: src/immutable-object-type.ts src/quadtree-route.ts src/quaternary.ts src/tree.ts
	tsc src/immutable-object-type.ts src/quadtree-route.ts src/quaternary.ts src/tree.ts --out build/tree.js
	
