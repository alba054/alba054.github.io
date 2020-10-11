/*

    login page 

*/

const login_btn = document.querySelector("#login");
const register_btn = document.querySelector("#add");
const alert = $(".modal");
const login_form = $(".login-form");
const registration_form = $(".registration-form");
let username_input = document.querySelector("#username");
let password_input = document.querySelector("#password");
let username_register = document.querySelector("#username-register");
let password_register = document.querySelector("#password-register");
let nickname_register = document.querySelector("#nickname-register");

// alert default behaviour
function alertDo(msg) {
    alert.show(400);
    $(".exit").click(() => alert.hide(400));
    $(".modal-body").text(msg);
}

$("#register").click(function() {
    login_form.hide();
    registration_form.show();
});

$("#back-link").click(function() {
    login_form.show();
    registration_form.hide();
})

$(document).ready(function() {
    login_btn.disabled = true;

    password_input.addEventListener("keyup", function() {
        // console.log("dipencet");
        if(password_input.value.length >= 6 && username_input.value.length != 0) login_btn.disabled = false;
        else login_btn.disabled = true;
    })
    username_input.addEventListener("keyup", function() {
        // console.log("dipencet");
        if(password_input.value.length >= 6 && username_input.value.length != 0) login_btn.disabled = false;
        else login_btn.disabled = true;
    })

    login_btn.addEventListener("click", (e) => {
        e.preventDefault()
    
        const username = username_input.value;
        const password = password_input.value;
        // console.log(username);
        let user = login(username);
    
        if(user.length > 0) {
            if(user[0].password == password) {
                localStorage.setItem("nickname", user[0].nickname);
                open('home.html', "_self");
            }
            else {
                alertDo("Password Salah");
            }
        }
        else {
            alertDo("Akun Tidak Ditemukan")
        }
    
        username_input.value = "";
        password_input.value = "";
        login_btn.disabled = true;  
        
    })


    register_btn.addEventListener("click", function() {
        const username = username_register.value;
        const password = password_register.value;
        const nickname = nickname_register.value;

        if(registration(username, password, nickname)) {
            alertDo("Registrasi berhasil");
        }
        else {
            alertDo("Username sudah dipakai");
        }

    })
})



// function validUser(username) {
//     let request = new XMLHttpRequest();
//     let validUser = [];
//     request.open("GET", "../data/users.json", false);
//     request.onload = () => {
//         const response = JSON.parse(request.response);
//         // console.log(response);
//         let users = response["Users"];
//         // console.log(users)

//         for(let i = 0; i < users.length; i++) {
//             if(username == users[i].username) validUser.push(users[i]);
//         }
//     }

//     request.send();

//     return validUser;
// }

// login validation
function login(username) {
    // let valid_user = [];
    if(localStorage.getItem("users") == null) {
        return [];
    }
    
    const raw_users = JSON.parse(localStorage.getItem("users"));
    console.log(raw_users[0].username);

    let valid_user = raw_users.filter(user => user.username == username);
    
    console.log(valid_user);

    return valid_user;
}

// add new user
function registration(username, password, nickname) {
    if(localStorage.getItem("users") == null) {
        localStorage.setItem("users", JSON.stringify([]));
    }

    const new_user = {
        username:username,
        password:password,
        nickname:nickname
    };
    

    const raw_users = localStorage.getItem("users");
    const users = JSON.parse(raw_users);

    for(let i = 0; i < users.length; i++) {
        if(users[i].username == username) {
            console.log("sudah ada");
            return false;
        }
    }

    users.push(new_user);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));

    return true;
}