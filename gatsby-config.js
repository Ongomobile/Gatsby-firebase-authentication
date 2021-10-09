require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Firebase`,
    description: `Gatsby Firebase starter`,
    author: `Mike Haslam`,
    siteUrl: `https://www.yourdevguy.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-firesource`,
      options: {
        credential: {
          type: process.env.GATSBY_FIREBASE_TYPE,
          project_id: process.env.GATSBY_FIREBASE_PROJECT_ID,
          private_key_id: process.env.GATSBY_FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.GATSBY_FIREBASE_PRIVATE_KEY.replace(
            /\\n/g,
            "\n"
          ),
          client_email: process.env.GATSBY_FIREBASE_CLIENT_EMAIL,
          client_id: process.env.GATSBY_FIREBASE_CLIENT_ID,
          auth_uri: process.env.GATSBY_FIREBASE_AUTH_URI,
          token_uri: process.env.GATSBY_FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.GATSBY_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url:
            process.env.GATSBY_FIREBASE_CLIENT_X509_CERT_URL,
        },
        types: [
          {
            type: "User",
            collection: "users",
            map: doc => ({
              name: doc.name,
              email: doc.email,
            }),
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
