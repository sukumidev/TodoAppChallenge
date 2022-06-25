# TodoAppChallenge
MongoDB/Express/React/Node.Js Todo App

## clone or download
```terminal
$ https://github.com/sukumidev/TodoAppChallenge.git
$ npm i
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd frontend  // go to client frontend folder
$ npm i       // npm install packages
$ npm run dev // run it locally
// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 4000)
### Start

```terminal
$ cd backend  // go to server folder
$ npm i       // npm install packages
$ node index.js // run it locally
```
