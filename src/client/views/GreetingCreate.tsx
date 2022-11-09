import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, FormLayout, Layout, Page } from '@shopify/polaris';
import { StrapiEdit, StrapiTextInput, StrapiSubmit, StrapiMediaInput } from '@shop3/polaris-strapi';
import { useSessionToken } from '../context';

const GreetingCreate: React.FC = () => {
  const sessionToken = useSessionToken();
  const history = useHistory();

  return (
    <Page
      title="Create a Greeting"
      breadcrumbs={[{ content: 'Greetings', url: '/' }]}
      primaryAction={
        <StrapiSubmit formId="greeting-create" primary>
          Save
        </StrapiSubmit>
      }
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => history.goBack(),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <StrapiEdit
              formId="greeting-create"
              method="POST"
              resourceUrl="/api/greetings"
              authToken={sessionToken}
              afterSubmit={(response) => {
                history.push(`/view/${response.data.id}`);
              }}
            >
              <FormLayout>
                <StrapiTextInput field="title" label="Title" minLength={3} maxLength={70} count />
                <StrapiTextInput field="message" label="Message" minLength={3} maxLength={500} count lines={3} />
                <StrapiMediaInput field="image" label="Image" mediaType="image" multiple={false} />
                <StrapiTextInput field="sender" label="Sender" />
                <StrapiTextInput field="recipient" label="Recipient" />
              </FormLayout>
            </StrapiEdit>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GreetingCreate;
