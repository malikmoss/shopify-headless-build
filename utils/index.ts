//import { json } from "stream/consumers";

import { json } from "stream/consumers"

export async function storefront(query:any, variables = {}) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL!,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_ACCESS_TOKEN!
            },
            body: JSON.stringify({ query, variables })
        })
        return await response.json()
} catch(error){
    console.log(error)
}}