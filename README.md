# LiveLike WebSDK Code Challenge

The objective of this code challenge is to create a library that exposes chat room Web Components with a chat API service.

## Usage

To start the development environment

```bash
$ npm install
$ BIND=127.0.0.1 npm run dev
```

Then open `localhost:8000` in your browser.

### Details

This project uses [LitElement](https://lit-element.polymer-project.org/guide), which is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) library.

The `rollup.config.js` contains the [Rollup](https://rollupjs.org/guide/en/) configuration for building the bundle.

The `db.json` file is the "database" for the project that contains all of the starting data.

The `server.js` file creates a server using the `db.json` file as the data, and is accessible through `localhost:3000`.

The `/public/index.html` is the file that will be served by the server, and available on `localhost:8000`.

When running `npm run dev`, Rollup will bundle all of your code into a single file `index.js` that will be placed in `/public`.

## Requirements

The library should expose a chat room UI

1. It should display a list of existing comments that updates when a new comment is sent or received.
2. It should not display any comments that have been deleted.
3. It should include a way to send comments.
4. It should include a way to switch between different "chat rooms" list of comments.

The library should expose methods:

1. To get lists of comments.
2. To create and delete individual comments.
3. To get and create users.

Add TypeScript interfaces/types to exposed methods.

## Steps To Submit Assignment

1. Fork the repository
2. Add the commits to the forked repo
3. Raise a PR from forked repo
