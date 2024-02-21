let accTokenMemory: string;
let baseURI: string;
let accountId: string;
const integrationKey = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
const envSecretKey = process.env.DOCUSIGN_SECRET_KEY
const tokenURI = 'https://account-d.docusign.com/oauth/token';
const credentials = btoa(`${integrationKey}:${envSecretKey}`);

export async function getAccessToken(code: string | string[], credentials: string) {
        try {

            const reqBody = new URLSearchParams();
            const tokenURI = 'https://account-d.docusign.com/oauth/token';
            reqBody.append('grant_type', 'authorization_code');
            reqBody.append('code', code);

            const res = await fetch(tokenURI, {
                method: 'POST',
                headers:{
                    Authorization: `Basic ${credentials}`
                },
                body: reqBody
            })
                
           
            console.log('\n accessJson:', res.json());
            // accTokenMemory = accessJSON.accessToken
            accountId = '34b4257c-670b-4966-9310-24ccc31f0dae'
            baseURI = 'https://demo.docusign.net/'
            return res.json()

            } catch (error) {
                console.error('Error for a-token')
            }

}