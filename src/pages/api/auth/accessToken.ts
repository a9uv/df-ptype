import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export let globalDocuCode: string;
export let globalAccessToken: string;
export let globalAccountID: string;
export let globalBaseURI: string;
export let globalUserInfo: string[];

const integrationKey = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
const envSecretKey = process.env.DOCUSIGN_SECRET_KEY

const tokenURI = 'https://account-d.docusign.com/oauth/token';
const credentials = btoa(`${integrationKey}:${envSecretKey}`);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const docuCode = req.query.code


    if (docuCode !== undefined) {
        const reqBody = new URLSearchParams();
        reqBody.append('grant_type', 'authorization_code');
        reqBody.append('code', docuCode as string);
        const res = await fetch(tokenURI, {
            method: 'POST',
            headers:{
                Authorization: `Basic ${credentials}`
            },
            body: reqBody
        })

        if (!res.ok) {
            throw new Error(`Error getting access token: ${res.statusText}`);
        }

        const data = await res.json()
        globalAccessToken = data.access_token;
        console.log('globalAccessToken in handler(): ', globalAccessToken);
        
    } else {
        console.log('authTokenHandler() - no code')
      
    }

}