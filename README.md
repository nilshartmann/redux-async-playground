# Redux Playground: Comparsion of different Redux async frameworks

This repository contains the same application implemented using different "async frameworks" for redux.

The frontends are implemented with React, Redux, react-redux.

The differences between the examples and underlying frameworks only affect:

- setting up the store (`store.js`)
- action creator (`greeting-actions.js`)

Consuming state and dispatching actions from the application does not differ. (Note that the examples
using React and Redux Hooks API)

## Setup

The applications contain with a simple Express backend, that you have to start first:

```bash
cd server
npm install
npm start
```

The server runs on port 7000. So make sure, this port is not in use.

## Thunk example

**Folder:** `app-thunk`

```bash
cd server
npm install
npm start
```

This frontend runs on `http://localhost:8085`. So make sure, port 8085 is not in use.

## Redux Saga example

**Folder:** `app-saga`

```bash
cd server
npm install
npm start
```

This frontend runs on `http://localhost:8087`. So make sure, port 8087 is not in use.
