//create userTbl in local storage start
function creatS() {
    var userTbl = localStorage.getItem('userTbl') //fetching key userTbl from local storage
    //checking is key is present or not, if not it will create the key in local storage 
    if (userTbl == null) {
        var userAr = []//userAr is a array
        let uA = JSON.stringify(userAr)//converting array to string
        localStorage.setItem('userTbl', uA)//storing in local storage
    }
}
creatS()
//create userTbl in local storage end

//SignUp Page Modal Start
var signUpModal = document.getElementById("signUp-Modal");
var signUp = document.getElementById("signUp");
signUp.addEventListener("click", signUpModalOpen)
var signUpClose = document.getElementsByClassName("signUp-Close")[0];
signUpClose.addEventListener("click", signUpModelClose)
function signUpModalOpen() {
    signUpModal.style.display = "block";
}

function signUpModelClose() {
    signUpModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
};
//SignUp Page Modal End

//Signup logic
var signUpBtn = document.getElementById('signUpBtn')
signUpBtn.addEventListener("click", myFun)
function myFun() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var userName = document.getElementById("userName").value
    var gender = document.getElementsByName('gen');
    var g;
    var gen = function () {
        for (let i = 0; i < gender.length; i++) {

            if (gender[i].checked) {
                g = gender[i].value
            }
        }
    }
    gen()

    var validator = signupValidation()
    if (!validator){
        console.log("Invalid Information")
        return
    } else{
        var ar = JSON.parse(localStorage.getItem("userTbl"));//fetching userTbl key from local storage and stored it in "ar" variable
        //pushing userName and Pass as object in ar array
        ar.push({
            userkey: userName,
            passkey: pass
        })
        let c = JSON.stringify(ar);//converting JSON 
        localStorage.setItem('userTbl', c); //storing back in local storage "userTbl will over write the in local storage"
        //creating one object "obj" to store current signUp user detail and one array named transaction 
        var obj = {
            name: user,
            password: pass,
            emailId: email,
            mobileNo: mobile,
            genderS: g,
            userNam: userName,
            transaction: []
        };

        let d = JSON.stringify(obj)//converting object "obj" to string

        localStorage.setItem(userName, d)//create key with userName and value will be "obj"
        signUpReset()
        alert("Sign up sucessfully")
        signUpModelClose()
        logInModalOpen()
    }
};
//SignUp End

//Signup validation start
function signupValidation(){
    var user = document.getElementById("user").value
    var pass = document.getElementById("password").value
    if(!/[A-Za-z]{3,15}/.test(user)){
        document.getElementById("user").style.border = "thick solid #ff0000";
        document.getElementById("uspan").innerHTML="user name must conatin atleast 3-15"
        return false;
    }else if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/.test(pass)){
        document.getElementById("password").style.border = "thick solid #ff0000";
        document.getElementById("uspan").innerHTML="Password should contain at least one number and one uppercase and lowercase letter and length should be 6-12"
        return false;
    }else{
        return true;
    }
}
//Signup validation end

//signup reset start
var resetSignUp = document.getElementById("resetSignUp")
resetSignUp.addEventListener("click", signUpReset)
function signUpReset() {
    var user = document.getElementById("user");
    var pass = document.getElementById("password");
    var cpass = document.getElementById("cPassword");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var userName = document.getElementById("userName");

    user.value = "";
    pass.value = "";
    cpass.value = "";
    email.value = "";
    mobile.value = "";
    userName.value = "";
}

//signup validation yet to do


//LogIn page Modal Start
var logInModal = document.getElementById("logIn-Modal");
var logIn = document.getElementById("logIn");
logIn.addEventListener("click", logInModalOpen)
var logInClose = document.getElementsByClassName("logIn-Close")[0];

function logInModalOpen() {
    logInModal.style.display = "block";
}

logInClose.onclick = function () {
    logInModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == logInModal) {
        logInModal.style.display = "none";
    }
};

//LogIn page Modal End

//Login Logic Start
var login = document.getElementById("login")
login.addEventListener("click", loginF)
function loginF() {
    var userLogin = document.getElementById("userLogin").value;
    var passwordLogin = document.getElementById("passwordLogin").value;
    var ar = JSON.parse(localStorage.getItem("userTbl"))//fetching userTbl store it in ar as array
    var avilable = 0;

    //checking the user is avilable or not
    if (!userLogin || !passwordLogin) {
        alert("Fill all the details")
        return
    } else {
        for (let i = 0; i < ar.length; i++) {
            if (ar[i].userkey == userLogin && ar[i].passkey == passwordLogin) {
                localStorage.setItem("currentUser", userLogin)//if login sucess will set current user value to the key currentUser
                avilable++
            }
        }
    }
    if (avilable == 1) {
        alert('Login sucess')
        window.location.href = 'html/home.html'
    } else {
        alert('User not found')
    }
    loginReset()
};
//Login Logic End

//login reset Start
var resetLogin = document.getElementById("resetLogin")
resetLogin.addEventListener("click", loginReset)
function loginReset() {
    var userLogin = document.getElementById("userLogin")
    var passwordLogin = document.getElementById("passwordLogin")
    userLogin.value = "";
    passwordLogin.value = "";
}
//login reset End

//contact page Modal Start
var contactModal = document.getElementById("contact-Modal");
var contact = document.getElementById("contact");
var contactClose = document.getElementsByClassName("contact-Close")[0];

contact.onclick = function () {
    contactModal.style.display = "block";
}

contactClose.onclick = function () {
    contactModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
};

//contact page Modal End

//About page Modal Start
var aboutModal = document.getElementById("about-Modal");
var about = document.getElementById("about");
var aboutClose = document.getElementsByClassName("about-Close")[0];

about.onclick = function () {
    aboutModal.style.display = "block";
}

aboutClose.onclick = function () {
    aboutModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == aboutModal) {
        aboutModal.style.display = "none";
    }
};
//About page Modal End