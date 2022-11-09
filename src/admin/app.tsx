import AuthLogo from 'assets/auth-logo.svg';
import MenuLogo from 'assets/menu-logo.svg';
import favicon from 'assets/favicon.ico';
import translationsEn from '@strapi/admin/admin/src/translations/en.json';
import translationsIt from '@strapi/admin/admin/src/translations/it.json';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      colors: {
        neutral0: '#ffffff',
        neutral100: 'rgba(246, 246, 247, 1)', // background color
        neutral150: 'rgba(225, 227, 229, 1)',
        neutral200: 'rgba(210, 213, 216, 1)',
        neutral300: 'rgba(186, 190, 195, 1)',
        neutral400: 'rgba(153, 158, 164, 1)',
        neutral500: 'rgba(140, 145, 150, 1)', // inactive icons color
        neutral600: 'rgba(109, 113, 117, 1)', // inactive links color
        neutral700: 'rgba(68, 71, 74, 1)',
        neutral800: 'rgba(32, 34, 35, 1)', // text color
        // neutral900: 'rgba(68, 71, 74, 1)',
        // neutral1000: 'rgba(26, 28, 29, 1)',
        primary100: 'rgba(250, 251, 251, 1)',
        primary200: 'rgba(179, 208, 195, 1)',
        primary500: 'rgba(0, 128, 96, 1)',
        primary600: 'rgba(0, 110, 82, 1)',
        primary700: 'rgba(0, 94, 70, 1)',
        buttonPrimary500: 'rgba(0, 110, 82, 1)', // hovered button color
        buttonPrimary600: 'rgba(0, 128, 96, 1)', // primary button color
        success100: 'rgba(241, 248, 245, 1)',
        success200: 'rgba(174, 233, 209, 1)',
        success500: 'rgba(0, 164, 124, 1)',
        success600: 'rgba(0, 164, 124, 1)',
        success700: 'rgba(0, 127, 95, 1)',
        warning100: 'rgba(255, 245, 234, 1)',
        warning200: 'rgba(255, 215, 157, 1)',
        warning500: 'rgba(185, 137, 0, 1)',
        warning600: 'rgba(185, 137, 0, 1)',
        warning700: 'rgba(145, 106, 0, 1)',
        danger100: 'rgba(255, 244, 244, 1)',
        danger200: 'rgba(254, 211, 209, 1)',
        danger500: 'rgba(253, 87, 73, 1)',
        danger600: 'rgba(215, 44, 73, 1)',
        danger700: 'rgba(188, 34, 0, 1)',
      },
    },
    // Locales used in the app
    locales: ['it', 'en'],
    // Extend the translations
    translations: {
      en: Object.fromEntries(
        Object.entries(translationsEn)
          .filter(([k, v]) => /Strapi/.test(v))
          .map(([k, v]) => [k, v.replace(/Strapi/, 'Shop3')])
      ),
      it: Object.fromEntries(
        Object.entries(translationsIt)
          .filter(([k, v]) => /Strapi/.test(v))
          .map(([k, v]) => [k, v.replace(/Strapi/, 'Shop3')])
      ),
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { release: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
