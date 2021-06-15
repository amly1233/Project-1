///////////////////////////////////////
// SIGN IN & SIGN UP - POP UP SETTING//
///////////////////////////////////////

// 按叉叉把登入視窗關掉
function closePopup() {
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "none";
    

    let overlay_background = document.getElementById("popup_overlay");
    overlay_background.classList.remove("overlay");

    window.location.reload()

}
  
// 點擊登入跳出登入
function signin(){
    document.querySelector(".signup").style.display = "none";
    document.querySelector(".signin").style.display = "block";
    
    let overlay_background = document.getElementById("popup_overlay");
    overlay_background.classList.add("overlay");

}
  
// 點擊註冊帳戶
function signup(){
    document.querySelector(".signin").style.display = "none";
    document.querySelector(".signup").style.display = "block";
}


// Check already signin or not, display the signin signout btn
fetch("/api/user").then(function(response){
    return response.json()
}).then(function(result){
    console.log(result)

    if (result['data'] == null){
        document.querySelector(".signout-nav").style.display = "none";
        document.querySelector(".signin-nav").style.display = "block";
        console.log ('NOT log in ');
    }else{
        document.querySelector(".signin-nav").style.display = "none";
        document.querySelector(".signout-nav").style.display = "block";
        console.log ('is log in ');

        // for booking page username
        let username = result['data']['name'];
        document.querySelector('#member-name').textContent = username;
    }


})

// Sign in 
function usersignin(){
    let signinEmail = document.getElementById("signinEmail").value;
    let signinPassword = document.getElementById("signinPassword").value;
    console.log(signinEmail)
    console.log(signinPassword)
    fetch("/api/user",{
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "signinEmail":signinEmail,
            "signinPassword":signinPassword
        })
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)
        let signinDone = result['ok'];
        let signinFailed = result['error'];
        let signinMsg = document.getElementById("signin-message");
        signinMsg.textContent="";
        if (signinDone){
            signinMsg.textContent='登入成功';
            signinMsg.style.color = '#4aa96c';

            // window.location.reload()
        }else if (signinFailed) {
            signinMsg.textContent=result['message'];
        }else{
            signinMsg.textContent="Fail";
        }
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
        let signupDone = result['ok'];
        let signupFailed = result['error'];
        let signupMsg = document.getElementById("signup-message");
        signupMsg.textContent="";
        if (signupDone){
            signupMsg.textContent='註冊成功，請登入。';
            signupMsg.style.color = '#4aa96c';
            // window.location.reload()
        }else if (signupFailed) {
            signupMsg.textContent = result['message'];
        }else{
            signupMsg.textContent = "Fail";
        }

    })

}



// Sign out
function usersignout(){

    fetch('/api/user',{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)
        window.location.href = "/"

    })

}





