srouces  = src/immutable-object-type.ts 
sources += src/immutable-array-type.ts 
srouces  = src/immutable-map-type.ts 
sources += src/quadtree-route.ts
sources += src/quaternary.ts
sources += src/tree.ts

buildlh  = src/resource/header.js.tmpl
buildlh += src/vendor/object-assign.js

buildrh  = src/resource/footer.js.tmpl

target   = dist/immutable-quadtree.js

all: $(target)

$(target): $(buildlh) dist/tree.js $(buildrh)
	cat $(buildlh) dist/tree.js $(buildrh) > $@

dist/tree.js: $(sources)
	tsc -t ES5 $(sources) --out $@

clean:
	rm dist/*

coverage: $(target)
	istanbul cover -x "**/vendor/**" _mocha -- -R spec

coverall: $(target)
	istanbul cover -x "**/vendor/**" ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

test: $(target)
	npm test

doc: $(target)
	jsdoc2md build/immutable-quadtree.js > DOC.md
