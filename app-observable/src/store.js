import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import greetingApp from "./reducers";
import { greetingEpic } from "./greeting-actions";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const store = createStore(greetingApp, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(greetingEpic);

export default store;
