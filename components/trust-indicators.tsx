'use client'

import Image from 'next/image'

export function TrustIndicators() {
  const companies = [
    {
      name: 'OpenAI',
      logo: 'https://logo.clearbit.com/openai.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/openai.svg',
    },
    {
      name: 'Google',
      logo: 'https://logo.clearbit.com/google.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/google.svg',
    },
    {
      name: 'Anthropic',
      logo: 'https://logo.clearbit.com/anthropic.com',
      fallback: 'https://avatars.githubusercontent.com/u/100435473?s=200&v=4',
    },
    {
      name: 'Microsoft',
      logo: 'https://logo.clearbit.com/microsoft.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/microsoft.svg',
    },
    {
      name: 'Meta',
      logo: 'https://logo.clearbit.com/meta.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/meta.svg',
    },
    {
      name: 'Tesla',
      logo: 'https://logo.clearbit.com/tesla.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/tesla.svg',
    },
    {
      name: 'Apple',
      logo: 'https://logo.clearbit.com/apple.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/apple.svg',
    },
    {
      name: 'Amazon',
      logo: 'https://logo.clearbit.com/amazon.com',
      fallback:
        'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/amazon.svg',
    },
  ]

  return (
    <section className="py-12 bg-white dark:bg-neutral-900 border-t border-b border-neutral-100 dark:border-neutral-700">
      <div className="container-max section-padding">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Trusted by leading AI teams worldwide
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-x-8 opacity-80 overflow-x-auto scrollbar-hide pb-2 justify-center">
            <div className="flex gap-x-8 min-w-max px-4">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center h-10 w-24 relative group flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={38}
                    height={38}
                    className="object-contain transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = company.fallback
                    }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
