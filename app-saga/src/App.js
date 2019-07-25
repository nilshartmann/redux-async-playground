import React from "react";
import GreetingController from "./GreetingController";
import Counter from "./Counter";
import Chart from "./Chart";

import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "./LoadingIndicator";

import { loadGreetings } from "./greeting-actions";

export default function App() {
  const dispatch = useDispatch();
  const isRequestRunning = useSelector(state => state.greetings.requestRunning);
  const requestDescription = useSelector(state => state.greetings.requestDescription);
  const loadingError = useSelector(state => state.greetings.error);

  React.useEffect(() => {
    dispatch(loadGreetings());
  }, [dispatch]);

  if (loadingError) {
    return (
      <div className="Main">
        <div className="Title">
          <h1>Greeting App</h1>
        </div>
        <h1>Error while loading data!</h1>
        <p>{loadingError.toString()}</p>
        <button onClick={() => dispatch(loadGreetings())}>Try again</button>
      </div>
    );
  }

  if (isRequestRunning) {
    return (
      <div className="Main">
        <div className="Title">
          <h1>Greeting App</h1>
        </div>
        <LoadingIndicator label={requestDescription} />
      </div>
    );
  }

  return (
    <div className="Main">
      <div className="Title">
        <h1>Greeting App</h1>
        <Counter />
      </div>
      <div className="Left">
        <GreetingController />
      </div>
      <div className="Right">
        <Chart />
      </div>
      <button onClick={() => dispatch({ type: "LOAD_GREETINGS", x: "fasdfd", y: 123 })}>
        Load
      </button>
    </div>
  );
}
