
import { Shield, Truck, Clock, CreditCard } from 'lucide-react'

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Shield className="w-10 h-10 text-primary-600" />,
      title: "Quality Guaranteed",
      description: "All our products are authentic and sourced directly from manufacturers."
    },
    {
      icon: <Truck className="w-10 h-10 text-primary-600" />,
      title: "Fast Shipping",
      description: "Orders ship within 24 hours with tracking information provided."
    },
    {
      icon: <Clock className="w-10 h-10 text-primary-600" />,
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to assist you."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary-600" />,
      title: "Secure Payment",
      description: "Your transactions are protected with industry-standard encryption."
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
