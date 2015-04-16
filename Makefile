srouces  = src/immutable-object-type.ts 
sources += src/immutable-array-type.ts 
srouces  = src/immutable-map-type.ts 
sources += src/quadtree-route.ts
sources += src/quaternary.ts
sources += src/tree.ts

all: build/immutable-quadtree.js

build/immutable-quadtree.js: build/tree.js
	cat src/resource/header.js.tmpl src/vendor/object-assign.js $? src/resource/footer.js.tmpl > $@

build/tree.js: $(sources)
	tsc -t ES5 $(sources) --out $@

clean:
	rm build/*

coverage: build/immutable-quadtree.js
	istanbul cover _mocha -- -R spec

test: build/immutable-quadtree.js
	npm test

doc: build/immutable-quadtree.js
	jsdoc2md build/immutable-quadtree.js > DOC.md
