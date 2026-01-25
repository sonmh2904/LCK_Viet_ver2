"use client"

import { HeroSection } from "@/components/ui/home/hero-section"
import ServicesCards from "@/components/ui/services-cards"
import BlogHighlightSection from "@/components/ui/home/blog-highlight-section"
import { ProjectCategoriesSection } from "@/components/ui/home/project-categories-section"
import { FeaturedProjectsSection } from "@/components/ui/home/featured-projects-section"
import { ValuesContactSection } from "@/components/ui/home/values-contact-section"
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

export default function HomePage() {
  return (
    <div className="bg-[#fff8f7] text-slate-900">
      <main className="w-full max-w-full flex flex-col overflow-x-hidden">
        <HeroSection />
        <section className="py-8 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center">LCK VIỆT - KIẾN TẠO TƯƠNG LAI</h2>
            </div>
            <ServicesCards />
          </div>
        </section>
        <BlogHighlightSection />
        <ProjectCategoriesSection />
        <FeaturedProjectsSection />
        <ValuesContactSection />
        <AboutMapSection />
        <FooterCTASection />
      </main>
    </div>
  )
}
