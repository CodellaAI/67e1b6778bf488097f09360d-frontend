
'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' }
  ]

  // Placeholder reviews data - in a real app, this would come from the backend
  const reviews = [
    {
      id: 1,
      author: 'Michael R.',
      date: '2023-11-15',
      rating: 5,
      content: 'Excellent product! The build quality is superb and the battery life is impressive. Would definitely recommend to anyone looking for a reliable vape device.'
    },
    {
      id: 2,
      author: 'Sarah T.',
      date: '2023-10-22',
      rating: 4,
      content: 'Really happy with this purchase. The flavor production is great and it\'s very easy to use. Only giving 4 stars because the charging could be a bit faster.'
    },
    {
      id: 3,
      author: 'David L.',
      date: '2023-09-30',
      rating: 5,
      content: 'Perfect for beginners and experienced vapers alike. Simple to maintain and the coils last quite long. Definitely worth the money!'
    }
  ]

  // Placeholder specifications - in a real app, this would be part of the product data
  const specifications = [
    { name: 'Dimensions', value: '86mm x 46mm x 22mm' },
    { name: 'Battery Capacity', value: '1500mAh' },
    { name: 'Output Wattage', value: '5-80W' },
    { name: 'E-liquid Capacity', value: '4.5ml' },
    { name: 'Resistance Range', value: '0.15Ω-3.0Ω' },
    { name: 'Charging', value: 'Type-C USB, 5V/2A' },
    { name: 'Material', value: 'Zinc Alloy + PCTG' },
    { name: 'Display', value: '0.96" TFT Color Screen' }
  ]

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description || 
                `Experience premium vaping with this state-of-the-art device. Designed with both beginners and enthusiasts in mind, it offers exceptional vapor production and flavor clarity. The intuitive interface makes it easy to adjust settings to your preference, while the durable construction ensures longevity.
                
                Features include adjustable wattage, temperature control, and a long-lasting battery that will keep you vaping throughout the day. The sleek design fits comfortably in your hand and pocket, making it perfect for on-the-go use.`
              }
            </p>
            
            {product.features && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">What's in the Box</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-gray-700">1 x {product.name}</li>
                <li className="text-gray-700">2 x Replacement Coils</li>
                <li className="text-gray-700">1 x USB Charging Cable</li>
                <li className="text-gray-700">1 x User Manual</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'specifications' && (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specifications.map((spec, index) => (
                <div key={index} className="flex border-b border-gray-100 py-3">
                  <span className="w-1/2 text-gray-600 font-medium">{spec.name}</span>
                  <span className="w-1/2 text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="mr-6">
                <div className="text-5xl font-bold text-gray-900">{product.rating || '4.7'}</div>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(product.rating || 4.7) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-1">{product.reviewCount || reviews.length} reviews</div>
              </div>
              
              <div className="flex-grow">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-10 text-sm text-gray-600">{rating} star</div>
                      <div className="w-full mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">
                        {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button className="btn btn-outline">Write a Review</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
