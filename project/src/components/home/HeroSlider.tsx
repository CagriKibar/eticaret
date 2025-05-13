import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Yaz Koleksiyonu',
    subtitle: 'Yeni sezon ürünlerde %50\'ye varan indirimler',
    link: '/kategori/kadin-giyim',
    buttonText: 'Hemen Keşfet',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Elektronik Dünyası',
    subtitle: 'En yeni teknoloji ürünleri burada',
    link: '/kategori/elektronik-aksesuarlar',
    buttonText: 'Satın Al',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Erkek Giyim',
    subtitle: 'Stil sahibi erkekler için özenle hazırlandı',
    link: '/kategori/erkek-giyim',
    buttonText: 'Keşfet',
  },
];

const HeroSlider: React.FC = () => {
  return (
    <div className="relative h-screen max-h-[650px] w-full overflow-hidden mt-16">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="bg-primary-dark hover:bg-primary text-white font-bold py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
              >
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;