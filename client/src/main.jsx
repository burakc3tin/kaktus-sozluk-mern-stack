import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Welcome from './pages/Welcome.jsx';
import EntryDetail from './components/EntryDetail.jsx';
import AddEntry from './components/AddEntry.jsx';
import AddEntryComment from './pages/AddEntryComment.jsx';
import UpdateEntry from './pages/UpdateEntry.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import { store } from '../src/redux/store.js'
import { Provider } from 'react-redux'
  import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Notifications from './pages/Notifications.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/giris",
    element: <Login/>,
  },
  {
    path: "/kayit",
    element: <Register/>,
  },
  {
    path: "/anasayfa",
    element: <Welcome/>,
  },
  {
    path: "/entrydetay/:id",
    element: <EntryDetail/>,
  },
  {
    path: "/addentry",
    element: <AddEntry/>
  },
  {
    path: "/addentrycomment",
    element: <AddEntryComment/>,
  },
  {
    path: "/updatedentry/:id",
    element: <UpdateEntry/>,
  },
  {
    path: "/profil",
    element: <Profile/>,
  },
  {
    path: "/bildirimler",
    element: <Notifications/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>

  <PrimeReactProvider>

  <React.StrictMode>
       <RouterProvider router={router} />

  </React.StrictMode>
  </PrimeReactProvider>
  </Provider>

 
,
)
