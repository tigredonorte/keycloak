import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import './App.css';

const decodeToken = (token?: string) => {
  if (!token) {
    return null;
  }

  const base64Url = token.split('.')[1]; // Get the payload part of the token
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


const refreshToken = async (keycloak: Keycloak.KeycloakInstance) => {
  try {
    const refreshed = await keycloak.updateToken(5);
    if (refreshed) {
      console.log('Token refreshed');
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
}

const callSecuredEndpoint = async (keycloak: Keycloak.KeycloakInstance | null) => {
  if (!keycloak?.token) {
    throw new Error('Keycloak token is missing');
  }

  await refreshToken(keycloak);
  const response = await fetch('http://api.localhost/secured', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + keycloak.token,
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;

};

function App() {
  const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [securedData, setSecuredData] = useState<{ loading: boolean; error: string; data: string }>({ loading: false, error: '', data: '' });

  const callEndpoint = async () => {
    try {
      setSecuredData({ loading: true, error: '', data: '' });
      const data = await callSecuredEndpoint(keycloak);
      if (data) {
        setSecuredData({ loading: false, error: '', data });
      }
    } catch (error) {
      setSecuredData({ loading: false, error: error instanceof Error ? error?.message: `${error}`, data: '' });
    }
  }

  useEffect(() => {
    const keycloakInstance = new Keycloak({
      url: 'http://auth.localhost/',
      realm: 'myrealm',
      clientId: 'frontend-client',
    });

    setKeycloak(keycloakInstance);
  }, []);

  useEffect(() => {
    if (!keycloak || authenticated && !error) {
      return;
    }
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      setAuthenticated(authenticated);
      setError(!authenticated);

      if (authenticated && keycloak.token) {
        const decodedToken = decodeToken(keycloak.token);
        console.log('Decoded token:', decodedToken);
      }
    }).catch(error => {
      console.error('Keycloak initialization error:', error);
    });
  }, [keycloak, authenticated, error]);


  if (error) {
    return <div>Unable to authenticate!</div>;
  }

  if (!keycloak) {
    return <div>Initializing Keycloak...</div>;
  }

  return (
    <>
      <div>
        <h3>Welcome, {keycloak.tokenParsed?.preferred_username}!</h3>
        <p>You are authenticated with Keycloak.</p>
        <button onClick={() => keycloak.logout()}>Logout</button>
        <button onClick={() => window.open(keycloak.createAccountUrl(), '_blank')}>Edit Profile</button>
        {securedData.error ? (
          <>
            <p>Error fetching secured data: {securedData.error}</p>
            <button onClick={() => callEndpoint()}>Try again</button>
          </>
        ) : securedData.loading ? (
          <p>Loading secured data...</p>
        ) : securedData.data ? (
          <p>Secured data: {securedData.data}</p>
        ) : (
          <button onClick={() => callEndpoint()}>Call Secured Endpoint</button>
        )}
      </div>
    </>
  );
}

export default App;
