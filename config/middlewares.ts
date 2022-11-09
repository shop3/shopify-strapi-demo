export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-ancestors': null,
        },
      },
      frameguard: false,
    },
  },
  'strapi::cors',
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Shop3 <shop3.dev>',
    },
  },
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      includeUnparsed: true,
    },
  },
  {
    name: 'strapi::session',
    config: {
      key: 'shop3.session',
    },
  },
  'strapi::favicon',
  'strapi::public',
];
