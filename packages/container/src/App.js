import React, {Suspense} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createGenerateClassName} from "@material-ui/core/styles";
import {StylesProvider} from "@material-ui/core";

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'));
const AuthLazy = React.lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({productionPrefix: "co"});

export default () => {
    return <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/auth" component={AuthLazy}/>
                        <Route path="/" component={MarketingLazy}/>
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </BrowserRouter>
}