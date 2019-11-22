const request = require('request');

const apiToken = process.env.apiToken;

const storeName = "your-store.myshopify.com";
const baseUrl = "https://" + storeName + "/admin/api/graphql.json";

function checkStock(variantId, callback) {

  const requestUrl = baseUrl;

  const requestBody = "{ productVariant (id: \"gid://shopify/ProductVariant/" + variantId + "\") { inventoryItem { inventoryLevels(first: 3) { edges { node { available, location { name } } } } } } }";

  request.post({
    'url': requestUrl,
    'headers': {
      'content-type': "application/graphql",
      'X-Shopify-Access-Token' : apiToken
    },
    'body': requestBody
  },
  function(err,httpResponse,body){
    if(err) {
      console.log("requestError");
      emitResponse(variantId, [], callback);
    } else {
      var data = body;
      try {
        const result = JSON.parse(data);
        const levels = result.data.productVariant.inventoryItem.inventoryLevels.edges;
        let locations = [];
        
        // Looping over response to build simplified response array
        levels.forEach(function(item) {
          // Reducing inventory number down to simple boolean
          let available = false;
          if (item.node.available > 0) { available = true }
          
          const location = {
            "name": item.node.location.name,
            "available": available
          }
          locations.push(location);
        });
        
        emitResponse(variantId, locations, callback);
      } catch (e) {
        console.log(e);
        emitResponse(variantId, [], callback);
      }
    }
  });

}

function emitResponse(variantId, result, callback) {

  callback(null, {
    "response": result
  });
}

exports.handler = function(event, context, callback) {

  checkStock(event.variantId, callback);

};
