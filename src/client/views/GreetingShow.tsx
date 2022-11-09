import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Layout, TextContainer } from '@shopify/polaris';
import { StrapiShowImage, StrapiShowPage, StrapiShowText, StrapiShowTitle } from '@shop3/polaris-strapi';
import { useSessionToken } from '../context';

const GreetingShow: React.FC = () => {
  const sessionToken = useSessionToken();
  const location = useLocation();
  const id = location.pathname.split('/').pop();

  return (
    <StrapiShowPage
      resourceUrl={`/api/greetings/${id}`}
      titleField="title"
      authToken={sessionToken}
      breadcrumbs={[{ content: 'Greetings', url: '/' }]}
      primaryAction={{
        content: 'Edit',
        url: `/edit/${id}`,
      }}
      secondaryActions={[
        {
          content: 'Delete',
          url: `/delete/${id}`,
        },
      ]}
    >
      <Layout>
        <Layout.Section oneThird>
          <StrapiShowImage resourceUrl={`/api/greetings/${id}`} field="image" size="large" authToken={sessionToken} />
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <StrapiShowTitle resourceUrl={`/api/greetings/${id}`} field="title" authToken={sessionToken} />
              <StrapiShowText resourceUrl={`/api/greetings/${id}`} field="message" authToken={sessionToken} />
              <div>
                Sender: <StrapiShowText resourceUrl={`/api/greetings/${id}`} field="sender" authToken={sessionToken} />
              </div>
              <div>
                Recipient:{' '}
                <StrapiShowText resourceUrl={`/api/greetings/${id}`} field="recipient" authToken={sessionToken} />
              </div>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </StrapiShowPage>
  );
};

export default GreetingShow;
