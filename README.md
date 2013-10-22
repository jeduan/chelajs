## Getting started

Running ChelaJs repo

    npm install

ChelaJs uses LevelDb as Database and session store, so no extra dependencies are needed, just node modules.

### Setting Github keys

Chela Js uses github as log in, we are developers after all.

Copy sample config to config folder and add a github keys to sample

	mkdir config
	cp config-sample.json config/dev.json

Create your github keys [here](https://github.com/settings/applications/new)

Use http://chelajs-dev.com:3000/auth/github/callback as callback url.

You can add this to your host file(sudo vim/nano /etc/hosts)

	127.0.0.1  chelajs-dev.com

So you can develop with the oauth easier

### Template

Swig.js is used for the template engine, check documentation [here](http://paularmstrong.github.io/swig/docs/).

### Helping with the style

For help with styles, stylus + nib

	npm install stylus -g
	npm install nib -g

Then run

	stylus -u nib -w -c -o css/ stylus/*.styl
