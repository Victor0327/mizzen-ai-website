'use client'

import Image from 'next/image'

export function TrustIndicators() {
  const companies = [
    {
      name: '清华大学',
      logo: '/logos/tsinghua.png',
      fallback: '/logos/tsinghua.png',
    },
    {
      name: '北京大学',
      logo: '/logos/pku.png',
      fallback: '/logos/pku.png',
    },
    {
      name: '中科院',
      logo: '/logos/cas.png',
      fallback: '/logos/cas.png',
    },
    {
      name: '复旦大学',
      logo: '/logos/fudan.png',
      fallback: '/logos/fudan.png',
    },
    {
      name: '上海交大',
      logo: '/logos/sjtu.png',
      fallback: '/logos/sjtu.png',
    },
    {
      name: '浙江大学',
      logo: '/logos/zju.png',
      fallback: '/logos/zju.png',
    },
    {
      name: '南京大学',
      logo: '/logos/nju.png',
      fallback: '/logos/nju.png',
    },
    {
      name: '华中科技',
      logo: '/logos/hust.png',
      fallback: '/logos/hust.png',
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
