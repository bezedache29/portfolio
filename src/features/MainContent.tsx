import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AboutSection } from '@/sections/AboutSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ResumeSection } from '@/sections/ResumeSection'
import { ContactSection } from '@/sections/ContactSection'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      action: string | Date,
      params?: Record<string, unknown>
    ) => void
  }
}

type Tab = 'about' | 'resume' | 'portfolio' | 'contact'

export function MainContent() {
  const [activeTab, setActiveTab] = useState<Tab>('about')

  const navItems: { id: Tab; label: string }[] = [
    { id: 'about', label: 'À propos' },
    { id: 'resume', label: 'Compétences' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: `/${activeTab}`,
        page_title: activeTab,
      })
    }
  }, [activeTab])

  return (
    <>
      <main className='bg-[#1e1e1f] rounded-4xl border border-white/5 relative overflow-hidden flex flex-col min-h-150 mb-24 md:mb-0'>
        {/* Navigation Desktop */}
        <nav
          className='hidden md:flex absolute top-0 right-0 z-50 bg-[#2b2b2c] rounded-bl-4xl border-b border-l border-white/5 px-8 py-5 shadow-sm'
          role='tablist'
          aria-label='Sections du portfolio'
        >
          <ul className='flex items-center gap-8 text-sm font-medium'>
            {navItems.map((item) => (
              <li key={item.id} className='relative z-50'>
                <button
                  type='button'
                  role='tab'
                  aria-selected={activeTab === item.id}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`cursor-pointer pointer-events-auto transition-colors duration-300 ${
                    activeTab === item.id ? 'text-yellow-500' : 'text-white/70 hover:text-white/90'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className='p-4 md:p-6 md:pt-20 grow relative'>
          {/* Remplacement de mode="wait" par mode="popLayout" pour eviter le saut de scroll */}
          <AnimatePresence mode='popLayout'>
            <motion.div
              id={`panel-${activeTab}`}
              role='tabpanel'
              aria-labelledby={`tab-${activeTab}`}
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='w-full'
            >
              {activeTab === 'about' && <AboutSection />}
              {activeTab === 'portfolio' && <ProjectsSection />}
              {activeTab === 'resume' && <ResumeSection />}
              {activeTab === 'contact' && <ContactSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Mobile fixee en bas */}
      <nav
        className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2b2b2c] rounded-t-3xl border-t border-white/5 p-4 sm:py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md'
        role='tablist'
        aria-label='Sections du portfolio'
      >
        <ul className='flex items-center justify-between text-sm font-medium overflow-x-auto gap-1 sm:gap-4 hide-scrollbar'>
          {navItems.map((item) => (
            <li key={item.id} className='flex-1 text-center'>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-1 py-2 text-[11px] xs:text-xs sm:text-sm md:text-base font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.id ? 'text-yellow-500' : 'text-white/70 hover:text-white/90'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
