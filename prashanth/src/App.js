import React, { Component } from 'react';
import { createStore ,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import './App.css';
// import Toggle from './toggle/Toggle';
// import Home from './components/Home'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
import {save, load} from 'redux-localstorage-simple'
import DashBoard from './components/DashBoard'
//logger
import thunk from 'redux-thunk'
import logger from 'redux-logger';
// import Popup from './components/Popup';
import CreateTicket from './TicketForms/CreateTicket';
import CheckStatusForm from './TicketForms/CheckStatusForm';
import MaterialUiForm from './TicketForms/MaterialUiForm';
import { CheckStatus } from './TicketForms/CheckStatus';
import MySupport from './components/MySupport'
//Movie APP
// import MovieList from './movies/MovieList';
// import MovieDetails from './movies/MovieDetails';

const middleware = [logger,thunk]

const store = createStore(
  rootReducer,
load(),
  composeWithDevTools(applyMiddleware(...middleware,save())));

class App extends Component {

  render() {
    return (
      <Provider store ={store}>
      <Router>
      <div className="App">
        {/* <h1> Hello </h1> */}
        {/* <Popup/> */}
        
        {/* <Home/>
        <Toggle/>
        <Switch>
            <Route exact path = "/" component = {MovieList} ></Route>
            <Route exact path = "/:id" component = {MovieDetails} ></Route>
        </Switch> */}
        <MySupport />
        {/* <DashBoard/> */}
        {/* <Route exact path = "/" component = {DashBoard} ></Route> */}
            {/* <Route  path = "/CreateTicket" component = {CreateTicket} ></Route>
            <Route  path = "/MaterialUiForm" component = {MaterialUiForm} ></Route>
            <Route  path = "/checkStatus" component = {CheckStatus} ></Route>
            <Route  path = "/CheckStatusForm" component = {CheckStatusForm} ></Route> */}
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
