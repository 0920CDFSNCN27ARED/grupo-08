import './assets/scss/normalize.scss';

import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';

const App = (props) => {
    return (
        <>
            <Header />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        'sadsadsa';
                    }}
                />
            </Switch>
        </>
    );
};

export default App;
