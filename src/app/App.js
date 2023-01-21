import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path='/users/:userId?' component={Users}/>
                <Route path='/login' component={Login}/>
                <Route path='/' exact component={Main}/>
                <Redirect to = '/'/>
            </Switch>
        </div>
    );
}

export default App;
