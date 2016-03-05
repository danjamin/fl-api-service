# NOT MAINTAINED

# fl-api-service [![Build Status](https://travis-ci.org/danjamin/fl-api-service.svg)](https://travis-ci.org/danjamin/fl-api-service)

## USE

### install

Note: this is still in development and not registered to **npm** yet.
      So keep this in mind and install via the Git URL for now.

```sh
$ npm install --save https://github.com/danjamin/fl-api-service.git#0.2.0
```

### example

Configure your API endpoint

```js
import {config} from 'fl-api-service';

config.setEndpoint('/api-path');
```

Do a `GET` or `DELETE` request without a body

```js
import {GET, METADATA_KEY} from 'fl-api-service';

// this will GET /api-path/movies in this case
GET('/movies').then(function (movies) {
  // do something with movies ...

  // you can also inspect the XHR object
  console.log( movies[METADATA_KEY].xhr );

  // return data for promise chaining
  return movies;
});
```

Do a `PATCH`, `POST`, or `PUT` request with a **body**

```js
import {PATCH} from 'fl-api-service';

// this will post an `application/json` body
PATCH('/movies/5', { title: 'Foo' }).catch(function (xhr) {
  // note: xhr is most likely the XHR object (with NON 200 status), but if something went
  // terribly wrong could be the error that went wrong
  if (xhr.hasOwnProperty('status')) {
    console.log( xhr.status );
  }
});
```

You can also directly use `resolve` and `reject` -- if you need to

## DEVELOP

### pre-reqs

Install node packed with npm >=2.0 and <3.0

### install dependencies

```sh
$ npm install -g jshint@2.8.0 mocha@2.3.3 babel@5.8.29 broccoli-cli@1.0.0
```

```sh
$ npm install
```

### linting

```sh
$ npm run lint
```

### testing

```sh
$ npm test
```

### ongoing testing

```sh
$ ./scripts/transpile watch
```

then in a separate shell (each time):

```sh
$ ./scripts/test
```

optionally you can filter the tests:

```sh
$ ./scripts/test fl-api-service
```

### building

```sh
$ npm run build
```

update **package.json** version, tag semver, and push to origin

