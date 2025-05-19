
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    title: 'Limited Edition',
    subtitle: 'Exclusive pieces, limited time',
    cta: 'Get It Now',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop',
    bgColor: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
  },
  {
    id: 2,
    title: 'Summer Collection',
    subtitle: 'Discover our latest styles',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop',
    bgColor: 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20',
  },
  {
    id: 3,
    title: 'Winter Essentials',
    subtitle: 'Stay warm in style',
    cta: 'Explore Now',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-gradient-to-r from-blue-400/20 to-indigo-500/20',
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px]">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
            <Link to={slide.link}>
              <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100">
                {slide.cta}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white h-6 w-6" />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
