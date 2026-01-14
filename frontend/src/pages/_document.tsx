import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta
          name="description"
          content="LCK Việt - Đơn vị thiết kế và thi công giải pháp xây dựng đồng hành cùng các thương hiệu hàng đầu Việt Nam."
        />
        <link rel="icon" href="/logo_lck.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
