import SectionTitle from '@/components/SectionTitle'
import { Code, Smartphone, Database, Layout } from 'lucide-react'

export function AboutSection() {
  return (
    <div className='animate-in fade-in duration-500'>
      <SectionTitle>À propos</SectionTitle>

      <div className='text-white/70 leading-relaxed space-y-4 text-[15px] mb-4'>
        <p>
          Spécialiste <strong>React Native</strong>, je développe des applications mobiles Android &
          iOS fluides et performantes, utilisées en production.
        </p>
        <p>
          À l’aise avec l’ensemble du cycle de développement, je conçois des applications connectées
          à des API <strong>REST</strong> et <strong>GraphQL</strong>, jusqu’à leur publication sur
          les stores (App Store & Google Play).
        </p>
        <p>
          Également full stack <strong>React / Laravel</strong>, j’interviens du backend à
          l’intégration front pour livrer des solutions cohérentes et maintenables.
        </p>
        <p>
          Habitué au <strong>télétravail</strong> et aux équipes distribuées, je collabore
          efficacement avec designers et équipes produit dans des environnements full remote.
        </p>
      </div>

      <div className='text-white/70 leading-relaxed space-y-4 text-[15px] mb-12'>
        <p>
          Vous avez un projet mobile ou web ? Je vous accompagne de l'idée à la mise en production
          avec des solutions fiables, performantes et pensées pour durer.
        </p>
      </div>

      <h3 className='text-2xl font-bold text-white mb-6'>Ce que je fais</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12'>
        {/* Carte 1 : Mobile */}
        <div className='group bg-[#2b2b2c] hover:bg-[#323233] border border-white/5 hover:border-yellow-500/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-default'>
          <div className='text-yellow-500 mb-5 p-4 bg-[#1e1e1f] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner'>
            <Smartphone size={36} strokeWidth={1.2} />
          </div>
          <h4 className='text-white font-bold mb-3 text-lg'>Applications Mobiles</h4>
          <p className='text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors'>
            Développement sur-mesure d'applications rapides, stables et agréables à utiliser pour
            iOS et Android avec React Native.
          </p>
        </div>

        {/* Carte 2 : Web */}
        <div className='group bg-[#2b2b2c] hover:bg-[#323233] border border-white/5 hover:border-yellow-500/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-default'>
          <div className='text-yellow-500 mb-5 p-4 bg-[#1e1e1f] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner'>
            <Code size={36} strokeWidth={1.2} />
          </div>
          <h4 className='text-white font-bold mb-3 text-lg'>Développement Web</h4>
          <p className='text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors'>
            Création d'applications web modernes, interactives et réactives fidèles aux maquettes et
            pensées pour l’utilisateur avec l'écosystème React.
          </p>
        </div>

        {/* Carte 3 : Backend */}
        <div className='group bg-[#2b2b2c] hover:bg-[#323233] border border-white/5 hover:border-yellow-500/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-default'>
          <div className='text-yellow-500 mb-5 p-4 bg-[#1e1e1f] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner'>
            <Database size={36} strokeWidth={1.2} />
          </div>
          <h4 className='text-white font-bold mb-3 text-lg'>Architecture Backend</h4>
          <p className='text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors'>
            Conception d'architectures robustes, sécurisées et d'API REST scalables et adaptées aux
            besoins réels des applications propulsées par Laravel et PHP.
          </p>
        </div>

        {/* Carte 4 : UI/UX (Intégration) */}
        <div className='group bg-[#2b2b2c] hover:bg-[#323233] border border-white/5 hover:border-yellow-500/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-default'>
          <div className='text-yellow-500 mb-5 p-4 bg-[#1e1e1f] rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner'>
            <Layout size={36} strokeWidth={1.2} />
          </div>
          <h4 className='text-white font-bold mb-3 text-lg'>Intégration UI</h4>
          <p className='text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors'>
            Intégration minutieuse d'interfaces esthétiques et d'expériences utilisateurs optimales
            avec Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  )
}
