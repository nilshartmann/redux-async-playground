import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import greetingApp from "./reducers";
import { greetingSagas } from "./greeting-actions";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const store = createStore(greetingApp, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(greetingSagas);

export default store;
