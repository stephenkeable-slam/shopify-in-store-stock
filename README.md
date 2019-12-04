# Shopify In Store Stock Checker

Example Lambda script and on site JS for an in store stock checker for Shopify stores.

Mainly for Shopify store with [Locations](https://help.shopify.com/en/manual/locations) enabled, so customers can see which stores an item is in stock at.

![Example UI](https://cdn-images-1.medium.com/max/1200/1*SFKgyqVX4_TER3XHdkmNeg.gif)

Intended as starting blocks to building your own in store stock checker, similar to the one in use on www.slamcity.com.

Basic architecture: Lambda JavaScript file, exposed via API gateway, then called from JS on the Shopify product page.

Front end UI code should really make use of [locales](https://help.shopify.com/en/themes/development/theme-store-requirements/internationalizing/translation-filter) for any strings like the "Checking stock" text.

[Brief medium article about the stock checker](https://medium.com/@stephenkeable/shopify-in-store-stock-checker-6ef364a50d52)
