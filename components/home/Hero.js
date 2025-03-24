
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Experience Premium Vaping",
      subtitle: "Discover our collection of high-quality vapes and accessories",
      image: "https://images.unsplash.com/photo-1560706980-0e7b1f4856b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Shop Now"
    },
    {
      title: "New Flavors Have Arrived",
      subtitle: "Explore our latest e-liquid collection with unique taste profiles",
      image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "View Collection"
    },
    {
      title: "Premium Devices for Enthusiasts",
      subtitle: "Elevate your experience with our advanced vaping technology",
      image: "https://images.unsplash.com/photo-1563262924-641a8b3d397f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Discover Devices"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          
          {/* Content */}
          <div className="relative h-full container-custom flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                {slide.subtitle}
              </p>
              <Link href="/products" className="btn btn-primary">
                {slide.cta}
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
