// import { accTokenMemory } from "@/app/api/a-token/route";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout"
import { useParams } from 'next/navigation'
import { getAccessToken } from "~/lib/docusign";
import { globalAccessToken,globalAccountID, globalBaseURI, globalDocuCode, globalUserInfo } from "./doc";



let accTokenMemory: string;
let baseURI: string;
let accountId:string;
const integrationKey = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
const envSecretKey = process.env.DOCUSIGN_SECRET_KEY
const redirectUri = 'http://localhost:3000/dashboard/account/doc';
const scope = 'signature';
const docuLoginURI = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=${scope}&client_id=${integrationKey}&redirect_uri=${redirectUri}`;





export default function Account(props: any) {

    
    // const code = router.asPath
    const code='undefined'
    
    const tokenURI = 'https://account-d.docusign.com/oauth/token';
    const credentials = btoa(`${integrationKey}:${envSecretKey}`);
    console.log("docuSign Param Code: ", code);
    console.log('accTokenMemory: ', accTokenMemory);
    if (code !== undefined) {
     
        // try {
        //     const fetchURL = "http://localhost:3000/api/a-token"
        //     const reqBody = { code, credentials, tokenURI }

                

        //     console.log('\n accessJson.accessToken:', accessJSON.accessToken);
        //     accTokenMemory = accessJSON.accessToken
        //     accountId = '34b4257c-670b-4966-9310-24ccc31f0dae'
        //     baseURI = 'https://demo.docusign.net/'

        //     } catch (error) {
        //         console.error('Error for a-token')
        //     }
    } 


//   console.log('ENTER - dashboard/account\n\n accToken from Server Memory: ', accTokenMemory);

return (
    <>
    
    
        <Head>
    <title>Account | DealFlow</title>
    <meta name="description" content="Generated by create-t3-app" />
    <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>  
            <div className="container mx-auto p-4">
    <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">General</h2>
    <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <p className="text-gray-700">John Doe</p>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <p className="text-gray-700">john.doe@example.com</p>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium">Phone Number</label>
            <p className="text-gray-700">123-456-7890</p>
        </div>
    </div>
    </div>

    <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Password</h2>
    <div className="flex items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Change</button>
    </div>
    </div>

    <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Payment</h2>
    <div>
        <label className="block mb-2 text-sm font-medium">Payment Method</label>
        <p className="text-gray-700">Credit Card ending in **** 1234</p>
    </div>
    </div>
    <div>
    <h2 className="text-2xl font-bold mb-4">DocuSign</h2>
    <div>
        {accTokenMemory !== undefined ?
        (<p> You are logged in to DocuSign! </p>)
        : (
            <div>
    <p> You are not logged into DocuSign yet. Please log in by pressing the button below: </p>
                {<div>
                <Link
                className="flex mt-3 mb-3 h-10 items-center rounded-lg w-36 border border-solid border-black bg-yellow-200 px-4 text-sm font-medium"
                href={docuLoginURI}>DocuSign</Link>
                    </div>
                }
            </div>
            

            
        )}

    </div>
    </div>

    <div>
    <h2 className="text-2xl font-bold mb-4">Support</h2>
    <div>
        <button className="text-red-500">Delete Account</button>
    </div>
    </div>
</div>
        </Layout>
        </>
);
};


