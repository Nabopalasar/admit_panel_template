import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';

// что включенно в Redux Tool Kit
// https://redux-toolkit.js.org/introduction/getting-started#whats-included

//  cra-template-redux
// https://github.com/reduxjs/cra-template-redux

// configureStore
// https://redux-toolkit.js.org/api/configureStore


const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;