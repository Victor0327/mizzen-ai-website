import { ArrowRight, Calendar, MessageSquare } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary">
      <div className="container-max section-padding">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your AI Development?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
            Join hundreds of leading AI teams using MizzenAI to build the next generation of intelligent systems
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg hover:bg-gray-50 transition-all group"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Demo
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 backdrop-blur px-6 py-3 text-base font-semibold text-white ring-2 ring-white/20 hover:bg-white/20 transition-all"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact Sales
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">14-day</div>
              <div className="text-white/80">Free trial available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">No</div>
              <div className="text-white/80">Credit card required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-white/80">Expert support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}