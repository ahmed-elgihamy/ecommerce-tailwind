let myHttp=new XMLHttpRequest();
let  product_id = window.location.search.split("?")[1].split("=")[1];
function getProduct(product_id) {
    myHttp.open("GET", `https://fakestoreapi.com/products/${product_id}`, true);
    myHttp.addEventListener("readystatechange", function(){
    console.log(myHttp.readyState);
    if(myHttp.readyState == 4 && myHttp.status == 200){
        displayProduct(JSON.parse(myHttp.response));
    }
});

myHttp.send();
}
getProduct(product_id);

let next=document.querySelector("#next");
let previous=document.querySelector("#previous");
next.addEventListener("click",function(){
    product_id++;
    getProduct(product_id);
});
previous.addEventListener("click",function(){
   if(product_id>1)
   {
    product_id--;
    getProduct(product_id);
   }
   
});

function displayProduct(product)
{
    if (product) {
        quentity = 1; 
        document.querySelector("#quantity").innerHTML = quentity;
        document.querySelector(".product-image").src = product.image;
        document.querySelector(".product-title").innerHTML = product.title;
        document.querySelector(".product-price").innerHTML = `$${product.price}`;
        document.querySelector(".product-description").innerHTML = product.description || "No description available.";
       document.querySelector(".product-rating").innerHTML = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`;
        DisplayRating(product.rating.rate)
    }
}



 // rating star //////////////////////
function DisplayRating(rating) 
    {
        const stars=5;
    let output = '';
    const fullStars = Math.floor(rating);  
    const hasHalfStar = rating % 1 !== 0;  
    const emptyStars = stars - fullStars - (hasHalfStar ? 1 : 0); 
    for (let i = 1; i <= fullStars; i++) {
        output += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
    }
    if (hasHalfStar) {
        output += '<i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i>';
    }
    for (let i = 1; i <= emptyStars; i++) {
        output += '<i class="fa-regular fa-star" style="color: #FFD43B;"></i>';
    }
    document.querySelector("#rate").innerHTML = output;

    }

let quentity=1;
function increaseItem() {
    quentity++;
    document.querySelector("#quantity").innerHTML = quentity;
}
function decreaseItem() {
    if (quentity > 1) {
        quentity--;
        document.querySelector("#quantity").innerHTML = quentity;
    }
}




//============================================================///////////////////////////////////////
let myhttp=new XMLHttpRequest();
myhttp.open("GET", "https://fakestoreapi.com/products/categories", true);
myhttp.send();
myhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i] === "electronics") {
        document.getElementById("card").innerHTML += `<a href="https://google.com" target="_blank">
      <div class="border-2 border-gray-300 rounded-lg p-4 m-4">
            <img class="w-52 h-72" src="assets/e.png"/> 
            <h2 class="text-center">${data[i]}</h2> </div></a>`;
      } else if (data[i] === "jewelery") {
        document.getElementById("card").innerHTML += `<a href="https://google.com" target="_blank">
       <div class="border-2 border-gray-300 rounded-lg p-4 m-4"> 
        <img class="w-52 h-72" src="assets/jew.jfif"/>
         <h2 class="text-center">${data[i]}</h2></div></a>`;
      } else if (data[i] === "men's clothing") {
        document.getElementById("card").innerHTML += `<a href="https://google.com" target="_blank">
        <div class="border-2 border-gray-300 rounded-lg p-4 m-4">
    <img class="w-52 h-72" src="assets/men.jfif"/> 
    <h2 class="text-center">${data[i]}</h2> </div>
    </a>`;
      } else if (data[i] == "women's clothing") {
        document.getElementById("card").innerHTML += ` <a href="https://google.com" target="_blank">
        <div class="border-2 border-gray-300 rounded-lg p-4 m-4">
    <img class="w-52 h-72" src="assets/women.jfif"/>
    <h2 class="text-center">${data[i]}</h2></div> </a>`;
      }
    }
  }
};