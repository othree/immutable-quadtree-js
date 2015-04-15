srouces  = src/immutable-object-type.ts 
sources += src/immutable-array-type.ts 
sources += src/quadtree-route.ts
sources += src/quaternary.ts
sources += src/tree.ts

all: build/immutable-quadtree.js

build/immutable-quadtree.js: build/tree.js
	cat src/resource/header.js.tmpl src/vendor/object-assign.js $? src/resource/footer.js.tmpl > $@

build/tree.js: $(sources)
	tsc -t ES5 $? --out $@

clean:
	rm build/*

coverage: build/immutable-quadtree.js
	istanbul cover _mocha -- -R spec

test: build/immutable-quadtree.js
	npm test
