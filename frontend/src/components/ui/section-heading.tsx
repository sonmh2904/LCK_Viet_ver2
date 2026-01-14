import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center"

  return (
    <div className={cn("flex flex-col gap-4", alignment, className)}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}
        {highlight && (
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
            {highlight}
          </span>
        )}
      </h2>
      {description && <p className="max-w-2xl text-base text-gray-600 sm:text-lg">{description}</p>}
    </div>
  )
}

export default SectionHeading
