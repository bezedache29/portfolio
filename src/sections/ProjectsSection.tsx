import { useMemo, useState } from 'react'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { projects } from '@/data'
import SectionTitle from '@/components/SectionTitle'
import { motion } from 'framer-motion'
import { ProjectDetail, type DetailedProject } from '@/features/projects/ProjectDetail'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<DetailedProject | null>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filters = ['Tous', 'Front', 'Back', 'Fullstack', 'Mobile']

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') return projects

    return projects.filter((project) => {
      if (!project.tags) return false
      return project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
    })
  }, [activeFilter])

  if (selectedProject) {
    return (
      <div className='animate-in slide-in-from-right-8 duration-500'>
        <button
          onClick={() => setSelectedProject(null)}
          className='flex items-center gap-2 text-white/60 hover:text-yellow-500 mb-8 transition-colors group cursor-pointer'
        >
          <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
          Retour au portfolio
        </button>

        <ProjectDetail project={selectedProject} />
      </div>
    )
  }

  return (
    <div className='animate-in fade-in duration-500'>
      <SectionTitle>Portfolio</SectionTitle>

      <div className='flex flex-wrap gap-3 mb-10'>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
              activeFilter === filter
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {filteredProjects.map((project, index) => (
          <motion.article
            key={index}
            onClick={() => setSelectedProject(project as DetailedProject)}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15, type: 'spring', stiffness: 100 }}
            className='group bg-[#2b2b2c] border border-white/5 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full cursor-pointer hover:border-yellow-500/30 transition-colors'
          >
            {/* Zone de l'image (plus besoin de cursor-pointer ou onClick specifique) */}
            <div className='h-48 bg-[#1e1e1f] relative overflow-hidden flex items-center justify-center border-b border-white/5'>
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={`Aperçu du projet ${project.title}`}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    project.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'
                  }`}
                />
              ) : (
                <div className='text-white/30 font-bold text-xl group-hover:scale-105 transition-transform duration-500'>
                  {project.title}
                </div>
              )}
            </div>

            <div className='p-6 flex flex-col grow'>
              {/* Le titre n'a plus besoin du onClick non plus */}
              <h3 className='text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors w-fit'>
                {project.title}
              </h3>

              <p className='text-white/60 text-sm leading-relaxed mb-6 grow'>
                {project.shortDescription}
              </p>

              <div className='flex flex-wrap gap-2 mb-6'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-[11px] font-medium px-2.5 py-1 bg-[#1e1e1f] text-white/70 rounded-md border border-white/5'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className='flex gap-3 mt-auto pt-4 border-t border-white/5'>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noreferrer'
                    // e.stopPropagation() empeche le clic d'ouvrir la vue detaillee
                    onClick={(e) => e.stopPropagation()}
                    className='flex items-center justify-center p-2.5 rounded-xl bg-[#1e1e1f] text-white/50 hover:text-white hover:bg-white/10 transition-colors border border-white/5 cursor-pointer relative z-10'
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noreferrer'
                    // e.stopPropagation() empeche le clic d'ouvrir la vue detaillee
                    onClick={(e) => e.stopPropagation()}
                    className='flex items-center justify-center p-2.5 rounded-xl bg-[#1e1e1f] text-white/50 hover:text-white hover:bg-white/10 transition-colors border border-white/5 cursor-pointer relative z-10'
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
