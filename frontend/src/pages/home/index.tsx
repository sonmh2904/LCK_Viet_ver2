"use client"

import { HeroSection } from "@/components/ui/home/hero-section"
import { ServicesSection } from "@/components/ui/home/services-section"
import BlogHighlightSection from "@/components/ui/home/blog-highlight-section"
import { ProjectCategoriesSection } from "@/components/ui/home/project-categories-section"
import { FeaturedProjectsSection } from "@/components/ui/home/featured-projects-section"
import { ValuesContactSection } from "@/components/ui/home/values-contact-section"
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

export default function HomePage() {
  return (
    <div className="bg-[#fff8f7] text-slate-900">
      <main className="mx-auto w-full flex flex-col">
        <HeroSection />
        <ServicesSection />
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
