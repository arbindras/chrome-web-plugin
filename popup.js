document.addEventListener("DOMContentLoaded", () => {
  // Query the active tab to get product details
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getProductDetails" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          document.getElementById("product-name").textContent =
            "Error retrieving product details.";
        } else {
          // Display product details in the popup
          document.getElementById("product-name").textContent = response.name;
          document.getElementById("product-price").textContent = response.price;
          document.getElementById("product-image").src = response.image;

          // Display similar products
          displaySimilarProducts(response.similarProducts);
        }
      }
    );
  });
});

// Function to display similar products in the popup
function displaySimilarProducts(products) {
  const similarProductsDiv = document.getElementById("similar-products-list"); // this ID exists in popup.html
  similarProductsDiv.innerHTML = "";

  if (products.length === 0) {
    similarProductsDiv.textContent = "No similar products found.";
    return;
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "similar-product";

    const productLink = document.createElement("a");
    productLink.href = product.url;
    productLink.textContent = product.text;
    productLink.target = "_blank";

    productDiv.appendChild(productLink);
    similarProductsDiv.appendChild(productDiv);
  });
}
