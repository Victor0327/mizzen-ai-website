import { Star } from 'lucide-react'

const testimonials = [
  {
    content: "MizzenAI's platform reduced our model training time by 60% while improving accuracy by 35%. Their human-in-the-loop approach is unmatched.",
    author: 'Sarah Chen',
    role: 'VP of AI Research',
    company: 'TechCorp AI',
    rating: 5,
  },
  {
    content: "The quality of annotations and speed of delivery exceeded our expectations. Critical for our autonomous driving program's success.",
    author: 'Michael Rodriguez',
    role: 'Director of ML Engineering',
    company: 'AutoDrive Systems',
    rating: 5,
  },
  {
    content: "Their RLHF platform helped us achieve state-of-the-art performance. The expert network provided invaluable domain-specific feedback.",
    author: 'Dr. Emily Watson',
    role: 'Chief Data Scientist',
    company: 'Foundation AI Lab',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how teams are transforming their AI development with MizzenAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 relative">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="text-primary font-medium hover:underline">
            Read more case studies →
          </a>
        </div>
      </div>
    </section>
  )
}