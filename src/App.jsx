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
            <a className="navbar-brand" href="/">Gina's Cookie Site</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link cookie-library" href="/cookie-library">Cookie Library</a>
                {/* <a className="nav-link" href="/voting">Voting</a>
                <a className="nav-link" href="/leaderboard">Leaderboard</a> */}
              </div>
              {/* <button onClick={signOut}>Sign out</button> */}
            </div>
          </div>
        </nav>
        <div>
          <Routing/>
        </div>
      </div>
      )};