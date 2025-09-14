import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const SEOHead = ({ 
  title = "Daktari Dial Hub - Healthcare at Your Fingertips",
  description = "Connect with verified healthcare professionals across Kenya. Book appointments, manage medical records, and access quality healthcare services through our comprehensive platform.",
  keywords = "healthcare, doctors, appointments, medical records, Kenya, telemedicine",
  ogImage = "/og-image.jpg",
  canonical
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Daktari Dial Hub",
          "description": description,
          "url": "https://daktari-dial-hub.lovable.app",
          "logo": "https://daktari-dial-hub.lovable.app/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KE"
          },
          "medicalSpecialty": [
            "General Practice",
            "Cardiology", 
            "Pediatrics",
            "Orthopedics",
            "Dermatology",
            "Neurology"
          ]
        })}
      </script>
    </Helmet>
  );
};