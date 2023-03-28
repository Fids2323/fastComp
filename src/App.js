import Users from "./layouts/users";
import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import EditUserPage from "./components/page/editUserPage";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:userId/edit"
                                component={EditUserPage}
                            />
                            <ProtectedRoute
                                path="/users/:userId"
                                component={Users}
                            />
                            <ProtectedRoute path="/users" component={Users} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" component={Main} />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
