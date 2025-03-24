
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'
import BenefitsSection from '@/components/home/BenefitsSection'
import TrendingProducts from '@/components/home/TrendingProducts'
import BrandShowcase from '@/components/home/BrandShowcase'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <BenefitsSection />
      <TrendingProducts />
      <BrandShowcase />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
