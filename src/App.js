import React from 'react';
import './App.css';
import Footer from "./components/layout/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./components/layout/Navbar";
import {Provider} from "react-redux";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import {logoutUser, setCurrentUser} from "./actions/authActions";

function App() {
    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logoutUser());
            // Clear current Profile
            // store.dispatch(clearCurrentProfile());
            // Redirect to login
            window.location.href = "/login";
        }
    }
    return (<Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
