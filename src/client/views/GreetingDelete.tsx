import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Page, TextContainer } from '@shopify/polaris';
import { useSessionToken } from '../context';

const GreetingDelete: React.FC = () => {
  const sessionToken = useSessionToken();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const history = useHistory();

  return (
    <Page
      title={`Delete Greeting #${id}`}
      breadcrumbs={[
        {
          content: 'Back',
          onAction: () => history.goBack(),
        },
      ]}
      narrowWidth
    >
      <Card
        sectioned
        primaryFooterAction={{
          content: 'Delete',
          destructive: true,
          onAction: async () => {
            const res = await fetch(`/api/greetings/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
              },
            });
            if (res.ok) {
              history.push('/');
            }
          },
        }}
        secondaryFooterActions={[
          {
            content: 'Cancel',
            onAction: () => {
              history.goBack();
            },
          },
        ]}
      >
        <TextContainer>Are you sure you want to delete this greeting?</TextContainer>
      </Card>
    </Page>
  );
};

export default GreetingDelete;
