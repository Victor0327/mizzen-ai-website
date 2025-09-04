import { Car, Heart, Building2, Brain, Bot, Globe } from 'lucide-react'

const solutions = [
  {
    icon: Car,
    title: 'Autonomous Vehicles',
    description: 'High-fidelity sensor fusion annotation for self-driving cars',
    link: '#',
  },
  {
    icon: Heart,
    title: 'Healthcare AI',
    description: 'Medical image analysis and clinical data labeling',
    link: '#',
  },
  {
    icon: Building2,
    title: 'Government',
    description: 'Secure, compliant data processing for public sector AI',
    link: '#',
  },
  {
    icon: Brain,
    title: 'Foundation Models',
    description: 'RLHF and instruction tuning for large language models',
    link: '#',
  },
  {
    icon: Bot,
    title: 'Robotics',
    description: '3D perception and manipulation data for robotic systems',
    link: '#',
  },
  {
    icon: Globe,
    title: 'Geospatial AI',
    description: 'Satellite imagery and mapping data annotation',
    link: '#',
  },
]

export function Solutions() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Solutions for Every Industry
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Specialized expertise and tooling for your specific domain and use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <a
              key={index}
              href={solution.link}
              className="group relative p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <solution.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {solution.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary text-sm font-medium">Learn more →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}