import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  className = "", 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-[#b30000] text-white hover:bg-[#a00000] focus:ring-[#b30000]",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#b30000]"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
