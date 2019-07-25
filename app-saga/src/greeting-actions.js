import { put, takeEvery, call } from "redux-saga/effects";

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

function* loadGreetingsFromServer() {
  yield put(apiRequestStart("Loading"));
  let greetingsLoaded;
  try {
    greetingsLoaded = yield call(fetchGreetings, BACKEND_URL);
  } catch (err) {
    yield put(requestFailure(err));
    return;
  }
  yield put(setGreetings(greetingsLoaded));
  yield put(requestSuccess());
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

export function* saveGreetingToServer(action) {
  yield put(apiRequestStart("Saving"));
  let savedGreeting;
  try {
    savedGreeting = yield call(postGreeting, action.newGreeting);
  } catch (error) {
    yield put(requestFailure(error));
    return;
  }

  yield put(requestSuccess());
  yield put(addGreeting(savedGreeting));
}

export function saveGreeting(newGreeting) {
  return {
    type: "SAVE_GREETING",
    newGreeting
  };
}

// saga
// Note: normally we'd split Sagas and Actions
// but to make the code better comparable between the
// frameworks, we use the same file structure
export function* greetingSagas() {
  yield takeEvery("LOAD_GREETINGS", loadGreetingsFromServer);
  yield takeEvery("SAVE_GREETING", saveGreetingToServer);
}
