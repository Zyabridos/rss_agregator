install:
	npm ci
	
publish:
	npm publish --dry-run

develop:
	npx webpack serve
	
build:
	NODE_ENV=production npx webpack

lint:
	npx eslint .

test:
	npx jest