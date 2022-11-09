import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, FormLayout, Layout, Page } from '@shopify/polaris';
import { StrapiEdit, StrapiTextInput, StrapiSubmit, StrapiMediaInput } from '@shop3/polaris-strapi';
import { useSessionToken } from '../context';
import useSWR from 'swr';
import _ from 'lodash';

const GreetingEdit: React.FC = () => {
  const sessionToken = useSessionToken();
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/').pop();

  const { data } = useSWR(`/api/greetings/${id}`, (resourceUrl) =>
    fetch(resourceUrl, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }).then((res) => res.json())
  );

  let initialValue = _.get(data, 'data.attributes', undefined);
  if (initialValue) {
    const keys = ['title', 'message', 'sender', 'recipient'];
    initialValue = _.pickBy(initialValue, (value, key) => keys.includes(key));
    initialValue.image = _.get(data, 'data.attributes.image.data.id', undefined);
  }

  if (!data) {
    return null;
  }

  console.log(initialValue);

  return (
    <Page
      title={`Edit Greeting #${id}`}
      breadcrumbs={[{ content: 'Greetings', url: '/' }]}
      primaryAction={
        <StrapiSubmit formId="greeting-edit" primary>
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
              formId="greeting-edit"
              method="PUT"
              resourceUrl={`/api/greetings/${id}`}
              authToken={sessionToken}
              initialValue={initialValue}
              afterSubmit={(response) => {
                history.push(`/view/${response.data.id}`);
              }}
            >
              <FormLayout>
                <StrapiTextInput field="title" label="Title" minLength={3} maxLength={70} count />
                <StrapiTextInput field="message" label="Message" minLength={3} maxLength={500} count lines={3} />
                <StrapiMediaInput field="image" label="Image" mediaType="image" />
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

export default GreetingEdit;
