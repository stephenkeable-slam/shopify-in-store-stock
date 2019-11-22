class StockChecker {

	constructor(stockCheckOutput) {
		this.outputElement = stockCheckOutput;
	}

	getInventoryIdForVariant(variantElement) {

		var variantId = variantElement.value;
		var variantName = variantElement.getAttribute("data-variant-name");

	  var baseUrl = "YOUR URL TO API GATEWAY";
	  var requestUrl = baseUrl + variantId;

	  var variantRequest = new XMLHttpRequest();

		var self = this;

		self.outputElement.innerHTML = "<div class='grid__item one-whole stock-loading'><img src='/loading.gif' alt='Checking stock'><br>Checking stock...</div>";

	  variantRequest.open('GET', requestUrl, true);

	  variantRequest.onload = function() {
	    if (variantRequest.status == 200) {
	      var variantData = JSON.parse(variantRequest.responseText);
				self.showStockLevelResponse(variantData.response, variantName);


	    } else {
	      self.showVariantError()
	    }
	  }

	  variantRequest.onerror = function() {
	    self.showVariantError();
	  }

	  variantRequest.send();
	}

	showStockLevelError() {
		// TODO - Better error handling
	  self.outputElement.innerHTML = "<div class='grid__item one-whole stock-error'>Error checking stock, please try again.</div>";
	}

	showVariantError() {
		// TODO - Better error handling
	  self.outputElement.innerHTML = "<div class='grid__item one-whole stock-error'>Error checking stock, please try again.</div>";
	}

	showStockLevelResponse(stockLevelData, variantName) {

		var self = this;

	  var stockCount = stockLevelData.length;

		self.outputElement.innerHTML = "";

		var outputArray = [];
	  var locationsToUse = this.locations;

		outputArray.push("<div class='grid__item one-whole stock-variant-name'>"+variantName+"</div>");

	  // Loop through response
	  for (var i = 0; i < stockCount; i++) {
			var availableString = "Sold Out";
			var availableClass = " stock-out";
			if(stockLevelData[i].available == true) {
				availableString = "In Stock;
  			availableClass = " stock-in";
			}
      // Assumes there is a page for the Location with a slug/handle matching location name
      var storeLink = "/pages/" + self.slugify(stockLevelData[i].name);

	    outputArray.push("<div class='grid__item one-third"+availableClass+"'><span class='stock-location-name'>" + stockLevelData[i].name + "</span><span class='stock-availability'>" + availableString + "</span><span class='stock-store-link'><a href='"+storeLink+"'>Store Details</a></span></div>");
	  }

		self.outputElement.innerHTML = outputArray.join("\n");

	}
   slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
}
