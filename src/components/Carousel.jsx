import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../assets/Carousel-01.jpg'
import img2 from '../assets/Carousel-02.jpg'
import img3 from '../assets/Carousel-03.jpg'
import img4 from '../assets/Carousel-04.jpg'

const NextArrow = (props) => {
    const {onClick} = props;
    return(
        <button
        className="absolute h-[10vh] w-[10vh] right-[2%] top-[25%] rounded-full flex items-center justify-center z-10 hover:bg-[#a6a8a8] hover:bg-opacity-50 transition duration-300 ease-in-out"
        onClick={onClick}
        style={{position: 'absolute'}}
        >
            <i className="fa-solid fa-chevron-right text-3xl"></i>
        </button>
    )
}
const PrevArrow = (props) => {
    const {onClick} = props;
    return(
        <button
        className="absolute h-[10vh] w-[10vh] left-[2%] top-[25%] rounded-full flex items-center justify-center z-10  hover:bg-[#a6a8a8] hover:bg-opacity-50 transition duration-300 ease-in-out"
        onClick={onClick}
        style={{position: 'absolute'}}
        >
            <i className="fa-solid fa-chevron-left text-3xl"></i>
        </button>
    )
}

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings}  className="relative h-[60vh] w-[100%]">
      <div>
        <img src={img1} className='bg-no-repeat overflow-clip'/>
      </div>
      <div>
        <img src={img2} className='bg-no-repeat'/>
      </div>
      <div>
        <img src={img3} className='bg-no-repeat'/>
      </div>
      <div>
        <img src={img4} className='bg-no-repeat'/>
      </div>
    </Slider>
  );
};

export default Carousel;
