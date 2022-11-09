import React, { useContext, useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';

type Shop = {
  id: string;
  name: string;
  domain: string;
  email: string;
  [key: string]: any;
};

const context = React.createContext<{ shop: Shop }>(null);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appBridge = useAppBridge();
  const [shop, setShop] = useState<Shop>(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    async function fetchShop() {
      if (!appBridge) return;
      const sessionToken = await getSessionToken(appBridge);
      const res = await fetch('/api/shopify/shop', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) {
        const redirect = Redirect.create(appBridge);
        redirect.dispatch(Redirect.Action.REMOTE, `${window.location.origin}/api/shopify?shop=${params.shop}`);
        return;
      } else if (res.status >= 400) {
        const error = await res.json();
        console.error('Error fetching shop', res.status, error);
        return;
      }
      const shop = await res.json();
      setShop(shop);
    }
    fetchShop();
  }, [appBridge]);

  if (!shop) return null;

  return <context.Provider value={{ shop }}>{children}</context.Provider>;
};

export const useShop = () => useContext(context).shop;
