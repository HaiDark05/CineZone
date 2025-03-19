import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import CategoryProvider from './context/CategoryProvider';
import ActorsProvider from './context/ActorsProvider';
import AuthorsProvider from './context/AuthorsProvider';
import CharacterProvider from './context/CharacterProvider';
import LocationProvider from './context/LocationProvider';
import MovieProvider from './context/MovieProvider';
import TypeChairsProvider from './context/TypeChairsProvider';
import ChairsProvider from './context/ChairsProvider';
import CinemasProvider from './context/CinemasProvider';
import RegionsProvider from './context/RegionsProvider';
import FoodProvider from './context/FoodProvider';
import RoomsProvider from './context/RoomsProvider';
import MovieScreenProvider from './context/MovieScreenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <CategoryProvider>
          <ActorsProvider>
            <AuthorsProvider>
              <CharacterProvider>
                <LocationProvider>
                  <MovieProvider>
                    <TypeChairsProvider>
                      <ChairsProvider>
                        <CinemasProvider>
                          <RegionsProvider>
                            <FoodProvider>
                              <RoomsProvider>
                                <MovieScreenProvider>
                                  <App />
                                </MovieScreenProvider>
                              </RoomsProvider>
                            </FoodProvider>
                          </RegionsProvider>
                        </CinemasProvider>
                      </ChairsProvider>
                    </TypeChairsProvider>
                  </MovieProvider>
                </LocationProvider>
              </CharacterProvider>
            </AuthorsProvider>
          </ActorsProvider>
        </CategoryProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
