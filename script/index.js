/*

    login page 

*/
let login_btn = document.querySelector("#login");
let username_input = document.querySelector("#username");
let password_input = document.querySelector("#password");
let alert = document.querySelector(".alert");

login_btn.addEventListener("click", (e) => {
    e.preventDefault()

    const username = username_input.value;
    const password = password_input.value;
    // console.log(username);
    let user = validUser(username);

    if(user.length > 0) {
        if(user[0].password == password) {
            localStorage.setItem("nickname", user[0].nickname);
            open('home.html', "_self");
        }
        else {
            // alert("Password salah");
            alert.innerText = "Password Salah";
            alert.style.display = "block";
        }
    }
    else {
        alert.innerText = "Akun Tidak Ditemukan";
        alert.style.display = "block";
    }

    username_input.value = "";
    password_input.value = "";  
    
})

function validUser(username) {
    let request = new XMLHttpRequest();
    let validUser = [];
    request.open("GET", "../data/users.json", false);
    request.onload = () => {
        const response = JSON.parse(request.response);
        // console.log(response);
        let users = response["Users"];
        // console.log(users)

        for(let i = 0; i < users.length; i++) {
            if(username == users[i].username) validUser.push(users[i]);
        }
    }

    request.send();

    return validUser;
}
/*
    
    end of login page

*/



/*

    index page

*/

