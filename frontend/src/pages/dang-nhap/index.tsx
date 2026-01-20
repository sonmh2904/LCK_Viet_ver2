import { LoginForm } from "@/components/ui/loginForm"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0">
          <Image 
            src="/highlight/hl2.jpg" 
            alt="LCK Design Background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">LCK Design</h1>
          <p className="text-xl mb-8 opacity-90">Không gian sống đẳng cấp</p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">L</span>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">C</span>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">K</span>
            </div>
          </div>
          <p className="text-sm opacity-75 mt-8">Thiết kế nội thất & ngoại thất cao cấp</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <LoginForm />
      </div>
    </div>
  )
}

// i18n removed
