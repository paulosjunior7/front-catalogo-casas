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
import Device from 'src/components/Device';

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
      <div className='w-auto border p-1 h-auto lg:h-[26rem] xl:h-[26rem] shadow-lg relative cursor-pointer bg-white rounded-md' onClick={() => push(`detalhes/${item?.id}`)}>
        <Image
          src={item?.imagens[0]?.arquivo?.url}
          alt="Picture of the author"
          width={500}
          height={500}
          className="object-cover min-h-3/6 h-3/6 rounded-md w-full"
        />
        <div className='flex  flex-col text-sm h-3/6'>
          <div className='flex flex-col h-full p-2'>
            <div className='flex w-full'>
              <p className='text-lg font-bold text-blue-900'>
                {item?.titulo.toUpperCase()}
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

            <div className='flex w-full flex-col'>
              {
                item?.statusUnidadeResidencial?.map((item) => (

                  item?.statusUnidadeResidencial == 'vendida' ?
                    <span className='flex items-center' key={item?.id}>
                      <BsFillHouseFill size={15} className="mr-2 fill-red-600" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                    :
                    <span className='flex items-center' key={item?.id}>
                      <BsFillHouseFill size={15} className="mr-2 fill-green-700" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                ))
              }
            </div>

            <span className='font-sm font-sans flex  items-center'>
              <BiCalendar size={15} className="mr-2" />
              {format(new Date(item?.dataConclusao), 'MMMM/yyyy', { locale: ptBR })}
            </span>
            <span className='text-lg font-bold text-green-700'>{item?.valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </div>

          {item?.statusObra == 'construcao' ? <span className='text-xs font-bold items-center mt-2 justify-center flex w-full h-6 shadow-lg bg-blue-200 text-blue-800 absolute left-0 top-0'>
            <a>EM CONSTRUÇÃO</a>
          </span> : (
            item?.statusObra == 'concluida' ? <span className='text-xs font-bold items-center mt-2 justify-center flex w-full h-6 bg-green-200 text-green-800 absolute left-0 top-0'>
              <a>CONCLUIDA</a>
            </span> :
              <span className='text-xs font-bold items-center mt-2 justify-center flex w-full h-6 bg-red-200 text-red-800 absolute left-0 top-0'>
                <a>VENDIDA</a>
              </span>
          )}

          <span className='border-blue-500 border text-white text-xs font-bold items-center justify-center flex w-full h-12 sm:h-12 md:h-10 lg:h-10 xl:h-10 rounded-md shadow-l cursor-pointer hover:bg-blue-400 bg-blue-500'>
            <a>Mais detalhes</a>
            <HiOutlineArrowSmRight size={20} className="mr-1 stroke-white fill-white text-white" />
          </span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex w-full bg-blue-400 h-screen justify-center items-center">
        <h1 className="text-lg text-white animate-pulse">carregando...</h1>
      </div>
    )
  }

  return (
    <>
      {/* <div className='bg-red-600 sm:bg-green-400 md:bg-blue-500 lg:bg-amber-500 xl:bg-amber-400 w-full h-6'></div> */}
      <Device />
      <div className='bg-slate-50 h-screen w-full'>
        <header className='h-auto p-1 w-full items-center flex  py-1 justify-between px-0 lg:px-24 md:px-24'>
          <Image
            src={LogoSVG}
            alt="Picture of the author"
            className='w-[90px] md:w-[170px] lg:w-[170px]'
          />
          <h4 className='w-auto text-lg sm:text-lg md:text-4xl lg:text-4xl  font-bold text-blue-900'>Catálogo de Imóveis à venda</h4>
          <span className='w-[70px] lg:w-[170px] md:w-[170px]'></span>
        </header>
        <div className="px-4 sm:px-12 md:px-8 lg:px-12 xl:px-32 py-4 lg:py-2 md:py-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-2 lg:gap-4 xl:gap-4 ">
            {data?.residencias?.map((item) =>
              <Card key={item?.id} item={item} />
            )}
          </div >
        </div >
      </div>
    </>
  )
}
