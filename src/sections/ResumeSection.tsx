import { BookOpen, Briefcase, FileDown } from 'lucide-react'
import { experiences, education } from '@/data'
import SectionTitle from '@/components/SectionTitle'

import cvPdf from '@/assets/CV_CS_2026.pdf'

export function ResumeSection() {
  return (
    <div className='animate-in fade-in duration-500'>
      <SectionTitle>Compétences</SectionTitle>

      {/* --- EXPERIENCES --- */}
      <div className='mb-12'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-12 h-12 bg-[#2b2b2c] rounded-xl flex items-center justify-center text-yellow-500 border border-white/5 shadow-sm'>
            <Briefcase size={24} strokeWidth={1.5} />
          </div>
          <h3 className='text-2xl font-bold text-white'>Expérience</h3>
        </div>

        <div className='ml-6 border-l border-white/10 pl-8 space-y-10 relative'>
          {experiences.map((exp, index) => (
            <div key={index} className='relative group'>
              <span
                className={`absolute -left-10.25 top-1.5 w-4 h-4 rounded-full border-4 border-[#1e1e1f] transition-colors ${
                  index === 0
                    ? 'bg-yellow-500 shadow-[0_0_0_4px_rgba(234,179,8,0.1)]'
                    : 'bg-white/20 group-hover:bg-yellow-500/50'
                }`}
              ></span>

              <h4 className='text-[17px] font-bold text-white mb-1'>{exp.title}</h4>
              <span className='text-yellow-500 text-sm font-medium mb-3 flex items-center gap-2'>
                {exp.startDate} — {exp.endDate}
                {exp.link ? (
                  <a
                    href={exp.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white/70 hover:text-yellow-500 transition-colors text-xs px-2.5 py-0.5 bg-[#2b2b2c] rounded border border-white/10 cursor-pointer'
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className='text-white/70 text-xs px-2.5 py-0.5 bg-[#2b2b2c] rounded border border-white/10'>
                    {exp.company}
                  </span>
                )}
              </span>

              {/* Affichage conditionnel : Liste à puces ou texte simple */}
              <ul className='list-disc pl-4 space-y-2 marker:text-yellow-500 text-white/60 leading-relaxed text-[14px]'>
                {Array.isArray(exp.description) ? (
                  exp.description.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className='list-none -ml-4'>{exp.description}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- FORMATIONS --- */}
      <div className='mb-12'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-12 h-12 bg-[#2b2b2c] rounded-xl flex items-center justify-center text-yellow-500 border border-white/5 shadow-sm'>
            <BookOpen size={24} strokeWidth={1.5} />
          </div>
          <h3 className='text-2xl font-bold text-white'>Formation</h3>
        </div>

        <div className='ml-6 border-l border-white/10 pl-8 space-y-10 relative'>
          {education.map((edu, index) => (
            <div key={index} className='relative group'>
              <span className='absolute -left-10.25 top-1.5 w-4 h-4 bg-white/20 group-hover:bg-yellow-500/50 transition-colors rounded-full border-4 border-[#1e1e1f]'></span>

              <h4 className='text-[17px] font-bold text-white mb-1'>{edu.title}</h4>
              <span className='text-yellow-500 text-sm font-medium mb-3 flex items-center gap-2'>
                {edu.startDate} — {edu.endDate}
                <span className='text-white/70 text-xs px-2.5 py-0.5 bg-[#2b2b2c] rounded border border-white/10'>
                  {edu.school}
                </span>
              </span>

              {/* Affichage conditionnel : Liste à puces ou texte simple */}
              <ul className='list-disc pl-4 space-y-2 marker:text-yellow-500 text-white/60 leading-relaxed text-[14px]'>
                {Array.isArray(edu.description) ? (
                  edu.description.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className='list-none -ml-4'>{edu.description}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOUTON TELECHARGER CV --- */}
      <div className='flex justify-end mt-8 border-t border-white/5 pt-8'>
        <a
          href={cvPdf}
          download='CV_CS_2026.pdf'
          className='flex items-center gap-3 bg-[#2b2b2c] hover:bg-yellow-500 text-yellow-500 hover:text-[#1e1e1f] font-medium px-6 py-3.5 rounded-xl border border-white/5 hover:border-yellow-500 transition-all duration-300 group cursor-pointer'
        >
          <FileDown
            size={18}
            className='group-hover:-translate-y-1 transition-transform duration-300'
          />
          Télécharger mon CV
        </a>
      </div>
    </div>
  )
}
