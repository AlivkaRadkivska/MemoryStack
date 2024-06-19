import { badScript } from '@/services/fonts/bad-script';

interface ButtonT {
  children: React.ReactNode,
  active?: boolean,
  red?: boolean,
}

export function StickerButton({ children, active, red }: ButtonT){
  return (
    <div className={`${red ? 'bg-red -mr-3 z-10 pr-6' : 'bg-yellow'} px-3 py-2 max-w-xs
      min-w-sm hover:bg-lime easy-in duration-500 ${active && '-ml-7 z-10 pl-10'} cursor-pointer`}>
      {children}
    </div>
  )
}

export function StampButton({ children, red }: ButtonT){
  return (
    <div className={`bg-gray border-2 ${red ? 'border-red text-red' : 'border-indigo text-indigo'} my-1
      border-dashed rounded px-4 py-1 max-w-xs min-w-sm hover:border-lime easy-in-out duration-300
      !font-semibold ${badScript.className} cursor-pointer hover:text-lime hover:-rotate-6`}>
      {children}
    </div>
  )
}
