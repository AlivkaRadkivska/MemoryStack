interface PaperSheetContainerT {
  children: React.ReactNode,
}

export function PaperSheetContainer({ children }: PaperSheetContainerT) {
  return (
    <div className='flex flex-col items-start justify-start overflow-y-scroll 
      text-wrap w-full h-full mx-1 p-2 pt-9 text-blue gap-1 notebook-texture'>
      {children}
    </div>
  )
}
