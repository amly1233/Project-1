// function getUserName(){
//     fetch("/api/user").then(function(response){
//         return response.json()
//     }).then(function(user_result){
//         console.log(user_result)
//         let username = user_result['data']['name'];
//         document.querySelector('#member-name').textContent = username;

//     })
// }

function booking(){
    let booking_date = document.querySelector(".inputDate").value;

    let book_morning = document.querySelector("#morning:checked");
    let book_afternoon = document.querySelector("#afternoon:checked");
    let booking_price;
    let booking_time;
    if (book_morning == null) {
        booking_price = 2500;
        booking_time = "afternoon";
    }else if (book_afternoon == null){
        booking_price = 2000;
        booking_time = "morning";
    }

    fetch("/api/booking",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "attractionId": attractionID,
            "date": booking_date,
            "time": booking_time,
            "price": booking_price
          })
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)
        let bookingDone = result['ok'];
        let bookingFailed = result['error'];
        if (bookingDone){
            window.location.href = '/booking';
            getBookingInfo();
        }else if (bookingFailed){
            alert (result['message']);
        }else {
            alert ("ERROR");
        }


    })



}



function getBookingInfo(){


    fetch("/api/booking", {method:'GET'}).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)

        if (result['error']){
            if (result['message']=="無預定資料"){

                let noSelect = document.querySelector('.cart');
                noSelect.textContent = '目前沒有任何待預訂的行程';

            }else if (result['message']=="尚未登入"){
                let notSigninText = document.querySelector('.booking-main-content');
                notSigninText.textContent = '您尚未登入系統';
                
            }

        }else if (result['data']){
            console.log(result['data']['attraction']['name'])

            if (result['data']!== null ){
                
                console.log(result.data)
                // put all booking info in
                let imgBox = document.createElement('img'); //創一個盒子
                imgBox.src = result['data']['attraction']['image']; //放URL進去
                document.querySelector('.booking-img').textContent = '' // 放到網頁特定位子
                document.querySelector('.booking-img').appendChild(imgBox) // 放到網頁特定位子



                let bookingTitle = document.getElementById('booking-title');
                bookingTitle.textContent = result['data']['attraction']['name'];
                let bookingDate = document.querySelector("#booking-date");
                bookingDate.textContent = result['data']['date'];
    
                let tourtime;
                let tourfee;
                if (result['data']['time']== "morning"){
                    tourtime = "早上 9 點到下午 4 點";
                    tourfee = 2000;
    
                }else if (result['data']['time']== "afternoon"){
                    tourtime = "下午 2 點到晚上 9 點";
                    tourfee = 2500;
    
                }
                let bookingTime = document.querySelector("#booking-time");
                bookingTime.textContent = tourtime;
                let bookingFee = document.querySelector("#booking-fee");
                bookingFee.textContent = tourfee;
                let bookingAddress = document.querySelector("#booking-address");
                bookingAddress.textContent = result['data']['attraction']['address'];
    
                let totalFee = document.querySelector("#total-price");
                totalFee.textContent = tourfee;
    
                

            }else{
                let noSelect = document.querySelector('.cart');
                noSelect.textContent = '目前沒有任何待預訂的行程';
            }
        }
        
    })

}

function deleteBooking(){
    fetch('/api/booking',{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log(result)

        let noSelect = document.querySelector('.cart');
        noSelect.textContent = '目前沒有任何待預訂的行程';



}
)}

function confirmBooking(){
    let contactName = document.querySelector('#contact-name').value;
    let contactEmail = document.querySelector('#contact-email').value;
    let contactNumber = document.querySelector('#contact-number').value;

    fetch('/api/orders',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            "contactName":contactName,
            "contactEmail":contactEmail,
            "contactNumber":contactNumber
        })
    }).then(function(response){
        return response.json()
    }).then(function(result){
        console.log (result)

        let bookingDone = result['ok'];
        let bookingFailed = result['error'];
        if (bookingDone){
            window.location.href = "/thankyou";
        }else if (bookingFailed){
            alert (result['message']);
        }else {
            alert ("ERROR");
        }

}

)}



