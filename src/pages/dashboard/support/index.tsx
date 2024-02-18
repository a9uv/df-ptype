import Head from "next/head";
// import Link from "next/link";
// import Image from 'next/image';
// import logoIpsum from '../../public/logoipsum.svg'
// import { lusitana } from '../ui/fonts';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import {  useAuth } from "@clerk/nextjs";
// import { Suspense } from "react";
// import { api } from "~/utils/api";
import Layout from "../../../components/layout";
import { lusitana } from "../../../components/fonts";



export default function Support() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  // const user = useAuth()

  return (
    <>
      <Head>
        <title>Support | DealFlow</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>  
            <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Support
      </h1>
              </main>

              </Layout>
    </>
  );
}
