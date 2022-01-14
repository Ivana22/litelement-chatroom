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

## Features

The library exposes a chat room UI, displaying two different "chat-rooms", each chat room includes a way to send comments and display a list of existing comments that updates when a new comment is sent or received
