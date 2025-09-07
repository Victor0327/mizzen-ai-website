import { Database, Brain, BarChart3, Workflow, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    name: 'Data Management',
    description:
      'Centralize, index, and organize massive unstructured datasets with our intelligent data engine. Handle petabytes of multimodal data seamlessly.',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'AI-Assisted Labeling',
    description:
      'Combine AI automation with human expertise for precise data annotation. Support for images, video, text, audio, and 3D data types.',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Model Evaluation',
    description:
      'Comprehensive benchmarking and performance testing. Compare models, identify weaknesses, and optimize with RLHF techniques.',
    icon: BarChart3,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Workflow Automation',
    description:
      'End-to-end pipeline automation with custom workflows. Integrate seamlessly with your existing ML infrastructure and tools.',
    icon: Workflow,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Core Platform Capabilities
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to build, train, and deploy production-ready AI
            systems
          </p>
          
          <div className="mt-8">
            <Link href="/dataset/gui">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer">
                <Database className="h-5 w-5" />
                <span className="font-medium">Explore GUI Datasets</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors h-full">
                <div
                  className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
