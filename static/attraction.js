let  attractionID;

async function getData(){
    attractionID = window.location.pathname.split('/');
    attractionID = attractionID[2];
    let res = await fetch(`/api/attraction/${attractionID}`);

}

getData();




function displayInfo() {
    let src = `${window.origin}/api/attraction/${attractionID}`;
    fetch(src)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        console.log(result["data"]["name"]);
        
        // 景點名稱 box
        let profileName = document.createElement("div"); //創一個盒子
        let attraction_name = document.createTextNode(result["data"]["name"]); //準備要放進去的內容
        
        profileName.className="profileName";
        profileName.appendChild(attraction_name); //把文字放進盒子裡
        document.querySelector(".profileInfo").appendChild(profileName);  //把盒子放進網頁裡的特定位子

        // 景點資訊 box
        let profileCategory = document.createElement("div");
        let attraction_category = document.createTextNode(result["data"]["category"]+"  at  "+result["data"]["mrt"]);

        profileCategory.className="profileCategory";
        profileCategory.appendChild(attraction_category);
        document.querySelector(".profileInfo").appendChild(profileCategory);

        // 景點敘述
        let infoDescription = document.createElement("div"); 
        let description = document.createTextNode(result["data"]["description"]);

        infoDescription.className = "info-content";
        infoDescription.appendChild(description);
        document.querySelector(".description").appendChild(infoDescription);


        // 景點地址
        let attractionAddress = document.createElement("p");
        let address = document.createTextNode(result["data"]["address"]);

        attractionAddress.className = "info-content";
        attractionAddress.appendChild(address);
        document.querySelector(".address").appendChild(attractionAddress);

        console.log (address);

        // 交通方式
        let attractionTransport = document.createElement("p");
        let transport = document.createTextNode(result["data"]["transport"]);

        attractionTransport.className = "info-content";
        attractionTransport.appendChild(transport);
        document.querySelector(".transport").appendChild(attractionTransport);

        console.log (transport);


      });
}

displayInfo();


// 選擇不同時段，價錢顯示設定
let morning = document.getElementById("morning");
let afternoon = document.getElementById("afternoon");

let price20 = document.getElementById("price20");
let price25 = document.getElementById("price25");

let price = document.querySelector("#price");

morning.addEventListener('click', function(e){
  price20.style.display="inline-block";
  price25.style.display="none"; 
})

afternoon.addEventListener('click', function(e){
  price20.style.display="none";
  price25.style.display="inline-block"; 
})




// Carousel 輪播設定
let totalSlides;

// 把圖片一個一個放進去
function getImg(){
  let src = `${window.origin}/api/attraction/${attractionID}`;
  fetch(src)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      
      let imageStr = result["data"]["images"];
      let images = eval(imageStr);

      // Create first display image 
      let img_box1 = document.createElement("div");
      let first_img = document.createElement("img");
      first_img.src = images[0];
      img_box1.className = "carousel_item carousel_item_visible";

      img_box1.appendChild(first_img);
      document.querySelector(".profileImg").appendChild(img_box1);

      
      totalSlides = images.length;
      console.log(totalSlides);
 
      // 把其他所有圖片放進去再隱藏起來
      for (let i=1; i < totalSlides; i++) {
        let img_box = document.createElement("div"); //create a box for img
        let img = document.createElement("img");
        img.src = images[i];
        img_box.className = "carousel_item";
        
        img_box.appendChild(img);
        document.querySelector(".profileImg").appendChild(img_box);

        console.log (images[i]);
      

      }

      let slidePosition = 0;
      const slides = document.getElementsByClassName('carousel_item');
      
      function updateSlidePosition(){
        for (let slide of slides){
          slide.classList.remove("carousel_item_visible");
          slide.classList.add("carousel_item_hidden");
        }
        slides[slidePosition].classList.add("carousel_item_visible");
      }
      
      function toNextSlide(){
        if (slidePosition==totalSlides-1){
          slidePosition = 0;
        }else{
          slidePosition++;
        }
        updateSlidePosition();
      }
      
      
      function toPrevSlide(){
        if (slidePosition==0){
          slidePosition = totalSlides-1;
        }else{
          slidePosition--;
        }
        updateSlidePosition();
      
      }
      
      document.getElementById("rightArrow").addEventListener('click',function(){
        toNextSlide();
      });
      
      
      document.getElementById("leftArrow").addEventListener('click',function(){
        toPrevSlide();
      });
      

    });
}

getImg();






