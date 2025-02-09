import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import store from './utils/store.ts';

import { Provider } from 'react-redux';

import { Auth0Provider } from '@auth0/auth0-react';

const domain = "https://dev-j0zlk7gogm1b2ben.us.auth0.com";
const clientId = "ffe47fxGRhuze07vSOfbagpinW4Hnz0w";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: "http://localhost:3001",
        redirect_uri: "http://localhost:3000",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode >,
)
