import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { InteractiveCanvas } from './interactive-canvas'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container-max section-padding pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="relative grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Main content */}
          <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="animate-pulse h-2 w-2 rounded-full bg-primary"></span>
            Trusted by leading AI teams worldwide
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            Breakthrough AI froms
            <span className="block gradient-text">Data to Deployment</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto lg:mx-0">
            The most trusted platform for AI data labeling, model evaluation,
            and RLHF. Power your AI systems with high-quality datasets and
            comprehensive benchmarks that accelerate innovation and ensure
            reliability.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="#"
              className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-dark transition-all hover:shadow-lg flex items-center gap-2 group"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#"
              className="rounded-lg bg-white dark:bg-neutral-800 px-6 py-3 text-base font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Watch Overview
            </Link>
          </div>

            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8 lg:justify-start">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  500M+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Data Points Labeled
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  99.9%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Accuracy Rate
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  200+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Enterprise Clients
                </div>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  AI Models Evaluated
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="hidden lg:block relative h-96 w-full">
            <InteractiveCanvas />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </section>
  )
}
