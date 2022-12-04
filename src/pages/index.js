import Image from 'next/image'
import { useRouter } from 'next/router'

import { ImPriceTags } from 'react-icons/im';
import { BiArea } from 'react-icons/bi';
import { IoMdTime } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { BsFillHouseFill } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

import LogoSVG from '../assests/logo.svg'

export default function Home() {
  const { push } = useRouter();

  const Card = () => {
    return (
      <div className='w-auto h-auto border p-1 shadow-lg relative cursor-pointer bg-white rounded-md' onClick={() => push('detalhes/clb8sgn263ag20alvfwyxheis')}>
        <Image
          src="https://www.jms.eng.br/static/media/OBRAB15_1.445eaed1.jpeg"
          alt="Picture of the author"
          width={500}
          height={500}
          className="object-cover h-[50%] rounded-md"
        />
        <div className='flex h-[50%]  flex-col text-sm justify-between '>
          <div className='flex justify-between flex-col h-full p-2'>
            <div className='flex w-full'>
              <p className='text-base font-bold text-blue-900'>
                CASA JARDIM PRESIDENTE
              </p>
            </div>
            <div className='flex w-full'>
              <a className='text-start'>
                {`Rua dos Moros, quadra 18, lote 02`}
              </a>
            </div>
            <div className='flex w-full'>
              <a className='text-start'>
                {`${'Três Marias'}, ${'Goiânia'}`}
              </a>
            </div>
            <span className='flex items-center'>
              <BsFillHouseFill size={15} className="mr-2 fill-red-600" />
              Casa 1 (vendida)
            </span>
            <span className='flex items-center'>
              <BsFillHouseFill size={15} className="mr-2 fill-green-600 " />
              Casa 2
            </span>
            <span className='font-sm font-sans flex  items-center'>
              <BiCalendar size={15} className="mr-2" />
              Agosto/2022
            </span>
            <span className='text-base font-bold'>R$ 480.000,00</span>
          </div>
          <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 shadow-lg dark:bg-blue-200 dark:text-blue-800 absolute left-0 top-0'>
            <a>EM CONSTRUÇÃO</a>
          </span>
          {/* <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 dark:bg-green-200 dark:text-green-800 absolute left-0 top-0'>
              <a>CONCLUIDA</a>
            </span> */}
          {/* <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 dark:bg-red-200 dark:text-red-800 absolute left-0 top-0'>
              <a>VENDIDA</a>
            </span> */}
          <span className='border-blue-500 border text-white text-xs font-bold items-center justify-center flex w-full h-12 rounded-md shadow-l cursor-pointer hover:bg-blue-400 bg-blue-500'>
            <a>Mais detalhes</a>
            <HiOutlineArrowSmRight size={20} className="mr-1 stroke-white fill-white text-white" />
          </span>



        </div>
      </div>
    )
  }

  return (
    <>
      <header className='h-auto p-1 w-full items-center flex bg-slate-50 py-1 justify-between px-0 lg:px-24 md:px-24'>
        <Image
          src={LogoSVG}
          alt="Picture of the author"
          className='w-[90px] md:w-[170px] lg:w-[170px]'
        />
        <h4 className='w-auto md:text-4xl lg:text-4xl text-1xl font-bold text-blue-900'>Catálogo de Imóveis à venda</h4>
        <span className='w-[70px] lg:w-[170px] md:w-[170px]'></span>
      </header>
      <div className='container bg-slate-50'>
        <div className="px-4 lg:px-24 md:px-8 py-4 lg:py-2 md:py-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(10)].map((x, i) =>
              <Card key={i} />
            )}
          </div >
        </div >
      </div>

      <header className='h-12 p-0 w-full bg-zinc-100'>

      </header>
    </>
  )
}
