import { Route, Router, Switch, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import Home from "pages/Home";
import Project from "pages/Project";
import history from "lib/history";
import QuPathDownloadReminder from "components/notifications/QuPathDownloadReminder";
import Slugs from "lib/slugs";
import { useEffect } from "react";

const App = () => {
    return (
        <Router history={history}>
            <div className="App mx-auto font-mono h-screen bg-gray-100">
                <ToastContainer />

                <QuPathDownloadReminder />

                <Switch>
                    <Route path={[
                        "/host/:host/:organization/:project/:slide",
                        "/host/:host/:organization/:project",
                        "/:organization/:project/:slide",
                        "/:organization/:project",
                    ]}>
                        <Project />
                    </Route>
                    
                    <Route path={[
                        "/host/:host/:organization",
                        "/host/:host",
                        "/:organization",
                        "/"
                    ]}>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
