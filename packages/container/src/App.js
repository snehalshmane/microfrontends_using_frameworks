import React, {Suspense, useEffect, useState} from "react";
import Header from "./components/Header";
import Progress from "./components/Progress";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {createGenerateClassName} from "@material-ui/core/styles";
import {StylesProvider} from "@material-ui/core";
import {createBrowserHistory} from 'history';

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'));
const AuthLazy = React.lazy(() => import('./components/AuthApp'));
const DashboardLazy = React.lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({productionPrefix: "co"});
const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                        </Route>
                        <Route path="/dashboard">
                            {!isSignedIn && <Redirect to="/"/>}
                            <DashboardLazy/>
                        </Route>
                        <Route path="/">
                            <MarketingLazy/>
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </Router>
}