import React from 'react'

interface FAQStructuredDataProps {
  faqs: {
    question: string
    answer: string
  }[]
}

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default FAQStructuredData