import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import PO from './Component/PO';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

ReactDOM.render(
<Router>
<MuiThemeProvider muiTheme={getMuiTheme()}>
    <App />
    </MuiThemeProvider>
</Router>, document.getElementById('root'));
// ReactDOM.render(<PO />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
