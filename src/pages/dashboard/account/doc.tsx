import { useRouter } from 'next/router'
import axios from 'axios'


export let globalDocuCode: string;
export let globalAccessToken: string;
export let globalAccountID: string;
export let globalBaseURI: string;
export let globalUserInfo: string[];

const integrationKey = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
const envSecretKey = process.env.DOCUSIGN_SECRET_KEY

const tokenURI = 'https://account-d.docusign.com/oauth/token';
const credentials = btoa(`${integrationKey}:${envSecretKey}`);
const docuAPIEndpoint = "https://account-d.docusign.com/oauth/userinfo"





    


const authTokenFetch = async () => {
    console.log('entering authTokenFetch() . . . \n\n');

    
    const authTokenURL = `http://localhost:3000/api/auth/accessToken?code=${globalDocuCode}`
    const reqBody = { globalDocuCode, credentials, tokenURI }
    console.log('authTokenFetch reqBody: \n', JSON.stringify(reqBody));


    const res = await axios.get(authTokenURL)
    console.log('authTokenFetch()  res.status: ', res.status);
    
    
        //     const res = await axios.post(authTokenURL, JSON.stringify(reqBody), {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).catch(err => {
        //     console.log('authTokenFetch()  error message: \n\n ', err.message);
        // })
    


        // console.log('authTokenFetch(): OK: ', res.status, 'Status Text: ', res.statusText);
        
        // const data = await res.data.json()


        // globalAccessToken = data.access_token;
        // console.log('globalAccessToken in authTokenFetch() post axios.post(): ', globalAccessToken);
        



}


const getBaseUri = async () => {
    console.log('entering getBaseUri() . . . \n\n');
    const res = await axios.get(docuAPIEndpoint, {
        headers: {
            Authorization: `Bearer ${globalAccessToken}`
        }
    })
    

    
    console.log('getBaseUri(): OK: ', res.status, 'Status Text: ', res.statusText);

    const data = await res.data.json()

    globalAccountID = data.accounts[0].account_id;
    globalBaseURI = data.accounts[0].base_uri;
    globalUserInfo = [data.given_name, data.email, data.accounts[0].account_name]
    console.log(`globalAccountID: ${globalAccountID} \n globalBaseURI: ${globalBaseURI} \n 
    globalUserInfo - Name: ${globalUserInfo[0]} \n
    globalUserInfo - Email: $ ${globalUserInfo[1]} \n
    globalUserInfo - Account Name: ${globalUserInfo[2]} \n `);

        // return res.data
    


 
}


export default function Doc() {

    // STEP 1: Extract Code Parameter after DocuSign Login Authorization redirects back to DealFlow
    //Assign to a globalDocuCode string that is exported and available for other components/ pages to use
    const router = useRouter()
    const { code } = router.query
    globalDocuCode = code as string;
    if (globalDocuCode !== undefined) {
        authTokenFetch()

        
    }
    
    // console.log('globalDocuCode: \n ', globalDocuCode);


    // // STEP 2: OAuth Process - API Call to get Access Token from DocuSign
    // if (globalDocuCode !== undefined && globalAccessToken == undefined) {
    //     console.log();
        
    //     authTokenFetch()

    // }

    // // //STEP 3: API Call to get AccountID & Base URI from DocuSign
    // if (globalAccessToken !== undefined && globalAccountID == undefined && globalBaseURI == undefined) {
    //    getBaseUri()
    // }


    // if (globalAccessToken !== undefined && globalAccountID !== undefined && globalBaseURI !== undefined) {
    //     console.log('all items received and set, return to account \n_____________________ \n\n');
        
    //     router.push('/dashboard/account')
    // }
    

    

    return (
        <>
            {
                globalAccessToken!== undefined && globalAccountID!== undefined && globalBaseURI!== undefined?
                    <h1> DocuSign Access Loaded! </h1>                 
                :
                    <h1> Loading DocuSign Access . . . </h1>
            }
        </>
    )

}


// export async function getServerSideProps() {
//     console.log('entering getServerSideProps() in doc.tsx. . . \n\n');
//     console.log('globalDocuCode in ServerSideProps: \n ', globalDocuCode);
    
    
//     if (globalDocuCode !== undefined && globalAccessToken == undefined) {
//         const reqBody = { globalDocuCode, credentials, tokenURI }
//         console.log('authTokenFetch reqBody: \n', JSON.stringify(reqBody));

//             const res = await axios.post(tokenURI, JSON.stringify(reqBody), {
//             headers: {
//                 Authorization: `Basic ${credentials}`
//             }
//             }).then(res => {
//                 console.log('authTokenFetch(): OK: ', res.status, 'Status Text: ', res.statusText);
//                 const data = res.data
//                 globalAccessToken = data.access_token;
//                 console.log('globalAccessToken in authTokenFetch() post axios.post(): ', globalAccessToken);
//             }).catch(err => {
//                 console.log('authTokenFetch()  error message: \n\n ', err.message);
//             })
        
//     }
//     return {
//         props: {
//             hello: 'world'
//         }
//     }
    
// }