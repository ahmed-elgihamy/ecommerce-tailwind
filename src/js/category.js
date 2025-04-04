var demo = document.getElementById("demo");
var searchTerm = document.getElementById("searchInput");

var data = [];

const urlParams = new URLSearchParams(window.location.search);

const text = urlParams.get("category");
console.log(text);

if (text) {
  getCategory(text);
} else {
  getCategory("jewelery");
}

function getCategory(cat) {
  var https = new XMLHttpRequest();
  console.log(cat);

  https.open("GET", `https://fakestoreapi.com/products/category/${cat}`, true);
  https.send();

  https.addEventListener("load", function () {
    data = JSON.parse(https.response);
    displayCards(data);
  });
}

function displayCards(data) {
  var categories = "";

  if (data.length === 0) {
    demo.innerHTML = `
      <p class="text-rose-600 mt-10 text-center p-5 bg-red-300">
        Sorry, no products available in this category.
      </p>
    `;
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var rating = data[i].rating.rate;
    var stars = "";

    for (let j = 0; j < Math.floor(rating); j++) {
      stars += "★";
    }

    if (rating % 1 !== 0) {
      stars += "☆";
    }

    for (let j = stars.length; j < 5; j++) {
      stars += "☆";
    }

    categories += `
      <div class="relative flex   w-96 flex-col rounded-xl bg-white text-gray-700 shadow-md my-2 mt-8 border border-gray-900 cursor-pointer ">
        <div class="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl pl-8">
          <img src="${data[i].image}" alt="${data[i].title}" class="h-[350px] w-[300px]" />
        </div>
        <div class="p-6">
          <div class="mb-2 flex items-center justify-between">
            <p class="text-lg font-medium text-blue-gray-900">${data[i].title}</p>
            <p class="text-lg font-medium text-green-600">$${data[i].price}</p>
          </div>
          <p class="text-sm text-gray-700">${data[i].description}</p>
          <p class="mt-2 text-sm text-yellow-600">
            Rating: <span class="text-yellow-500">${stars}</span> (${data[i].rating.count} reviews)
          </p>
        </div>
      </div>
    `;
  }

  demo.innerHTML = categories;
}
searchTerm.addEventListener("keydown", function () {
  if (searchTerm.value === "") {
    displayCards(data);
    return;
  }

  var t = searchTerm.value.toLowerCase();
  var filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(t)
  );

  if (filteredData.length !== 0) {
    displayCards(filteredData);
  } else {
    demo.innerHTML = `
      <p class="text-rose-600 mt-10 text-center p-5 bg-red-300">
        Sorry, we couldn't find any products matching your search. You might want to try again with a correct spelling or use more general search terms.<br>
        Check the product pages for other purchase options or different categories that may contain the products you're looking for.
      </p>
    `;
  }
});
