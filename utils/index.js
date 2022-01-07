import { json } from "stream/consumers";

export async function storefront(query, variables = {}) {
    const response = await fetch (
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-tOKEN": access_toke
            },
            BODY: json.STRINGIFY({ query, variable })
        })
        return response.json()
}