import React, { useState, useEffect } from 'react';
import { HmacSHA1, enc } from 'crypto-js';

const timestamp = Date.now();
const endpoint = 'https://ziotitanok.it/tbm/api/';
const email = 'test@test.com';
const publicKey = 'qwerty';
const privateKey = '1234';
const message  = timestamp + email;

const hash = HmacSHA1(message, privateKey).toString(enc.Hex);
const signature = btoa(hash);

const method = 'check_identity';

function Api() {
    const [data, setData] = useState('');
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: {
                    method: method,
                    publickey: publicKey,
                    signature: signature,
                    timestamp: timestamp,
                },
                headers: { 
                    'Content-Type': 'application/json' }
            });

            console.log(response);
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }
    return <div>{JSON.stringify(data)}</div>;
}

export default Api;
