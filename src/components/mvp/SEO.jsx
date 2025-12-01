import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * SEO Component for dynamic meta tag management
 * Helps improve search engine rankings and social media sharing
 */
const SEO = ({
  title = "Prashant Khatiwada - Expert Frontend Developer | React & Next.js Specialist",
  description = "Award-winning Frontend Developer specializing in React, Next.js, and TypeScript. 3+ years building high-performance web applications for banking, fintech, and SaaS.",
  keywords = "frontend developer portfolio, React developer, Next.js developer, TypeScript expert, web developer Nepal, best portfolio website",
  image = "https://khatiwadaprashant.com.np/og-image.jpg",
  url = "https://khatiwadaprashant.com.np",
  type = "website",
}) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url + location.pathname, true);
    updateMetaTag("og:type", type, true);

    // Twitter Card tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:url", url + location.pathname);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url + location.pathname);
  }, [title, description, keywords, image, url, type, location]);

  return null;
};

export default SEO;
