"use client"

import { AboutHeroSection } from "@/components/ui/about/about-hero-section"
import { AboutContactSection } from "@/components/ui/about/about-contact-section"
import { FeaturedProjectsSection } from "@/components/ui/about/featured-projects-section"
import { ContactFormSection } from "@/components/ui/about/contact-form-section"
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

export default function AboutPage() {
  return (
    <div className="bg-[#fff8f7] text-slate-900">
      <main className="w-full max-w-full flex flex-col overflow-x-hidden">
        <AboutHeroSection />
        <AboutContactSection />
        <FeaturedProjectsSection />
        <ContactFormSection />
        <AboutMapSection />
        <FooterCTASection />
      </main>
    </div>
  )
}
