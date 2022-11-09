import React, { useContext, useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

type Session = {
  token: string;
};

const context = React.createContext<Session>(null);

type Props = {
  children: React.ReactNode;
};

export const SessionProvider: React.FC<Props> = ({ children }) => {
  const appBridge = useAppBridge();
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    async function getSession() {
      const token = await getSessionToken(appBridge);
      setSession({ token });
      const parsedToken = parseJwt(token);
      timeout = setTimeout(() => {
        getSession();
      }, parsedToken.exp * 1000 - Date.now() - 5000);
    }
    getSession();
    return () => {
      clearTimeout(timeout);
    };
  }, [appBridge]);

  if (session && session.token) {
    return <context.Provider value={session}>{children}</context.Provider>;
  }

  return null;
};

export const useSessionToken = () => useContext(context).token;

function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}
