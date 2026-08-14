import React, {Suspense, useState} from "react";
import Header from "./components/Header";
import Progress from "./components/Progress";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createGenerateClassName} from "@material-ui/core/styles";
import {StylesProvider} from "@material-ui/core";

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'));
const AuthLazy = React.lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({productionPrefix: "co"});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                        </Route>
                        <Route path="/">
                            <MarketingLazy/>
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </BrowserRouter>
}