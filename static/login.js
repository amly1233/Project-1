///////////////////////////////////////
// SIGN IN & SIGN UP - POP UP SETTING//
///////////////////////////////////////

// 按叉叉把登入視窗關掉
function closePopup() {
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "none";
}
  
// 點擊登入跳出登入
function signin(){
    document.querySelector(".signup").style.display = "none";
    document.querySelector(".signin").style.display = "block";
}
  
// 點擊註冊帳戶
function signup(){
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "block";
}

// 
fetch("/api/user").then(function(response){
    return response.json()
}).then(function(result){
    console.log(result)


})

// Sign in 
function usersignin(){
    // usersignout();
    let signinEmail = document.getElementById("signinEmail").value;
    let signinPassword = document.getElementById("signinPassword").value;
    console.log(signinEmail)
    console.log(signinPassword)
    fetch('/api/user',{
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "email":signinEmail,
            "password":signinPassword
        })
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)
    })





}





// Sign up
function usersignup(){
    let signupName = document.getElementById("signupName").value;
    let signupEmail = document.getElementById("signupEmail").value;
    let signupPassword = document.getElementById("signupPassword").value;
    console.log(signupName, signupEmail,signupPassword)
    fetch('/api/user',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "name":signupName,
            "email":signupEmail,
            "password":signupPassword
        })
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)
    })





}





// Sign out
// function usersignout(){
//     // let signupName = document.getElementById("signupName").value;
//     // let signupEmail = document.getElementById("signupEmail").value;
//     // let signupPassword = document.getElementById("signupPassword").value;
//     // console.log(signupName, signupEmail,signupPassword)
//     let signoutName = "Amy";
//     let signoutEmail = "fish1192@hotmail.com";
//     let signoutPassword = "1234";


//     fetch('/api/user',{
//         method:'DELETE',
//         headers:{
//             'content-type':'application/json'
//         },
//         body: JSON.stringify({
//             "name":signoutName,
//             "email":signoutEmail,
//             "password":signoutPassword
//         }),
//     }).then(function(response){
//         return response.json()
//     }).then(function(result){
//         console.log(result)
//     })





}

// usersignout();




