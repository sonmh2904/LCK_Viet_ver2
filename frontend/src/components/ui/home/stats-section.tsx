"use client"

const stats = [
  { label: "Dự án dân dụng", value: "320+" },
  { label: "Biệt thự - Villa", value: "120+" },
  { label: "Nhà phố", value: "180+" },
  { label: "Tỉnh thành triển khai", value: "19" },
]

export function StatsSection() {
  return (
    <section className="relative -mt-10 z-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white bg-white px-6 py-10 shadow-[0_40px_90px_-60px_rgba(207,31,31,0.6)]">
        <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-3xl font-bold text-[#b30000] drop-shadow">{item.value}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
