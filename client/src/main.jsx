import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  
  Route,
  Routes,
 
} from "react-router-dom";import { PrimeReactProvider } from 'primereact/api';
import App from './App.jsx';
import './index.css';
import Login from './pages/Login.jsx';
import Welcome from './pages/Welcome.jsx';
import EntryDetail from './components/EntryDetail.jsx';
import AddEntry from './components/AddEntry.jsx';
import AddEntryComment from './pages/AddEntryComment.jsx';
import UpdateEntry from './pages/UpdateEntry.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';
import { store } from '../src/redux/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PrimeReactProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<Register />} />
            <Route path="/anasayfa" element={<Welcome />} />
            <Route path="/entrydetay/:id" element={<EntryDetail />} />
            <Route path="/addentry" element={<AddEntry />} />
            <Route path="/addentrycomment" element={<AddEntryComment />} />
            <Route path="/updatedentry/:id" element={<UpdateEntry />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/bildirimler" element={<Notifications />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </PrimeReactProvider>
  </Provider>,
);
