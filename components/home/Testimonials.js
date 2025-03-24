
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    role: 'Vaping Enthusiast',
    content: 'I\'ve been shopping at Vapor Vault for over a year now, and I\'m consistently impressed by their product selection and customer service. The quality is unmatched!',
    rating: 5
  },
  {
    id: 2,
    name: 'Samantha Lee',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    role: 'Regular Customer',
    content: 'The variety of flavors available is amazing. I\'ve discovered so many new favorites that I would have never tried elsewhere. Their staff is also incredibly knowledgeable.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    role: 'Tech Reviewer',
    content: 'As someone who reviews vaping devices professionally, I can confidently say that Vapor Vault carries some of the best products on the market. Their customer support is also top-notch.',
    rating: 4
  },
  {
    id: 4,
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    role: 'New Vaper',
    content: 'Being new to vaping, I was overwhelmed by all the options. The team at Vapor Vault was incredibly patient and helped me find the perfect starter kit. Couldn\'t be happier!',
    rating: 5
  },
  {
    id: 5,
    name: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    role: 'Collector',
    content: 'I collect limited edition vape devices, and Vapor Vault always gets the newest releases. Their shipping is fast and everything arrives perfectly packaged.',
    rating: 5
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % Math.max(testimonials.length - visibleCount + 1, 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? Math.max(testimonials.length - visibleCount, 0) : prev - 1))
  }

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount)

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers about their experiences with Vapor Vault.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <button 
              onClick={handlePrev}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <button 
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Testimonials */}
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(0)` }}
            >
              {visibleTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 flex-grow">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(Math.max(testimonials.length - visibleCount + 1, 1))].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === i ? 'bg-primary-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
