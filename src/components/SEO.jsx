import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  canonical,
}) => {
  const siteName = 'Admire Softech';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonical}
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content={siteName}
      />
    </Helmet>
  );
};

export default SEO;
