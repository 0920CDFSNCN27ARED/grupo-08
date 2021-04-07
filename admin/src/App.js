import './assets/scss/normalize.scss';

import { Route, Switch } from 'react-router-dom';

// Layouts
import HomeLayout from './layouts/HomeLayout';

// Pages
import Homepage from './pages/Homepage'

// Components
import Header from './components/Header';

const App = (props) => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" render={() => (
                    <HomeLayout>
                        <Homepage />
                    </HomeLayout>
                )} />
            </Switch>
        </>
    );
};

export default App;
