import {createStore, applyMiddleware, compose} from "redux";
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({
  trace: true,
  traceLimit: 25,
})) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(createStateSyncMiddleware({}))),
);

sagaMiddleware.run(rootSaga);
initMessageListener(store);
export default store;
