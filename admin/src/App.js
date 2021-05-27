import './assets/scss/normalize.scss';

import { Route, Switch } from 'react-router-dom';

// Layouts
import HomeLayout from './layouts/HomeLayout';
import CreateUpdateLayout from './layouts/CreateUpdateLayout';

// Pages
import Homepage from './pages/Homepage';
import CreateUpdatePage from './pages/CreateUpdatePage';

// Components
import Header from './components/Header';

const App = (props) => {
    return (
        <>
            <Header />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <HomeLayout>
                            <Homepage />
                        </HomeLayout>
                    )}
                />

                <Route
                    path="/admin/employees/crear-rol"
                    render={() => (
                        <CreateUpdateLayout>
                            <CreateUpdatePage />
                        </CreateUpdateLayout>
                    )}
                />
            </Switch>
        </>
    );
};

export default App;
