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
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import LogoSVG from '../assests/logo.svg'

export default function Home() {
  const { push } = useRouter();

  const queryResidencia = gql`
    query Residencias {
      residencias {
        titulo
        id
        cidade
        bairro
        endereco
        valor
        dataConclusao
        statusObra
        statusUnidadeResidencial {
          ... on UnidadeResidencial {
            id
            descricao
            statusUnidadeResidencial
          }
        }
        imagens {
          ... on Imagem {
            id
            descricao
            arquivo {
              fileName
              url
            }
          }
        }
      }
    }
`;

  const { data, loading } = useQuery(queryResidencia, {
    fetchPolicy: "cache-first"
  });



  const Card = ({ item }) => {

    return (
      <div className='w-auto h-auto border p-1 shadow-lg relative cursor-pointer bg-white rounded-md' onClick={() => push(`detalhes/${item?.id}`)}>
        <Image
          src={item?.imagens[0]?.arquivo?.url}
          alt="Picture of the author"
          width={500}
          height={500}
          className="object-cover h-[50%] rounded-md"
        />
        <div className='flex h-[50%]  flex-col text-sm justify-between '>
          <div className='flex justify-between flex-col h-full p-2'>
            <div className='flex w-full'>
              <p className='text-base font-bold text-blue-900'>
                {item?.titulo}
              </p>
            </div>
            <div className='flex w-full'>
              <a className='text-start'>
                {item?.endereco}
              </a>
            </div>
            <div className='flex w-full'>
              <a className='text-start'>
                {`${item?.bairro}, ${item?.cidade}`}
              </a>
            </div>
            
            {
              item?.statusUnidadeResidencial?.map((item) => (

                item?.statusUnidadeResidencial == 'vendida' ?
                  <span className='flex items-center'>
                    <BsFillHouseFill size={15} className="mr-2 fill-red-600" />
                    {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                  </span>
                  :
                  <span className='flex items-center'>
                    <BsFillHouseFill size={15} className="mr-2 fill-green-700" />
                    {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                  </span>
              ))
            }

            <span className='font-sm font-sans flex  items-center'>
              <BiCalendar size={15} className="mr-2" />
              {format(new Date(item?.dataConclusao), 'MMMM/yyyy', { locale: ptBR })}
            </span>
            <span className='text-base font-bold'>{item?.valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </div>

          {item?.statusObra == 'construcao' ? <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 shadow-lg dark:bg-blue-200 dark:text-blue-800 absolute left-0 top-0'>
            <a>EM CONSTRUÇÃO</a>
          </span> : (
            item?.statusObra == 'concluida' ? <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 dark:bg-green-200 dark:text-green-800 absolute left-0 top-0'>
              <a>CONCLUIDA</a>
            </span> :
              <span className='text-blue-800 text-xs font-bold items-center mt-2 justify-center flex w-full h-6 dark:bg-red-200 dark:text-red-800 absolute left-0 top-0'>
                <a>VENDIDA</a>
              </span>
          )}

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
            {data?.residencias?.map((item) =>
              <Card key={item?.id} item={item} />
            )}
          </div >
        </div >
      </div>

      <header className='h-12 p-0 w-full bg-zinc-100'>

      </header>
    </>
  )
}
