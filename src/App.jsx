// import { Authenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import outputs from '../amplify_outputs.json';
// import '@aws-amplify/ui-react/styles.css';
import './App.css'
import React from "react";
import "./App.css";
import Routing from './Routing';
import { NavLink } from 'react-router-dom';

// Amplify.configure(outputs);

export default function App({ Component, pageProps }) {
  return (



      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Cookie Catalog</a>
          </div>
        </nav>
        <div>
          <Routing/>
        </div>
      </div>
      )};