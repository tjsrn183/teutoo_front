import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import { Suspense } from "react";
import Script from "next/script";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "training together",
  description: "나의 개인 트레이닝 가격을 내가 정하자",
  openGraph: {
    images: "../public/metadata/pageThumb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="md:max-w-md bg-white md:m-auto  ">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services`}
        />
        <Provider>
          <div className="  bg-white md:drop-shadow-2xl min-h-screen">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <ReactQueryDevtools />
          </div>
        </Provider>
      </body>
    </html>
  );
}
