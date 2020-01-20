//deposit page Modal Start
var depositModal = document.getElementById("deposit-Modal");
var deposit = document.getElementById("deposit");
var depositClose = document.getElementsByClassName("deposit-Close")[0];

deposit.onclick = function () {
    depositModal.style.display = "block";
}

depositClose.onclick = function () {
    depositModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == depositModal) {
        deposit.style.display = "none";
    }
};
//deposit page Modal End

//deposit logic starts
var crBtn = document.getElementById("crBtn")
crBtn.addEventListener("click", depositFund)
function depositFund() {
    var depositT = document.getElementById("depositT").value;
    var disD = document.getElementById("disD").value;
    var cUser = localStorage.getItem("currentUser")//fetch the currentuser value and storing it in cUser
    var drFetch = JSON.parse(localStorage.getItem(cUser))//based on the current user it will fetch the user key
    if (depositT <= 0) {
        alert("Negetive balance is not allowed")
        resetDeposit()
        return
    } else {
        //creating an object for deposit as "dep" and storing the values of deposit amount,description and transaction type
        var dep = {
            amount: depositT,
            type: 'cr',
            des: disD
        }
        drFetch.transaction.push(dep)//will push the "dep" object to transaction property of the current user key
        var drDep = JSON.stringify(drFetch)//converting to string
        localStorage.setItem(cUser, drDep)//storing the key back to local storage
        alert("Funds Deposited Sucessfully")
        balanceCalculation()
        resetDeposit()
    }
};
//deposit logic ends

//deposit reset start
var crReset = document.getElementById("crReset")
crReset.addEventListener("click", resetDeposit)
function resetDeposit() {
    var depositT = document.getElementById("depositT")
    var disD = document.getElementById("disD")

    depositT.value = "";
    disD.value = "";

}
//deposit reset end


//withdraw page Modal Start
var withdrawModal = document.getElementById("withdraw-Modal");
var withdraw = document.getElementById("withdraw");
var withdrawClose = document.getElementsByClassName("withdraw-Close")[0];

withdraw.onclick = function () {
    withdrawModal.style.display = "block";
}

withdrawClose.onclick = function () {
    withdrawModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == withdrawModal) {
        withdraw.style.display = "none";
    }
};
//withdraw page Modal End

//withdraw logic start
var drBtn = document.getElementById("drBtn")
drBtn.addEventListener("click", withdrawFund)
function withdrawFund() {
    var withdrawT = document.getElementById("withdrawT").value
    var disW = document.getElementById("disW").value;
    var cUser = localStorage.getItem("currentUser")//fetch the currentuser value and storing it in cUser
    var drFetch = JSON.parse(localStorage.getItem(cUser))//based on the current user it will fetch the user key
    //checking balance is avilable or not
    var bal = balanceCalculation()
    if (bal < withdrawT) {
        alert("insufficient funds to withdraw")
        return
    } else if (withdrawT <= 0) {
        alert("Negetive balance is not allowed")
        resetWithdraw()
        return
    } else {
        var dep = {
            amount: withdrawT,
            type: 'dr',
            des: disW
        }
        drFetch.transaction.push(dep)
        var drDep = JSON.stringify(drFetch)
        localStorage.setItem(cUser, drDep)
        alert("Funds withdraw sucessfully")
        balanceCalculation()
        resetWithdraw()
    }
};
//withdraw logic end

//withdraw reset start
var drReset = document.getElementById("drReset")
drReset.addEventListener("click", resetWithdraw)
function resetWithdraw() {
    var withdrawT = document.getElementById("withdrawT")
    var disW = document.getElementById("disW")
    withdrawT.value = "";
    disW.value = "";
}
//withdraw reset end


//balance calculation logic start
window.onload = balanceCalculation()
function balanceCalculation() {
    var bal = 0;
    var cUser = localStorage.getItem("currentUser")//fetching current user
    var drFetch = JSON.parse(localStorage.getItem(cUser))//based on the current user will fetch key 
    for (let i = 0; i < drFetch.transaction.length; i++) {
        //checking balance based on transaction type
        if (drFetch.transaction[i].type == 'cr') {
            bal = bal + Number(drFetch.transaction[i].amount)
        } else if (drFetch.transaction[i].type == 'dr') {
            bal = bal - Number(drFetch.transaction[i].amount)
        } else if (drFetch.transaction[i].type == null) {
            bal = 0;
        }
    }
    document.getElementById("currentBal").value = bal//setting value to current balance in deposit modal
    document.getElementById("currentBalance").value = bal//setting value to current balance in transaction modal
    return bal
};
//balance calculation logic end


//statement page Modal Start
var statementModal = document.getElementById("statement-Modal");
var statement = document.getElementById("statement");
var statementClose = document.getElementsByClassName("statement-Close")[0];
function statementLoad() {
    statementModal.style.display = "block";
}

function statementClose() {
    var table = document.getElementById("")
    statementModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == statementModal) {
        statement.style.display = "none";
    }
};
//statement page Modal End

//statement logic start
function statementFun() {
    var row = 1
    var bal = 0
    var cUser = localStorage.getItem("currentUser")//fetching current user
    document.getElementById("accName").value = cUser;//setting current user value to Account Holder
    var drFetch = JSON.parse(localStorage.getItem(cUser))//fetching key using current user
    //statement will be generated based on transaction type
    for (let i = 0; i < drFetch.transaction.length; i++) {
        var transactionTable = document.getElementById("transactionTable")
        var newRow = transactionTable.insertRow(row)
        var sno = newRow.insertCell(0)
        var deposit = newRow.insertCell(1)
        var withdraw = newRow.insertCell(2)
        var description = newRow.insertCell(3)
        var closingB = newRow.insertCell(4)
        if (drFetch.transaction[i].type == 'cr') {
            bal = bal + Number(drFetch.transaction[i].amount)
            sno.innerHTML = row;
            deposit.innerHTML = drFetch.transaction[i].amount;
            withdraw.innerHTML = "-";
            description.innerHTML = drFetch.transaction[i].des;
            closingB.innerHTML = bal;
            row++;
        } else if (drFetch.transaction[i].type == 'dr') {
            bal = bal - Number(drFetch.transaction[i].amount)
            sno.innerHTML = row;
            deposit.innerHTML = "-";
            withdraw.innerHTML = drFetch.transaction[i].amount;
            description.innerHTML = drFetch.transaction[i].des;
            closingB.innerHTML = bal;
            row++
        }
    }
}
//statement logic end

//userInfo page Modal Start
var userInfoModal = document.getElementById("userInfo-Modal");
var userInfoClose = document.getElementsByClassName("userInfo-Close")[0];

function userInfoOpen() {
    userInfoModal.style.display = "block";
}

userInfoClose.onclick = function () {
    userInfoModal.style = "none";
}

window.onclick = function (event) {
    if (event.target == userInfoModal) {
        userInfo.style.display = "none";
    }
};
//userInfo page Modal End

//user info display start
function userDisplay() {
    var cUser = localStorage.getItem("currentUser")
    var user = JSON.parse(localStorage.getItem(cUser))
    var bal = balanceCalculation()
    document.getElementById("userH").value = user.name;
    document.getElementById("userNameH").value = user.userNam;
    document.getElementById("cbalance").value = bal;
    document.getElementById("emailH").value = user.emailId;
    document.getElementById("mobileH").value = user.mobileNo;
}
userDisplay()
//user info display end

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
        contact.style.display = "none";
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

//LogOut start
var logout = document.getElementById("logOut")
logout.addEventListener("click", logOutFun)

function logOutFun() {
    localStorage.setItem("currentUser", "")//store the current user to empty in local storage
    window.location.href = '/index.html'
}
//LogOut End