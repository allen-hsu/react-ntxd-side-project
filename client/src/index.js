import React from "react";
import ReactDOM from "react-dom";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

// examples:
import Home from "./pages/Home";

// styles
import "./index.css";

//components
import App from "./App";

//utils
import * as serviceWorker from "./serviceWorker";
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// ReactDOM.render(<App />, document.getElementById('root'));
const defaultPath = process.env.REACT_APP_BASE_PATH;
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App>
        <Switch>
          <Route exact path={defaultPath} component={Home} />
          {/* New examples here */}
          {/* <Route path={`${defaultPath}default`} component={Main} /> */}
          {/* <Route path={`${defaultPath}searchbox`} component={SearchBox} />
        <Route path={`${defaultPath}autocomplete`} component={Autocomplete} />
        <Route
          path={`${defaultPath}marker-info-window`}
          component={MarkerInfoWindow}
        />
        <Route
          path={`${defaultPath}marker-info-window-gmaps-obj`}
          component={MarkerInfoWindowGmapsObj}
        /> */}
          <Redirect exact from="*" to={defaultPath} />
        </Switch>
      </App>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
