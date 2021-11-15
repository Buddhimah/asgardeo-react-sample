import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

ReactDOM.render(
  <React.StrictMode>

<AuthProvider
        config={ {
            signInRedirectURL: "http://localhost:3000",
            signOutRedirectURL: "http://localhost:3000",
            clientID: "<Client ID>",
            serverOrigin: "https://api.asgardeo.io/t/<tenant domain>",
            scope: [ "openid","profile" ]
        } }
    >
       <App />
    </AuthProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
