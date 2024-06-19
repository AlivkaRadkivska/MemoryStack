import { badScript } from '@/services/fonts/bad-script';
import { getCookie } from '@/utils/cookies-factory';

export default async function MenuPage() {
  const username = await getCookie('username');

  return (
    <div className='flex flex-col bg-purple w-full h-full rounded-b-xl p-4 items-center justify-center'>
      <h1 className='text-3xl font-semibold text-white text-shadow py-8'>
        Memory Stack
      </h1>
      <div className='flex flex-col items-center justify-start bg-gray rounded-lg border-collapse
       border-blue  border-x-2 border-y-2 min-w-56 min-h-24 py-2 px-4'>
        <div className='notebook-texture text-center h-full w-full p-1'>
          <p className={`${badScript.className}`}>
            those memories belong to
          </p>
          {username ?
            <p className={`${badScript.className} !font-semibold pt-0 text-red text-2xl`}>{username}</p>
          :
            <p className={`${badScript.className} !font-semibold pt-1 text-purpleGray`}>(here can be your name)</p>
          }
        </div>
      </div>
      <div className='flex w-full h-full justify-end items-end'>
        <svg xmlns='http://www.w3.org/2000/svg' width='130' height='150' viewBox='0 0 194 178' fill='none'>
          <path d='M80.7641 73.0601L31.1886 28.7907' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M153.966 174.849L133.469 141.102' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M189.84 121.065L162.784 113.268' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M61.5794 110.343L2.73776 110.292' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M87.0471 143.219L71.1526 168.708' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M115.98 60.4453L110.22 3.01388' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M146.773 72.7943L177.929 40.7033' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
          <path d='M109.435 105.001C93.3216 113.427 117.942 120.48 125.077 112.863C135.214 102.041 115.362 82.9414 101.514 91.4334C87.6663 99.9254 86.4834 114.712 96.0209 124.62M96.0209 124.62C105.558 134.529 122.396 130.328 129.201 127.061C143.762 120.072 147.858 109.075 144.403 97.8601C140.949 86.6451 128.515 72.337 106.473 76.7563C84.4297 81.1757 70.755 109.811 96.0209 124.62Z' stroke='#C4AE40' strokeWidth='5' strokeLinecap='round'/>
        </svg>
      </div>
    </div>
  )
}
