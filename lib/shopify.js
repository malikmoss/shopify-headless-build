const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2021-07/graphql.json`


  // ShopifyData will make a POST request to the Shopify Storefront GraphQL API using the set headers and return the json response.
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error("Products not fetched")
  }
}

export async function getAllProducts() {
  const query = `
  {
  products(first: 25) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 5) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
}
`

// ShopifyData function will return the data to the getAllProducts function which will set it equal to the allProducts variable.

  const response = await ShopifyData(query)

  const allProducts = response.data.products.edges ? response.data.products.edges : []

  return allProducts
}