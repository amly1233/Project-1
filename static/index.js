let page = 1;
let keyword='';
let nextPage = '';

getDataByPage(); //載入第一次資料

window.addEventListener('scroll', (event)=>{
  if (nextPage!=null){
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
      getDataByPage();
    }
  }
})


function getDataByPage(){
  let src;
  if (page!=null & keyword==''){
    src = `${window.origin}/api/attractions?page=${page}`;
  }else if (page!=null & keyword!=null){
    src = `${window.origin}/api/attractions?page=${page}&keyword=${keyword}`;
  }

  fetch(src).then(function(response){
    return response.json(); 
  })
  .then(function(result){
    nextPage=result["nextPage"];
    
    let img;
    if (result["data"]==""){
      document.getElementById('attractions').innerHTML="查無資料";
    }
    else if (result["data"]!==null){
      for (let i = 0; i < result["data"].length; i++) {

        img = result["data"][i]["images"].split("http", 2);
        img = img[1].split(" ",2);
        img = img[0].slice(0,-2);
  
        // Create a box
        let container=document.createElement("div");
        container.className="attractionContainer";

        // Create a link for each spot  
        let spotlink = document.createElement("a");
        spotlink.href =  "/attraction/"+result["data"][i]["id"];
  
        let image = document.createElement("img");
        image.className="attractionImg";
        image.src="http"+img; 
  
        let spotName=document.createElement("h3");
        spotName.textContent = result["data"][i]["name"];
        spotName.className = "attractionName";
  
        let category_mrt = document.createElement("div");
        category_mrt.className = "attractionCatMrt";
  
  
        let mrt=document.createElement("p");
        mrt.textContent = result["data"][i]["mrt"];
        mrt.className = "attractionMrt";
  
        let category = document.createElement("p");
        category.textContent = result["data"][i]["category"];
        category.className = "attractionCategory";
  
        let element=document.getElementById("attractions");
      
        element.appendChild(container);
        container.appendChild(spotlink);
        spotlink.appendChild(image);
        spotlink.appendChild(spotName);
        spotlink.appendChild(category_mrt);
        category_mrt.appendChild(mrt);
        category_mrt.appendChild(category);
      }

    }
    page=nextPage;

  }).catch((error)=>{
    document.getElementById('attractions').innerHTML="Error";
  })
}


let btn = document.getElementById("search-btn");
btn.addEventListener('click',(event)=>{
  event.preventDefault();
  keyword = document.querySelector("#keyword").value;
  console.log(keyword);
  page = 0;
  document.getElementById('attractions').innerHTML="";
  getDataByPage();
})








