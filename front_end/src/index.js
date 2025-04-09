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
import BookingContext from './context/BookingContext';
import AuthProvider from './context/AuthProvider';

// Danh sách tất cả Providers
const providers = [
  NotificationProvider,
  CategoryProvider,
  ActorsProvider,
  AuthorsProvider,
  CharacterProvider,
  LocationProvider,
  MovieProvider,
  TypeChairsProvider,
  ChairsProvider,
  CinemasProvider,
  RegionsProvider,
  FoodProvider,
  RoomsProvider,
  MovieScreenProvider,
  BookingContext,
  AuthProvider
];

// Hàm bọc `App` trong tất cả các Providers
const ProvidersWrapper = ({ children }) => {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvidersWrapper>
        <App />
      </ProvidersWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
