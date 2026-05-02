import { useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export interface DetailedProject {
  title: string
  shortDescription: string
  tags: string[]
  coverImage?: string
  liveUrl?: string
  githubUrl?: string
  images: string[]
  description: string
  techStack: { label: string; value: string }[]
  features: { category: string; points: string[] }[]
  imageFit?: 'contain' | 'cover'
  imagesFit?: 'contain' | 'cover'
}

export function ProjectDetail({ project }: { project: DetailedProject }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  return (
    <div className='animate-in fade-in duration-500 max-w-4xl mx-auto pb-12'>
      {/* --- EN-TÊTE --- */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
          {project.title}
        </h1>
        <div className='flex items-center gap-4'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 bg-[#2b2b2c] hover:bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/5 transition-colors text-sm font-medium'
            >
              <ExternalLink size={16} />
              Live URL
            </a>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 bg-[#2b2b2c] hover:bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/5 transition-colors text-sm font-medium'
            >
              <FaGithub size={16} />
              Repo
            </a>
          ) : (
            <span className='flex items-center gap-2 bg-[#1e1e1f] text-white/40 px-4 py-2.5 rounded-lg border border-white/5 text-sm font-medium cursor-not-allowed'>
              <FaGithub size={16} />
              Private Repo
            </span>
          )}
        </div>
      </div>

      {/* --- CARROUSEL D'IMAGES --- */}
      {/* On n'affiche ce bloc complet que s'il y a au moins 1 image */}
      {project.images.length > 0 && (
        <div className='mb-10 group'>
          {/* 1. Conteneur de l'image et des flèches (sans les points) */}
          <div className='relative w-full aspect-video bg-[#1e1e1f] rounded-2xl overflow-hidden border border-white/5 shadow-lg'>
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className={`w-full h-full transition-opacity duration-500 ${
                project.imagesFit ? project.imagesFit : 'object-cover'
              }`}
            />

            {/* Contrôles du carrousel affichés uniquement si plus d'une image */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-yellow-500 text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm'
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-yellow-500 text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm'
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* 2. Indicateurs (points) SORTIS du conteneur de l'image */}
          {project.images.length > 1 && (
            <div className='flex justify-center items-center gap-2 mt-4'>
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`Aller à l'image ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentImageIndex === idx
                      ? 'bg-yellow-500 w-6'
                      : 'bg-white/30 hover:bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- DESCRIPTION --- */}
      <div className='mb-12 text-white/70 leading-relaxed text-lg'>
        <p className='whitespace-pre-line'>{project.description}</p>
      </div>

      {/* --- TECHNOLOGY STACK --- */}
      <div className='mb-12'>
        <h2 className='text-3xl font-bold text-white mb-6'>Technologies utilisées</h2>
        <ul className='space-y-3'>
          {project.techStack.map((tech, idx) => (
            <li key={idx} className='text-white/70 flex items-start gap-2'>
              <span className='w-1.5 h-1.5 bg-yellow-500 rounded-sm mt-2 shrink-0'></span>
              <p>
                <strong className='text-white'>{tech.label}:</strong> {tech.value}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* --- KEY FEATURES --- */}
      <div>
        <h2 className='text-3xl font-bold text-white mb-6'>Fonctionnalités principales</h2>
        <div className='space-y-8'>
          {project.features.map((feature, idx) => (
            <div key={idx}>
              <h3 className='text-xl font-bold text-white flex items-center gap-2 mb-4'>
                <span className='text-white/30'>#</span> {feature.category}
              </h3>
              <ul className='space-y-3 pl-6'>
                {feature.points.map((point, pointIdx) => (
                  <li key={pointIdx} className='text-white/70 flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-white/30 rounded-sm mt-2 shrink-0'></span>
                    <p className='leading-relaxed'>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
