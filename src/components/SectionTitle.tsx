interface Props {
  children: React.ReactNode
}

export default function SectionTitle({ children }: Props) {
  return (
    <div className='mb-8'>
      <h2 className='text-3xl font-bold text-white relative inline-block pb-4'>
        {children}
        <span className='absolute bottom-0 left-0 w-12 h-0.75 bg-yellow-500 rounded-full'></span>
      </h2>
    </div>
  )
}
