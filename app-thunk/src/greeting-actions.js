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

export function loadGreetingsFromServer() {
  return async dispatch => {
    dispatch(apiRequestStart("Loading"));
    fetchGreetings(BACKEND_URL).then(
      greetingsLoaded => {
        dispatch(setGreetings(greetingsLoaded));
        dispatch(requestSuccess());
      },
      error => dispatch(requestFailure(error))
    );
  };
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

export function saveGreeting(newGreeting) {
  return async dispatch => {
    dispatch(apiRequestStart("Saving"));
    return postGreeting(newGreeting).then(
      greeting => {
        dispatch(requestSuccess());
        dispatch(addGreeting(greeting));
      },
      error => dispatch(requestFailure(error))
    );
  };
}
