'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = {
  products: [
    { name: 'Data Engine', href: '#' },
    { name: 'RLHF Platform', href: '#' },
    { name: 'Model Evaluation', href: '#' },
    { name: 'GenAI Data', href: '#' },
  ],
  solutions: [
    { name: 'For Enterprises', href: '#' },
    { name: 'For Government', href: '#' },
    { name: 'For Startups', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Research', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Contact', href: '#' },
  ],
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-700 transition-colors">
      <nav className="container-max section-padding" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold gradient-text">MizzenAI</span>
            </Link>
          </div>

          <div className="flex sm:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex lg:gap-x-8">
            <div className="relative group">
              <button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
                Products
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="absolute -left-4 top-full z-10 mt-3 w-56 rounded-xl bg-white dark:bg-neutral-800 p-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {navigation.products.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-neutral-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 hover:text-primary transition-colors dark:text-gray-100">
                Solutions
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="absolute -left-4 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 hover:text-primary transition-colors dark:text-gray-100">
                Resources
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="absolute -left-4 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {navigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 hover:text-primary transition-colors dark:text-gray-100">
                Company
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="absolute -left-4 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="#"
              className="text-sm font-medium leading-6 text-gray-900 hover:text-primary transition-colors dark:text-gray-100"
            >
              Pricing
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            <Link
              href="#"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10 transform transition-transform',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold gradient-text">MizzenAI</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {Object.entries(navigation).map(([key, items]) => (
                  <div key={key}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      {key}
                    </p>
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  href="#"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Pricing
                </Link>
              </div>
              <div className="py-6 space-y-3">
                <Link
                  href="#"
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sign in
                </Link>
                <Link
                  href="#"
                  className="block rounded-lg bg-primary px-3 py-2.5 text-base font-semibold text-white text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
