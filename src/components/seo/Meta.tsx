import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

export function Meta({ 
  title = "Premium Grooming Experience", 
  description = "The pinnacle of brotherhood and craft. Experience precision grooming at Blade & Co.",
  image = "/og-image.png"
}: MetaProps) {
  const fullTitle = `${title} | Blade & Co. Barbershop`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Global Meta */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#C9A84C" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Blade & Co. Barbershop" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
