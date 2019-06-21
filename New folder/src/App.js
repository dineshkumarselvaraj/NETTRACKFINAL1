import React, { Component } from 'react';
import './App.css';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import Toggle from './toggle/Toggle';
import Increment from './toggle/Increment';

import logger from 'redux-logger'
import thunk from 'redux-thunk'
// Import the necessary methods for saving and loading
import { save, load } from "redux-localstorage-simple"
 
/*
    Saving to LocalStorage is achieved using Redux 
    middleware. The 'save' method is called by Redux 
    each time an action is handled by your reducer.
*/  
import { Redirect} from 'react-router';
import "./count.css";
import "./menu.css";

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import MovieList from './Homepage/MovieList';
import MovieDetail from './Homepage/MovieDetail';
import Login from './Components/Login/Login';
import menubar from './Homepage/menubar'
import SignUp from './Components/SignUp/SignUp';
import Main from './Homepage/main'
import About from './Homepage/about'
import MakeComplaint from './Homepage/MakeComplaint'
// import ComplaintGrid from './Components/ResolvedComplaints/ResolvedComplaints'

const middleware = [logger, thunk]
const store = createStore(rootReducer
  ,load()
  ,composeWithDevTools(applyMiddleware(...middleware,save()))
  )

  /*class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.props.isLogin === true?
              <Component {...props} /> :
              <Redirect to={{pathname :'/login', state:{ from: props.location }}}  />
          )} 
        />
      )
    }
  }*/

  function PrivateRoute({component: Component, isLogin, ...rest}) {
    return (
      <Route 
        {...rest}
        render={(props) => isLogin ===true
        ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: {from:props.location}}} />}
      />
    )
  }

class App extends Component {
  state={
    isLogin : false,
    isSignUp: false,
    isAbout:  false,
    isMakeComplaint: false
  }
   //proceed to next step
 login = ()=>{
   console.log('app')
  const {isLogin} = this.state;
  console.log(isLogin)
    this.setState({
      isLogin: true
    });
   
};
signup = ()=>{
  console.log('app')
 const {isSignUp} = this.state;
 console.log(isSignUp)
   this.setState({
    isSignUp: true
   });
  
};
About = ()=>{
  console.log('app')
 const {isAbout} = this.state;
 console.log(isAbout)
   this.setState({
    isAbout: true
   });
  
};
MakeComplaint = ()=>{
  console.log('app')
 const {isMakeComplaint} = this.state;
 console.log(isMakeComplaint)
   this.setState({
    isMakeComplaint: true
   });
  
};
Home = ()=>{
  console.log('app')
 const {isHome} = this.state;
 console.log(isHome)
   this.setState({
    isHome: true
   });
  
};
// ComplaintGrid = ()=>{
//   console.log('app')
//  const {isComplaintGrid} = this.state;
//  console.log(isComplaintGrid)
//    this.setState({
//     isComplaintGrid: true
//    });
  
// };


  render() {
    return (
      <Provider store={store} >
      <Router>
        <div className="App">
          {/* <h1>hello</h1>
          <Toggle />
          <br />
          <Increment /> */}
          {/* {this.state.isLogin} */}
          <br />
          <Switch>
             <Route exact path='/' component={menubar} /> 
            {/* <Route  path='/login' login={this.login} component={Login} /> */}
            <Route path='/Home'  render={(props) => <menubar Home={this.Home} {...props} />}/>
            <Route path='/login'  render={(props) => <Login login={this.login} {...props} />}/> 
            <Route path='/signup'  render={(props) => <SignUp signup={this.signup} {...props} />}/> 
            <Route path='/About'  render={(props) => <About About={this.About} {...props} />}/>
            {/* <Route path='/ComplaintGrid'  render={(props) => <ComplaintGrid ComplaintGrid={this.ComplaintGrid} {...props} />}/>  */}
            <Route path='/Works'  render={(props) => <MakeComplaint MakeComplaint={this.MakeComplaint} {...props} />}/> 
            <PrivateRoute isLogin={this.state.isLogin} path='/movie/:id' component={MovieDetail} />
            {/* <ProtectedRoute path='/movie/:id' component={MovieDetail} /> */}
            {/* <Route  path='/movie/:id' component={MovieDetail} /> */}
            
          </Switch>
          
        </div>
      </Router>
    </Provider>
    );
  }
}

export default (App);



/*
const hello = () => ({Welcome: "hello"})
const store = createStore(hello);
console.log(store.getState());

const defaultState = {
  welcome : 'hi'
  ,stuff: 'Some others'
  ,isLoggedIn : false
  ,name : 'Ram'
}
//reducer function

const greet = (state=defaultState, action) =>{
  console.log(action)
  const {type,name} = action
  switch(type){
    case "G_1" :
      return {...state, welcome: `hi 1 ${name}`,isLoggedIn:true};
      case "G_2" :
      return {...state, welcome: `hi 2`, name:name};
      default :
      return state;
  }
}

const store = createStore(greet);
const name = 'sundar'
store.dispatch({
  type: "G_1",
 name
})
console.log(store.getState());
store.dispatch({
  type: "G_2",
name
})
console.log(store.getState());
*/
