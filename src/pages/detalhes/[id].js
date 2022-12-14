import { useRouter } from 'next/router';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { FaShower, FaBed } from 'react-icons/fa';
import { BiArea, BiCheck, BiDownload } from 'react-icons/bi';
import { BiArrowBack, BiCalendar } from 'react-icons/bi'
import { BsFillHouseFill } from 'react-icons/bs';
import { ImWhatsapp } from 'react-icons/im';
import { useQuery, gql } from '@apollo/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import ReactWhatsapp from 'react-whatsapp';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/zoom";
import { isIOS } from 'react-device-detect';

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
    imagens(first: 100) {
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
      <div className="flex w-full bg-teal-600 h-screen justify-center items-center">
        <h1 className="text-lg text-white animate-pulse">carregando...</h1>
      </div>
    )
  }

  const download = async () => {
    await data?.residencia?.imagens?.map(async imagem => {
      let url = '';
      await fetch(imagem?.arquivo?.url).then((response) => {
        setTimeout(() => {
          response.blob().then(blob => {
            url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${imagem?.descricao?.toUpperCase()}.jpeg`;
            a.click();
          });
        }, 1000)
      });

    })
  }



  const fileDownloadHandler = async () => {
    if (isIOS) {

    } else {
      download();
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 divide-y sm:divide-y md:divide-y lg:divide-x xl:divide-x">
        <div className="w-full md:h-auto lg:h-auto p-4 md:px-14 lg:p-8">

          <div className='flex w-full justify-between'>
            <span className='flex items-center cursor-pointer' onClick={() => push('/')}>
              <BiArrowBack size={25} />
            </span>
            <p className='md:text-4xl lg:text-4xl text-2xl mt-2 font-bold mb-2 text-blue-900'>
              {data?.residencia?.titulo}
            </p>
            <div />
          </div>

          <div className='flex w-full justify-center mb-4'>
            <a className='text-center'>
              {`${data?.residencia?.endereco}, 
              ${data?.residencia?.bairro}, ${data?.residencia?.cidade}`}
            </a>
          </div>
          {data?.residencia?.statusObra == 'vendida' && <div className='flex w-full justify-evenly items-center h-8 bg-red-500 mb-4 text-white font-bold'>
            <span className="flex text-sm items-center">
              VENDIDA
            </span>
          </div>}
          <div className='flex w-full justify-evenly items-center h-11 bg-zinc-200 mb-4'>
            <span className="flex text-sm items-center">
              <BiArea size={22} className="mr-2" />
              {`${data?.residencia?.metragemConstruida} m??`}
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

            <span className='font-sm font-sans flex  items-center mt-2'>
              <BiCalendar size={20} className="mr-2" />
              {format(new Date(data?.residencia?.dataConclusao), 'MMMM/yyyy', { locale: ptBR })}
            </span>

            <span className='mt-4 md:mt-2 lg:mt-2 text-3xl font-bold flex items-center w-full justify-center'>
              {`${data?.residencia?.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }`}
            </span>
            <div className='flex items-center mb-2 mt-2 justify-center'>
              {
                data?.residencia?.statusUnidadeResidencial?.map((item) => (
                  item?.statusUnidadeResidencial == 'vendida' ?
                    <span className='flex items-center mr-4' key={item?.id}>
                      <BsFillHouseFill size={15} className="mr-2 fill-red-600" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                    :
                    <span className='flex items-center mr-4' key={item?.id}>
                      <BsFillHouseFill size={15} className="mr-2 fill-green-700" />
                      {`${item?.descricao} (${item?.statusUnidadeResidencial})`}
                    </span>
                ))
              }
            </div>

          </div>
        </div>
        <div className='p-4 md:px-14 lg:p-4'>
          <div className="w-full h-96 sm:h-[32rem] md:h-[42rem] lg:h-[calc(90vh_-_100px)] xl:h-[calc(90vh_-_100px)]">
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

                  <div className='relative bg-cover bg-no-repeat bg-center h-96 sm:h-[32rem] md:h-[42rem] lg:h-[calc(90vh_-_100px)] xl:h-[calc(90vh_-_100px)]'>
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
          </div>
          {!isIOS &&
            <button type="button" onClick={() => fileDownloadHandler()} className="bg-blue-500 flex items-center text-white text-sm font-medium py-2 px-3 rounded-lg  mr-0 justify-center w-full h-10 mt-2 ">
              <BiDownload size={22} className='mr-2' />
              Fa??a o download das fotos
            </button>}
          <div className='mt-2 flex justify-center items-center '>
            <ReactWhatsapp number="5562983002211" message={`Ol??, Gostaria de mais informa????es das casas disponiveis para venda`}
              className="bg-green-500 flex items-center text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-full  mr-2 lg:mr-2 md:mr-2 justify-center h-10">
              <ImWhatsapp size={15} className='mr-2' />
              Juliana
            </ReactWhatsapp>
            <ReactWhatsapp number="5562983002211" message={`Ol??, Gostaria de mais informa????es das casas disponiveis para venda`}
              className="bg-green-500 flex items-center text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg w-full justify-center h-10">
              <ImWhatsapp size={15} className='mr-2' />
              Antonio carlos
            </ReactWhatsapp>
          </div>
          <div className='w-full bg-gray-200 h-10 items-center flex justify-center mt-2'>
            <a className='flex justify-center font-bold text-md'>
              Entre em contato para agendar uma visita!
            </a>
          </div>
          <div className='w-ful h-10 items-center flex justify-center mt-2' />
        </div>
      </div>
    </div>
  )
}
