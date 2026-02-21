'use client'

import React from 'react'

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Xpeartz Digital Agency",
    "alternateName": "Xpeartz",
    "url": "https://xpeartz.com",
    "logo": "https://xpeartz.com/logo.png",
    "image": "https://xpeartz.com/og-image.png",
    "description": "Premium digital agency and best freelance agency for high-end web design, branding, and UI/UX solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "priceRange": "$$",
    "sameAs": [
      // Add social media links here
    ],
    "services": [
      "Web Design",
      "UI/UX Design",
      "Brand Identity",
      "Next.js Development",
      "E-commerce Solutions"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
