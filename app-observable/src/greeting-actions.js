// import { put, takeEvery, call } from "redux-saga/effects";
import { from, of, concat } from "rxjs";
import { filter, mapTo, map, flatMap, catchError } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
const BACKEND_URL = "http://localhost:7000/greetings?slow";

function apiRequestStart(description) {
  return {
    type: "API_REQUEST_START",
    description
  };
}

function setGreetings(greetings) {
  return {
    type: "SET_GREETINGS",
    greetings
  };
}

// action
export function loadGreetings() {
  return {
    type: "LOAD_GREETINGS"
  };
}

function requestSuccess() {
  return {
    type: "API_REQUEST_SUCCESS"
  };
}

function requestFailure(error) {
  return {
    type: "API_REQUEST_FAILURE",
    error
  };
}

async function fetchGreetings() {
  const response = await fetch(BACKEND_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

// (https://github.com/redux-observable/redux-observable/issues/62#issuecomment-266337873)
// 👉https://github.com/redux-observable/redux-observable/issues/62#issuecomment-405112422
function loadGreetingsEpic(action$) {
  return action$.pipe(
    ofType("LOAD_GREETINGS"),
    flatMap(() =>
      concat(
        of(apiRequestStart("Loading")),
        from(fetchGreetings()).pipe(map(greetings => setGreetings(greetings))),
        of(requestSuccess())
      ).pipe(catchError(err => of(requestFailure(err))))
    )
  );
}

async function postGreeting(greeting) {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(greeting)
  });
  if (response.status !== 201) {
    throw new Error("Invalid status code: " + response.status);
  }
  return response.json();
}

function addGreeting(newGreeting) {
  return {
    type: "ADD_GREETING",
    greeting: newGreeting
  };
}

function saveGreetingsEpic(action$) {
  return action$.pipe(
    ofType("SAVE_GREETING"),
    flatMap(action =>
      concat(
        of(apiRequestStart("Saving")),
        from(postGreeting(action.newGreeting)).pipe(
          map(savedGreeting => addGreeting(savedGreeting))
        ),
        of(requestSuccess())
      ).pipe(catchError(err => of(requestFailure(err))))
    )
  );
}

export function saveGreeting(newGreeting) {
  return {
    type: "SAVE_GREETING",
    newGreeting
  };
}

const pingEpic = action$ => {
  return action$.pipe(
    // every actions comes in here (stream of actions)
    filter(action => {
      // console.log("action", action);
      return action.type === "PING";
    }),
    mapTo({ type: "PONG" })
  );
};

const pongEpic = action$ =>
  action$.pipe(
    ofType("PONG"),
    mapTo({ type: "BOOM" })
  );

export const greetingEpic = combineEpics(pingEpic, pongEpic, loadGreetingsEpic, saveGreetingsEpic);
