import { Upload, Settings, PlayCircle, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: '1. Import Data',
    description: 'Upload your datasets via API, SDK, or direct integration with cloud storage',
  },
  {
    icon: Settings,
    title: '2. Configure Pipeline',
    description: 'Set up annotation guidelines, quality metrics, and workflow automation',
  },
  {
    icon: PlayCircle,
    title: '3. Process & Label',
    description: 'AI-assisted labeling with human verification for maximum accuracy',
  },
  {
    icon: CheckCircle,
    title: '4. Deploy & Monitor',
    description: 'Export labeled data, train models, and continuously improve performance',
  },
]

export function Workflow() {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, Powerful Workflow
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From raw data to production-ready models in four streamlined steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white mb-4 mx-auto">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            See Platform Demo
          </a>
        </div>
      </div>
    </section>
  )
}