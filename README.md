# Website of map to canada

[https://maptocanada.ca](https://maptocanada.ca)

## For Developer

* MacOS/Linux is required
* Docker and docker-compose are required

### Backend

Start backend with docker container

1. Create the dev-container: `./dev backend`
2. Install Python dependencies: `pipenv install` (Only first time or after git-pull)
3. Start Django in the dev-container: `./dev run`

Create Superuser:

`pipenv run python3 manage.py createsuperuser`

Access By http:

* backend: http://localhost:8000/[language]/
* DRF interface: http://localhost:8000/[language]/api

Language Code:

* en-us
* zh-hans

Other commands:
* Install new pip package: `pipenv install <package-name>`
* Entry the pipenv: `pipenv shell`
* Create database migrations: `./dev makemigrations`
* Migrate the dev-database: `./dev migrate`
* Run Django test: `./dev test`
* Run Coverage: `./dev coverage`
* Create i18n .po file: `./dev mkmsg`
* Complie i18n .po file to .mo file: `./dev comsg`

### Frontend

For container development:

1. Create the container: `./dev frontend`
2. Re-install PNP pakcages by Yarnpkg: `yarn install`
3. Start Webpack dev-server: `yarn start`

For native development:

(Nodejs installed is required)

If yarnpkg is not installed: `npm install -g yarn`

1. `yarn install`
2. `yarn start`

Access:

http://localhost:9000/ 

Other commands:

Install new package: `yarn add [-D] <package-name>@version`

### Recycle development container

`./dev down`

### Docker hub

https://hub.docker.com/u/map2canada