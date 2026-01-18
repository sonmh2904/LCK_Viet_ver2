import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/redux_store";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [pageTitle, setPageTitle] = useState("LCK Việt - Kiến tạo tương lai");
  const router = useRouter();
  
  useEffect(() => setMounted(true), []);

  // Update page title based on current route
  useEffect(() => {
    const path = router.pathname;
    let title = "LCK Việt - Kiến tạo tương lai";
    
    // Define page titles based on routes
    const pageTitles: { [key: string]: string } = {
      "/": "LCK Việt - Kiến tạo tương lai",
      "/gioi-thieu": "Giới thiệu - LCK Việt",
      "/tin-tuc": "Tin tức - LCK Việt",
      "/lien-he": "Liên hệ - LCK Việt",
      "/thiet-ke": "Thiết kế - LCK Việt",
      "/thiet-ke/noi-that": "Thiết kế nội thất - LCK Việt",
      "/thiet-ke/ngoai-that": "Thiết kế ngoại thất - LCK Việt",
      "/bao-gia": "Báo giá - LCK Việt",
      "/bao-gia/thiet-ke": "Báo giá thiết kế - LCK Việt",
      "/bao-gia/thi-cong": "Báo giá thi công - LCK Việt",
      "/dang-nhap": "Đăng nhập - LCK Việt",
      "/dang-ky": "Đăng ký - LCK Việt",
    };

    // Check for exact matches first
    if (pageTitles[path]) {
      title = pageTitles[path];
    } else {
      // Handle dynamic routes (like blog posts, etc.)
      if (path.startsWith("/tin-tuc/")) {
        title = "Tin tức chi tiết - LCK Việt - Kiến tạo tương lai";
      } else if (path.startsWith("/admin")) {
        title = "Quản trị - LCK Việt - Kiến tạo tương lai";
      }
    }
    
    setPageTitle(title);
  }, [router.pathname]);

  // Check if current page is admin page
  const isAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        {!isAdminPage && <Header />}
        <div className={`${isAdminPage ? '' : 'pt-20'} bg-white min-h-screen`}>
          <Component {...pageProps} />
          {!isAdminPage && <Footer />}
          {mounted && (
            <Toaster
              richColors
              position="top-right"
              toastOptions={{
                classNames: {
                  toast: "px-6 py-5 text-base",
                  title: "text-lg font-semibold",
                  description: "text-base",
                  closeButton: "scale-110",
                  actionButton: "text-base",
                },
              }}
            />
          )}

          {!isAdminPage && (
            <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50">
              <a
                href="https://m.me/100081223427193"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 via-red-400 to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img src="/social_media/messenger.png" alt="Facebook Messenger" className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Chat Facebook (8h30-21h)</span>
              </a>
              <a
                href="https://zalo.me/0374334444"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 via-red-400 to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img src="/social_media/zalo.png" alt="Zalo" className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Tư vấn Zalo (8h30-21h)</span>
              </a>
            </div>
          )}
        </div>
      </PersistGate>
    </Provider>
  );
}
