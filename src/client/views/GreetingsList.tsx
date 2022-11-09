import React from 'react';
import { Layout, Page } from '@shopify/polaris';
import { StrapiList, StrapiListItem, StrapiListText } from '@shop3/polaris-strapi';
import { useSessionToken } from '../context';

const GreetingList: React.FC = () => {
  const sessionToken = useSessionToken();

  return (
    <Page
      title="Greetings List"
      primaryAction={{
        content: 'Create',
        url: '/create',
      }}
    >
      <Layout>
        <Layout.Section>
          <StrapiList resourceUrl="/api/greetings" authToken={sessionToken}>
            <StrapiListItem resourceUrl="/view" nameField="title" mediaField="image">
              <StrapiListText textField="title" variation="strong" />
              <div>
                <StrapiListText textField="message" />
              </div>
            </StrapiListItem>
          </StrapiList>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GreetingList;
