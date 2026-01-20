"use client"

import { HeroSection } from "@/components/ui/home/hero-section"
import { ServicesSection } from "@/components/ui/home/services-section"
import { ProjectCategoriesSection } from "@/components/ui/home/project-categories-section"
import { FeaturedProjectsSection } from "@/components/ui/home/featured-projects-section"
import { ValuesContactSection } from "@/components/ui/home/values-contact-section"
import { RealityGallerySection } from "@/components/ui/home/reality-gallery-section"
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

export default function HomePage() {
  return (
    <div className="bg-[#fff8f7] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full flex-col gap-0">
        <HeroSection />
        {/* <StatsSection /> */}
        <ServicesSection />
        <ProjectCategoriesSection />
        <FeaturedProjectsSection />
        <ValuesContactSection />
        <RealityGallerySection />
        <AboutMapSection />
        <FooterCTASection />
      </main>
    </div>
  )
}
