import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory} from 'history';

const mount = (el, {
    onNavigate,
}) => {
    const history = createMemoryHistory();
    history.listen(onNavigate);

    ReactDOM.render(
        <App history={history}/>,
        el
    );
};

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector("#_marketing-dev-root");
    if (el) {
        mount(el);
    }
}

export {mount};