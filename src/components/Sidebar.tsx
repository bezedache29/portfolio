import { personalInfo } from '@/data'
import { Mail, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaXTwitter, FaStackOverflow } from 'react-icons/fa6'

import avatarImg from '@/assets/avatar.png'

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside className='bg-[#1e1e1f] rounded-4xl p-6 md:p-8 border border-white/5 flex flex-col relative'>
      {/* Bouton avec le chevron en jaune */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='absolute top-0 right-0 p-4 text-yellow-500 hover:text-yellow-400 bg-linear-to-bl from-[#2b2b2c] to-transparent rounded-tr-4xl rounded-bl-3xl border-b border-l border-white/5 md:hidden transition-colors z-20'
        aria-label='Toggle contacts'
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* En-tete du profil : Alignement horizontal sur mobile, vertical sur PC */}
      <div className='flex flex-row items-center md:flex-col md:items-center gap-5 md:text-center w-full z-10 relative'>
        {/* Avatar avec une taille reduite sur mobile (w-20 h-20) par rapport au PC (md:w-32 md:h-32) */}
        <div className='w-20 h-20 md:w-32 md:h-32 rounded-3xl shrink-0 relative flex items-center justify-center shadow-lg bg-[#1e1e1f]'>
          <img
            src={avatarImg}
            alt='Avatar de Christophe'
            className='w-full h-full object-cover rounded-3xl'
          />

          {/* Point vert avec effet pulse en bas a droite de l'image */}
          <div
            className='absolute bottom-0 right-1 md:bottom-0 md:right-2 flex h-3 w-3 md:h-4 md:w-4'
            title='Disponible'
          >
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-full w-full bg-green-500 border-2 md:border-[3px] border-[#1e1e1f]'></span>
          </div>
        </div>

        {/* Informations nom et poste alignees a gauche sur mobile */}
        <div className='flex flex-col items-start md:items-center mt-0 md:mt-2'>
          <h1 className='text-xl md:text-2xl font-bold text-white mb-1.5 md:mb-3 tracking-wide'>
            {personalInfo.name} {personalInfo.lastName}
          </h1>
          <span className='px-3 py-1 md:px-4 md:py-1.5 bg-[#2b2b2c] text-xs md:text-[13px] text-white/80 rounded-lg'>
            {personalInfo.title}
          </span>
        </div>
      </div>

      {/* Partie retractable pour les contacts */}
      <div
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out md:max-h-125 md:opacity-100 ${
          isExpanded ? 'max-h-125 opacity-100 mt-6 md:mt-8' : 'max-h-0 opacity-0 mt-0 md:mt-8'
        }`}
      >
        <hr className='w-full border-white/5 mb-6 md:mb-8' />

        <div className='w-full flex flex-col gap-6 mb-8'>
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center text-yellow-500 border border-white/5 shadow-sm'>
              <Mail size={16} strokeWidth={1.5} />
            </div>
            <div className='overflow-hidden'>
              <p className='text-[11px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold'>
                Email
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className='text-[13px] text-white/90 truncate block hover:text-yellow-500 transition-colors cursor-pointer'
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center text-yellow-500 border border-white/5 shadow-sm'>
              <MapPin size={16} strokeWidth={1.5} />
            </div>
            <div>
              <p className='text-[11px] text-white/40 mb-0.5 uppercase tracking-wider font-semibold'>
                Location
              </p>
              <a
                href={personalInfo.mapUrlSidebar}
                target='_blank'
                rel='noreferrer'
                className='text-[13px] text-white/90 block hover:text-yellow-500 transition-colors cursor-pointer'
              >
                {personalInfo.location}
              </a>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-5 w-full pt-2'>
          <a
            href={personalInfo.github}
            target='_blank'
            rel='noreferrer'
            className='text-white/50 hover:text-white transition-colors'
          >
            <FaGithub size={20} />
          </a>
          <a
            href={personalInfo.linkedin}
            target='_blank'
            rel='noreferrer'
            className='text-white/50 hover:text-white transition-colors'
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={personalInfo.x}
            target='_blank'
            rel='noreferrer'
            className='text-white/50 hover:text-white transition-colors'
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href={personalInfo.sto}
            target='_blank'
            rel='noreferrer'
            className='text-white/50 hover:text-white transition-colors'
          >
            <FaStackOverflow size={20} />
          </a>
        </div>
      </div>
    </aside>
  )
}
