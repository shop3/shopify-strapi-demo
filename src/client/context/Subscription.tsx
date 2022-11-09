import React, { useContext, useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';

type Subscription = {
  id: number;
  status: string;
  [key: string]: any;
};

const context = React.createContext<{ subscription: Subscription }>(null);

const appName = process.env.SHOPIFY_APP_NAME || '';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appBridge = useAppBridge();
  const [subscription, setSubscription] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    async function fetchSubscription() {
      if (!appBridge) return;
      const sessionToken = await getSessionToken(appBridge);
      const res = await fetch('/api/shopify/subscription', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) {
        const redirect = Redirect.create(appBridge);
        redirect.dispatch(Redirect.Action.REMOTE, `${window.location.origin}/api/shopify?shop=${params.shop}`);
        return;
      } else if (res.status === 404) {
        const resSub = await fetch(`/api/shopify/subscription?returnUrl=https://${params.shop}/admin/apps/${appName}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: 1,
          }),
        });
        if (resSub.status < 400) {
          const { confirmationUrl } = await resSub.json();
          const confirmationPath = confirmationUrl.replace(`https://${params.shop}/admin`, '');
          const redirect = Redirect.create(appBridge);
          redirect.dispatch(Redirect.Action.ADMIN_PATH, {
            path: confirmationPath,
          });
          return;
        } else {
          const error = await res.json();
          console.error('Error creating subscription', res.status, error);
          return;
        }
      } else if (res.status >= 400) {
        const error = await res.json();
        console.error('Error fetching the subscription', res.status, error);
        return;
      }
      const subscription = await res.json();
      setSubscription(subscription);
    }
    fetchSubscription();
  }, [appBridge]);

  if (!subscription) return null;

  return <context.Provider value={{ subscription }}>{children}</context.Provider>;
};

export const useSubscription = () => useContext(context).subscription;
