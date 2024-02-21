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
    
    const reqBody = { globalDocuCode, credentials, tokenURI }
    

    try {
        const res = await axios.post(tokenURI, JSON.stringify(reqBody), {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        })
    

        if (!res.data) {
            throw new Error('No data returned from DocuSign');
        }
        
        console.log('authTokenFetch(): OK: ', res.status, 'Status Text: ', res.statusText);
        
        return res.data
    } catch (error) {
        console.error('authTokenFetch(): Error:', error);
        throw error; // Re-throw for error handling in caller
    }

}


const getBaseUri = async () => {
    console.log('entering getBaseUri() . . . \n\n');
    const res = await axios.get(docuAPIEndpoint, {
        headers: {
            Authorization: `Bearer ${globalAccessToken}`
        }
    }).then((res) => {
        const data = res.data.json()
        globalAccountID = data.accounts[0].account_id;
        globalBaseURI = data.accounts[0].base_uri;
        globalUserInfo = [data.given_name, data.email, data.accounts[0].account_name]
        console.log(`globalAccountID: ${globalAccountID} \n globalBaseURI: ${globalBaseURI} \n 
        globalUserInfo - Name: ${globalUserInfo[0]} \n
        globalUserInfo - Email: $ ${globalUserInfo[1]} \n
        globalUserInfo - Account Name: ${globalUserInfo[2]} \n `);

        return res.data
    }).catch((err) => {
        console.log('getBaseUri(): Error:', err);
    })

 
}


export default function Doc() {

    // STEP 1: Extract Code Parameter after DocuSign Login Authorization redirects back to DealFlow
    //Assign to a globalDocuCode string that is exported and available for other components/ pages to use
    const router = useRouter()
    const { code } = router.query
    globalDocuCode = code as string;
    console.log('globalDocuCode: \n ', globalDocuCode);


    //STEP 2: OAuth Process - API Call to get Access Token from DocuSign
    if (globalDocuCode !== undefined && globalAccessToken == null) {
        
        authTokenFetch().then((data) => {
            globalAccessToken = data.access_token;
            console.log('globalAccessToken: \n ', globalAccessToken);       
        }).catch((error) => {
            console.error('error: ', error);
        })

    }

    //STEP 3: API Call to get AccountID & Base URI from DocuSign
    if (globalAccessToken !== undefined && globalAccountID == null && globalBaseURI == null) {
       getBaseUri().then((data) => {
            console.log('getBaseUri(): data: ', data);
        }).catch((error) => {
            console.error('error: ', error);
        })
    }


    if (globalAccessToken !== undefined && globalAccountID !== undefined && globalBaseURI !== undefined) {
        console.log('all items received and set, return to account \n_____________________ \n\n');
        
        router.push('/dashboard/account')
    }
    

    

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