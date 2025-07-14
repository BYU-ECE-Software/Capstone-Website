import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const waitForCustomElement = () => {
  return new Promise<void>((resolve) => {
    // Wait until customElements has defined the BYU header
    const checkDefined = () => {
      if (customElements.get('byu-header')) {
        resolve();
      } else {
        requestAnimationFrame(checkDefined);
      }
    };
    checkDefined();
  });
};


waitForCustomElement().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render( // this had <App/> wrapped in <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
