import { useRouter } from 'next/router';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { FaShower, FaBed } from 'react-icons/fa';
import { BiArea, BiCheck, BiMailSend } from 'react-icons/bi';
import { BiArrowBack, BiCalendar } from 'react-icons/bi'
import { BsFillHouseFill } from 'react-icons/bs';
import { ImWhatsapp } from 'react-icons/im';
import { useQuery, gql } from '@apollo/client';
import { isMobile } from "react-device-detect";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/zoom";

const queryResidencia = gql`

query DetalheResidencia($id: ID!) {
   residencia(where: {id: $id}) {
    id
    endereco
    bairro
    cidade
    banheiros
    quartos
    metragemConstruida
    metragemLote
    stage
    titulo
    updatedAt
    valor
    dataConclusao
    statusObra
      detalhes {
      ... on DetalhesResidencia {
        id
        descricao
      }
    }
    createdAt
    publishedAt
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
          id
          height
          fileName
          size
          url
          width
        }
      }
    }
  }
}
`;

export default function Detalhes() {
  const { query, push } = useRouter();

  const { data, loading } = useQuery(queryResidencia, {
    variables: {
      id: query?.id
    }
  }, {
    fetchPolicy: "cache-first"
  });

  if (loading) {
    return (
      <div>
        <div className="flex w-full flex-1 flex-col items-center  px-20">
          <div className="mt-12 w-1/2 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid h-screen overflow-auto  md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-0 lg:divide-x md:divide-x sm:divide-y">
        <div className="w-full md:h-screen lg:h-screen p-4 md:p-14 lg:p-8 sm:overflow-y-auto">
          <span className='flex items-center text-lg font-bold top-2 cursor-pointer' onClick={() => push('/')}>
            <BiArrowBack size={20} className="mr-2" /> voltar
          </span>
          <div className='flex w-full justify-center'>
            <p className='md:text-4xl lg:text-4xl text-2xl mt-2 font-bold mb-2 text-blue-900'>
              {data?.residencia?.titulo}
            </p>
          </div>

          <div className='flex w-full justify-center mb-4'>
            <a className='text-center'>
              {`${data?.residencia?.endereco}, 
              ${data?.residencia?.bairro}, ${data?.residencia?.cidade}`}
            </a>
          </div>
          <div className='flex w-full justify-evenly items-center h-11 bg-zinc-200 mb-4'>
            <span className="flex text-sm items-center">
              <BiArea size={22} className="mr-2" />
              {`${data?.residencia?.metragemConstruida} m²`}
            </span>
            <span className="flex text-sm items-center">
              <FaBed size={22} className="mr-2" />
              {`${data?.residencia?.quartos} quartos`}
            </span>
            <span className="flex text-sm items-center">
              <FaShower size={20} className="mr-2" />
              {`${data?.residencia?.banheiros} ${data?.residencia?.banheiros == 1 ? 'banheiro' : 'banheiros'}`}
            </span>
          </div>
          <div className='flex flex-col text'>

            {
              data?.residencia?.detalhes?.map((item) => (
                <span key={item?.id} className='flex items-center'>
                  <BiCheck size={20} className="mr-2" />
                  {item?.descricao}
                </span>
              ))
            }

            <span className='font-sm font-sans flex  items-center'>
              <BiCalendar size={20} className="mr-2" />
              {format(new Date(data?.residencia?.dataConclusao), 'MMMM/yyyy', { locale: ptBR })}
            </span>

            <span className='mt-2 md:mt-4 lg:mt-4 text-3xl font-bold flex items-center w-full justify-center'>
              {`${data?.residencia?.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }`}
            </span>
            <div className='flex items-center mb-2 justify-center'>
              {
                data?.residencia?.statusUnidadeResidencial?.map((item) => (
                  item?.statusUnidadeResidencial == 'vendida' ?
                    <span className='flex items-center mr-4'>
                      <BsFillHouseFill size={15} className="mr-2 fill-red-600" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                    :
                    <span className='flex items-center mr-4'>
                      <BsFillHouseFill size={15} className="mr-2 fill-green-700" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                ))
              }
            </div>

            {isMobile ?
              (
                <div className="w-full lg:h-screen md:h-screen mt-4 rounded-lg">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    zoom={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                  >
                    {data?.residencia?.imagens?.map((item, index) => (
                      <SwiperSlide key={index} className=''>

                        <div className='relative bg-cover bg-no-repeat bg-center h-96'>
                          <Image
                            alt={item?.descricao}
                            src={item?.arquivo?.url}
                            fill
                            quality={100}
                            loading='lazy'
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : null}

            <button type="button" className="bg-red-500 flex items-center text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg  mr-0 justify-center w-auto h-10 mt-2 ">
              <BiMailSend size={18} className='mr-2' />
              Enviar as fotos para seu e-mail
            </button>
            <div className='w-full bg-gray-200 h-10 items-center flex justify-center mt-2'>
              <a className='flex justify-center font-bold text-md'>
                Entre em contato para agendar uma visita!
              </a>
            </div>
          </div>

          <div className='mt-2 flex justify-center items-center '>
            <button type="button" className="bg-green-500 flex items-center text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-full  mr-2 lg:mr-2 md:mr-2 justify-center h-10">
              <ImWhatsapp size={15} className='mr-2' />
              Juliana
            </button>
            <button type="button" className="bg-green-500 flex items-center text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-full  mr-0 lg:mr-2 md:mr-2 justify-center h-10">
              <ImWhatsapp size={15} className='mr-2' />
              Antonio carlos
            </button>

          </div>

          <div className=' h-10'></div>
        </div>
        {!isMobile ? (<div className="w-full h-[90%]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            loop={true}
            zoom={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {data?.residencia?.imagens?.map((item, index) => (
              <SwiperSlide key={index} className=''>
                <div className='relative bg-cover bg-no-repeat bg-center h-screen'>
                  <Image
                    alt={item?.descricao}
                    src={item?.arquivo?.url}
                    fill
                    quality={100}
                    priority={false}
                    loading='lazy'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>) : null}
      </div>
    </div>
  )
}
