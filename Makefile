.PHONY: fresh node pull

fresh: pull node

pull:
	@git pull

node:
	@yarn
	@yarn build
