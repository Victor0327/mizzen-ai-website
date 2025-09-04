import { Shield, Lock, Award, FileCheck } from 'lucide-react'

const certifications = [
  { name: 'SOC 2 Type II', icon: Shield },
  { name: 'HIPAA Compliant', icon: Lock },
  { name: 'GDPR Ready', icon: Award },
  { name: 'ISO 27001', icon: FileCheck },
]

const features = [
  'End-to-end encryption',
  'Role-based access control',
  'Audit logging & monitoring',
  'Data residency options',
  'Private cloud deployment',
  'Regular security assessments',
]

export function Security() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise Security & Compliance
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bank-grade security infrastructure protecting your most sensitive data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <cert.icon className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="font-medium text-gray-900 dark:text-white">{cert.name}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Trust Center</h3>
            <p className="text-neutral-300 mb-6">
              Access detailed security documentation, compliance reports, and audit logs through our comprehensive Trust Center portal.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Real-time security monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>99.99% uptime SLA guarantee</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>24/7 security operations center</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-white font-medium hover:text-green-400 transition-colors">
              Visit Trust Center →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}