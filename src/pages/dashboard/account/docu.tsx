import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout"
// import {useRouter} from 'next/router'
// import axios from 'axios'

// const accTokenMemory = null;
// const integrationKey = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
// const envSecretKey = process.env.DOCUSIGN_SECRET_KEY
// const redirectUri = 'http://localhost:3000/dashboard/account';
// const scope = 'signature';
// const docuLoginURI = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=${scope}&client_id=${integrationKey}&redirect_uri=${redirectUri}`;

export default async function DocuRedirect() {

//     const router = useRouter();
//     const code = router.query.code;
//       const tokenURI = 'https://account-d.docusign.com/oauth/token';
//   const credentials = btoa(`${integrationKey}:${envSecretKey}`);
    
//     if (code !== undefined) {
     
//         try {
//             const fetchURL = "http://localhost:3000/api/a-token"
//             const reqBody = { code, credentials, tokenURI }
            

//             const res = await axios.post(fetchURL, JSON.stringify(reqBody), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//         } catch (error) {
//                 console.error('Error for a-token')
//             }
//     } 

return (
    <>
    
    
        <Head>
    <title>DocuRedirect | DealFlow</title>
    <meta name="description" content="docusign's redirect with code" />
    <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>  

            <main className="container mx-auto p-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">DocuRedirect</h2>
              
                        <Link href="/dashboard/account">
                            Click Here
                        </Link>
                        </div>
                </main>
        </Layout>
        </>
);
};


