"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryAPI, Category } from "@/services/category/category.api";

const PRICING_LINKS = [
  {
    href: "/bao-gia/thiet-ke",
    label: "Báo giá thiết kế",
    accentClasses: "text-[#b30000] hover:bg-red-100",
  },
  {
    href: "/bao-gia/thi-cong",
    label: "Báo giá thi công",
    accentClasses: "text-[#b30000] hover:bg-red-100",
  },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThietKeMenuOpen, setIsThietKeMenuOpen] = useState(false);
  const [isBaoGiaMenuOpen, setIsBaoGiaMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAllCategories({ 
          limit: 100,
          isActive: true 
        })
        setCategories(response.data.categories)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }
    
    fetchCategories()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style jsx>{`
        .dropdown-menu.show {
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="relative h-20">
        {/* Gradient background section */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-400 to-red-800"></div>
        
        <div className="relative mx-auto flex h-20 max-w-6xl items-center pl-0 pr-4 md:pl-0 md:pr-6">
          {/* Logo block */}
          <div className="relative flex h-full flex-shrink-0 items-center">
            <Link
              href="/"
              className="relative z-20 flex h-full items-center gap-3 pl-0 pr-4 uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
            >
              <div className="relative h-12 w-12">
                <Image 
                  src="/logo_lck.png" 
                  alt="LCK Logo" 
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white drop-shadow-2xl" style={{ fontFamily: 'Arial, sans-serif', textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>LCK VIỆT</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden h-full flex-1 items-center justify-end md:flex">
            <div className="flex h-full items-center">
              <Link
                href="/"
                className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>TRANG CHỦ</span>
              </Link>

              <Link
                href="/gioi-thieu"
                className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>GIỚI THIỆU</span>
              </Link>

              {/* Thiết kế Dropdown */}
              <div className="group relative">
                <button className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 cursor-pointer bg-transparent border-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h10m-10 5h6" />
                  </svg>
                  <span>THIẾT KẾ</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full left-1/2 z-[9999] -translate-x-1/2 translate-y-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="mt-1 flex flex-col rounded-lg border border-red-100 bg-white py-2 text-left shadow-lg max-h-96 overflow-y-auto">
                    <Link
                      href="/thiet-ke"
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition text-[#b30000] hover:bg-red-100`}
                    >
                      Tất cả thiết kế
                    </Link>
                    {loadingCategories ? (
                      <div className="px-4 py-2 text-xs text-gray-500">
                        Đang tải danh mục...
                      </div>
                    ) : (
                      categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/thiet-ke?category=${category._id}`}
                          className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition text-[#b30000] hover:bg-red-100`}
                        >
                          {category.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/tin-tuc"
                className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 1.24-2.086 2.02-2.5a4 4 0 014.878 4.816 7.966 7.966 0 01-1.144 4.296M8.228 9A7.966 7.966 0 0112 4c1.325 0 2.57.32 3.682.88m-7.454 3.1a7.96 7.96 0 00-1.228 1.116m-1.455-3.1A7.966 7.966 0 004 12c0 1.325.32 2.57.88 3.682M4 12h.01M12 12h.01m7.5 0h.01M12 16.5h.01M16.5 12h.01M21 12c0 4.418-4.03 8-9 8a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.738.125-1.472-.4-1.472-1.14v-.122c0-.32.2-.615.52-.707 1.72-.515 2.9-1.176 3.6-1.9A7.05 7.05 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
                </svg>
                <span>TIN TỨC</span>
              </Link>

              {/* Báo giá Dropdown */}
              <div className="group relative">
                <button className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 cursor-pointer bg-transparent border-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>BÁO GIÁ</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full left-1/2 z-[9999] -translate-x-1/2 translate-y-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="mt-1 flex flex-col rounded-lg border border-red-100 bg-white py-2 text-left shadow-lg">
                    {PRICING_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${item.accentClasses}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/lien-he"
                className="relative z-20 flex h-full items-center gap-2 px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>LIÊN HỆ</span>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="ml-auto md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="relative z-20 w-8 h-8 flex flex-col justify-center items-center text-white transition-all duration-300 hover:scale-110 focus:outline-none"
            >
              <span 
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-red-700 border-t border-red-600 relative z-40">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>TRANG CHỦ</span>
            </Link>

            <Link
              href="/gioi-thieu"
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>GIỚI THIỆU</span>
            </Link>

            <div className="space-y-2 rounded px-2 py-1">
              <button
                onClick={() => setIsThietKeMenuOpen(!isThietKeMenuOpen)}
                className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block w-full text-left bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h10m-10 5h6" />
                </svg>
                <span>THIẾT KẾ</span>
              </button>

              {isThietKeMenuOpen && (
                <div className="space-y-1 rounded-lg border border-white/20 bg-white/5 p-1">
                <Link
                  href="/thiet-ke"
                  className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/15"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tất cả thiết kế
                </Link>
                {loadingCategories ? (
                  <div className="px-3 py-2 text-xs text-white/70">
                    Đang tải danh mục...
                  </div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/thiet-ke?category=${category._id}`}
                      className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/15"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                )}
              </div>
              )}
            </div>

            <Link
              href="/tin-tuc"
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 1.24-2.086 2.02-2.5a4 4 0 014.878 4.816 7.966 7.966 0 01-1.144 4.296M8.228 9A7.966 7.966 0 0112 4c1.325 0 2.57.32 3.682.88m-7.454 3.1a7.96 7.96 0 00-1.228 1.116m-1.455-3.1A7.966 7.966 0 004 12c0 1.325.32 2.57.88 3.682M4 12h.01M12 12h.01m7.5 0h.01M12 16.5h.01M16.5 12h.01M21 12c0 4.418-4.03 8-9 8a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.738.125-1.472-.4-1.472-1.14v-.122c0-.32.2-.615.52-.707 1.72-.515 2.9-1.176 3.6-1.9A7.05 7.05 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
              </svg>
              <span>TIN TỨC</span>
            </Link>

            <div className="space-y-2 rounded px-2 py-1">
              <button
                onClick={() => setIsBaoGiaMenuOpen(!isBaoGiaMenuOpen)}
                className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block w-full text-left bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>BÁO GIÁ</span>
              </button>

              {isBaoGiaMenuOpen && (
                <div className="space-y-1 rounded-lg border border-white/20 bg-white/5 p-1">
                <Link
                  href="/bao-gia/thi-cong"
                  className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/15"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Báo giá thi công
                </Link>
                <Link
                  href="/bao-gia/thiet-ke"
                  className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/15"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Báo giá thiết kế
                </Link>
              </div>
              )}
            </div>

            <Link
              href="/lien-he"
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-800/80 rounded block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>LIÊN HỆ</span>
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  );
}