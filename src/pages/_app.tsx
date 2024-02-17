import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";


import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


const MyApp: AppType = ({ Component, pageProps }) => {
      return (          
      <ClerkProvider {...pageProps}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);
