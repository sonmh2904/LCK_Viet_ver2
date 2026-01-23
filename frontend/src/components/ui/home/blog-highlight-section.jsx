import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllBlogs, getTopViewedBlogs } from "../../../services/blog/blog.api";

const TAG_STYLES = {
  default: {
    wrapper:
      "inline-flex items-center gap-2 rounded-full px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] bg-white/10 text-white/70",
    dot: "h-2 w-2 rounded-full bg-emerald-300",
  },
  highlight: {
    wrapper:
      "inline-flex items-center gap-2 rounded-full px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] bg-yellow-400/20 text-yellow-200",
    dot: "h-2 w-2 rounded-full bg-yellow-300",
  },
};

function NewsTag({ children, variant = "default" }) {
  const style = TAG_STYLES[variant] ?? TAG_STYLES.default;
  return (
    <span className={style.wrapper}>
      <span className={style.dot} />
      <span>{children}</span>
    </span>
  );
}

const LoadingState = () => (
  <section className="relative bg-white py-20">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-full bg-white/10" />
        <div className="h-8 w-32 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="h-[320px] animate-pulse rounded-3xl bg-white/5 md:h-[380px]" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const EmptyState = ({ message }) => (
  <section className="relative bg-white py-20">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center text-gray-600">
      <p>{message}</p>
    </div>
  </section>
);

export default function BlogHighlightSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHighlightPosts = async () => {
      try {
        setLoading(true);
        const [blogsData, popularData] = await Promise.all([
          getAllBlogs(),
          getTopViewedBlogs(5)
        ]);
        
        // Combine and use the first blog as featured, and the rest as trending
        const allPosts = [...blogsData, ...popularData];
        setPosts(allPosts.slice(0, 4)); // Take first 4 posts
        setError(null);
      } catch (err) {
        setError("Không thể tải bài viết nổi bật");
        console.error("Error fetching highlight posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightPosts();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error || posts.length === 0) {
    return <EmptyState message={error || "Hiện chưa có bài viết nổi bật."} />;
  }

  const [featured, ...rest] = posts;
  const trending = rest.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white py-24 px-4">
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center">
                Chuyển động LCK Việt
              </h2>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/tin-tuc"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gray-900 transition hover:border-amber-400 hover:bg-amber-50"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* Featured Post */}
          <motion.article
            whileHover={{ translateY: -6 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="group relative flex h-full min-h-[360px] overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 via-black/60 to-black/40 shadow-[0_40px_90px_-50px_rgba(249,115,22,0.35)] cursor-pointer"
            onClick={() => {
              if (featured?.slug) {
                window.location.href = `/tin-tuc/${featured.slug}`;
              }
            }}
          >
            <div className="relative h-full w-full">
              <img
                src={
                  featured?.image ||
                  "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80"
                }
                alt={featured?.title || "Featured post"}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end gap-4 p-10 text-white">
                <div className="flex flex-wrap items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-300" />
                    {featured?.createdAt
                      ? new Date(featured.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Tin mới"}
                  </span>
                  {featured?.category && <span>{featured.category}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <NewsTag variant="highlight">
                    Tin tức
                  </NewsTag>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-full bg-white/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.35em] text-white/70"
                  >
                    Nổi bật
                  </motion.span>
                </div>
                <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl drop-shadow-[0_6px_25px_rgba(0,0,0,0.65)]">
                  {featured?.title || "Bài viết nổi bật"}
                </h3>
                {featured?.excerpt && (
                  <p className="max-w-2xl text-sm text-white/70">
                    {featured.excerpt}
                  </p>
                )}
              </div>
            </div>
          </motion.article>

          {/* Trending Posts */}
          <aside className="flex flex-col gap-6 rounded-3xl border border-amber-100 bg-white/80 p-6 shadow-2xl backdrop-blur">
            <div className="space-y-4">
              {trending.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  whileHover={{ translateY: -4, scale: 1.02 }}
                  className="group flex gap-4 rounded-2xl border border-amber-100 bg-white/70 p-4 transition hover:border-amber-400/60 hover:bg-white cursor-pointer"
                  onClick={() => {
                    if (item.slug) {
                      window.location.href = `/tin-tuc/${item.slug}`;
                    }
                  }}
                >
                  <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl shadow-inner">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-amber-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-yellow-300" />
                      Tin tức
                    </div>
                    <h4 className="mt-2 text-base font-semibold text-gray-900 transition group-hover:text-amber-600">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Tin mới"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
