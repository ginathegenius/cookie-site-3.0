// import { Authenticator } from '@aws-amplify/ui-react';
// import { Amplify } from 'aws-amplify';
// import outputs from '../amplify_outputs.json';
// import '@aws-amplify/ui-react/styles.css';
import './App.css'
import React from "react";
import "./App.css";
import Routing from './Routing';
import 'bootstrap/dist/css/bootstrap.min.css';

// Amplify.configure(outputs);

export default function App({ Component, pageProps }) {
  return (



      <div className="App">
        <nav className="navbar navbar-dark bg-dark custom-navbar" style={{ backgroundColor: '#fadsd3' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Cookie Catalog</a>
          </div>
        </nav>
        <div>
          <Routing/>
        </div>
      </div>
      )};