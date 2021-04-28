let src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json";
fetch (src).then(function(response){
    return response.text();
}).then(function(result){
    console.log(result);
})