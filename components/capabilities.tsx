import { Check } from 'lucide-react'

const capabilities = {
  dataTypes: [
    'Images & Computer Vision',
    'Video & Motion Analysis',
    'Natural Language & Text',
    'Audio & Speech',
    '3D Point Clouds & LiDAR',
    'Sensor Fusion Data',
  ],
  scale: [
    'Petabyte-scale processing',
    'Millions of annotations daily',
    'Real-time data pipelines',
    'Global distributed workforce',
    'Sub-millisecond latency',
    '99.99% uptime SLA',
  ],
  automation: [
    'AI-powered pre-labeling',
    'Active learning loops',
    'Auto quality assurance',
    'Smart task routing',
    'Anomaly detection',
    'Continuous model improvement',
  ],
  integration: [
    'REST APIs & SDKs',
    'AWS, GCP, Azure native',
    'MLOps platform ready',
    'Custom data connectors',
    'Webhook notifications',
    'Enterprise SSO & SAML',
  ],
}

export function Capabilities() {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Technical Stack
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built for scale, security, and seamless integration with your existing infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm font-bold">
                1
              </span>
              Data Types
            </h3>
            <ul className="space-y-3">
              {capabilities.dataTypes.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm font-bold">
                2
              </span>
              Scale & Performance
            </h3>
            <ul className="space-y-3">
              {capabilities.scale.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm font-bold">
                3
              </span>
              AI Automation
            </h3>
            <ul className="space-y-3">
              {capabilities.automation.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm font-bold">
                4
              </span>
              Integration
            </h3>
            <ul className="space-y-3">
              {capabilities.integration.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}