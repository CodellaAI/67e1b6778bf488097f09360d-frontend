
import Image from 'next/image'

export default function BrandShowcase() {
  const brands = [
    { name: "SMOK", logo: "/brands/smok.png" },
    { name: "Vaporesso", logo: "/brands/vaporesso.png" },
    { name: "GeekVape", logo: "/brands/geekvape.png" },
    { name: "Voopoo", logo: "/brands/voopoo.png" },
    { name: "Uwell", logo: "/brands/uwell.png" },
    { name: "Innokin", logo: "/brands/innokin.png" }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Trusted Brands</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="relative h-12 w-32">
                {/* Placeholder for brand logos - in a real app you'd use actual brand logos */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">{brand.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
