import { Users, Sparkles, Beaker, Settings } from 'lucide-react'

const advantages = [
  {
    icon: Users,
    title: 'Human-AI Collaboration',
    description: 'Combine AI agents with domain experts for superior accuracy. Our hybrid approach delivers 2x better results than pure automation.',
    stats: '50,000+ Expert Labelers',
  },
  {
    icon: Sparkles,
    title: 'Domain Expert Network',
    description: 'Access specialized professionals including doctors, engineers, lawyers, and researchers for complex annotation tasks.',
    stats: '500+ PhD Experts',
  },
  {
    icon: Beaker,
    title: 'Research Leadership',
    description: 'Cutting-edge research team publishing at top conferences. Pioneering new methods in RLHF, data generation, and model evaluation.',
    stats: '100+ Papers Published',
  },
  {
    icon: Settings,
    title: 'Custom Solutions',
    description: 'Tailored editors, workflows, and quality metrics for your specific use case. Full white-glove service for enterprise clients.',
    stats: 'Infinite Customization',
  },
]

export function Advantages() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Sets Us Apart
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unique capabilities that make MizzenAI the trusted partner for mission-critical AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="relative p-8 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                    <advantage.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {advantage.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {advantage.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}