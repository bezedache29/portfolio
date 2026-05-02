import { MainContent } from '@/features/MainContent'
import { Sidebar } from '@/components/Sidebar'

export default function App() {
  return (
    <div className='min-h-screen bg-[#0a0a0a] text-[#e5e5e5] px-4 pb-4 md:px-12 md:pb-12 font-sans flex justify-center'>
      <div className='w-full max-w-300 flex flex-col lg:flex-row gap-3 items-start'>
        <div className='w-full lg:w-70 xl:w-75 shrink-0 sticky top-0 z-40 bg-[#0a0a0a] pt-4 md:pt-12 pb-4'>
          <Sidebar />
        </div>

        <div className='w-full flex-1 min-w-0 lg:pt-12'>
          <MainContent />
        </div>
      </div>
    </div>
  )
}
