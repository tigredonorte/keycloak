import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import './App.css';

const callSecuredEndpoint = async (keycloak: Keycloak.KeycloakInstance | null) => {
  if (!keycloak?.token) {
    console.error('No token available');
    return;
  }

  try {
    await keycloak.updateToken(5);
    const response = await fetch('http://api.localhost/secured', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include the access token in the Authorization header
        'Authorization': 'Bearer ' + keycloak.token,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling secured endpoint:', error);
  }

};

function App() {
  const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [securedData, setSecuredData] = useState<string>('');

  const callEndpoint = async () => {
    const data = await callSecuredEndpoint(keycloak);
    if (data) {
      setSecuredData(data);
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
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      setAuthenticated(authenticated);
      setError(!authenticated);
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
        <button onClick={() => callEndpoint()}>Call Secured Endpoint</button>
        {securedData ? (
          <div>
            <h4>Secured Data from Backend:</h4>
            <p>{securedData}</p>
          </div>
        ) : (
          <p>Loading secured data...</p>
        )}
      </div>
    </>
  );
}

export default App;
