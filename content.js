function extractProductDetails() {
  // Product Name
  let productName =
    document.querySelector("h1.product-detail-info__header-name")?.innerText ||
    "N/A";

  // Product Price
  let productPrice =
    document.querySelector("span.money-amount__main")?.innerText || "N/A";

  // Product Image
  let productImage =
    document.querySelector("ul.product-detail-images__images img")?.src ||
    "N/A";

  // Similar Products (Extract links from the li > ul structure)
  let similarProductLinks = [];
  const anchors = document.querySelectorAll("ul li a.product-link");

  // Use a for loop to iterate through the NodeList
  for (let i = 0; i < anchors.length && similarProductLinks.length < 10; i++) {
    const anchor = anchors[i];
    similarProductLinks.push({
      url: anchor.href,
      text: anchor.innerText.trim() || anchor.href,
    });
  }

  console.log("Product Name: " + productName);
  console.log("Product Price: " + productPrice);
  console.log("Product Image: " + productImage);
  console.log("Similar Products: ", similarProductLinks);

  return {
    name: productName,
    price: productPrice,
    image: productImage,
    similarProducts: similarProductLinks,
  };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProductDetails") {
    const productDetails = extractProductDetails();
    sendResponse(productDetails);
  }
});
