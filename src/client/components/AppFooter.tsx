import React from 'react';
import { FooterHelp, Link } from '@shopify/polaris';

const AppFooter: React.FC = () => {
  return (
    <div style={{ padding: 'var(--p-space-5)' }}>
      <FooterHelp>
        Learn more on <Link url="https://github.com/shop3/strapi-shopify-demo">Github</Link>
      </FooterHelp>
    </div>
  );
};

export default AppFooter;
