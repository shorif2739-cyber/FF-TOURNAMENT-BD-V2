// ======================================
// FF TOURNAMENT BD
// app.js
// PART - 1
// ======================================

import {
auth,
database,
storage,
googleProvider,
signInWithPopup,
signOut,
onAuthStateChanged,
ref,
set,
get,
update,
remove,
push,
onValue,
off,
storageRef,
uploadBytes,
getDownloadURL,
deleteObject
} from "./firebase.js";


// ======================================
// GLOBAL VARIABLES
// ======================================

let currentUser = null;
let currentUserData = {};
let selectedMatch = null;
let bannerIndex = 0;


// ======================================
// DOM ELEMENTS
// ======================================

const loadingScreen = document.getElementById("loadingScreen");
const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");

const googleLoginBtn = document.getElementById("googleLoginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const wallet = document.getElementById("wallet");
const walletBalance = document.getElementById("walletBalance");

const profilePhoto = document.getElementById("profilePhoto");
const profilePhotoLarge = document.getElementById("profilePhotoLarge");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userUid = document.getElementById("userUid");

const noticeText = document.getElementById("noticeText");

const homeMatchList = document.getElementById("homeMatchList");
const selectedMatchCard = document.getElementById("selectedMatch");
const joinedPlayers = document.getElementById("joinedPlayers");
const historyList = document.getElementById("historyList");
const myMatches = document.getElementById("myMatches");
const winnerList = document.getElementById("winnerList");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

const depositModal = document.getElementById("depositModal");
const withdrawModal = document.getElementById("withdrawModal");

const submitDepositBtn = document.getElementById("submitDepositBtn");
const submitWithdrawBtn = document.getElementById("submitWithdrawBtn");

const joinMatchBtn = document.getElementById("joinMatchBtn");

const loadingModal = document.getElementById("loadingModal");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const menus = document.querySelectorAll(".menu");
const pages = document.querySelectorAll(".pageView");


// ======================================
// LOADING SCREEN
// ======================================

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.style.display="none";

loginPage.classList.remove("hidden");

},2000);

});


// ======================================
// TOAST
// ======================================

function showToast(message){

toastText.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}


// ======================================
// LOADING MODAL
// ======================================

function showLoading(){

loadingModal.classList.remove("hidden");

}

function hideLoading(){

loadingModal.classList.add("hidden");

}


// ======================================
// PAGE CHANGE
// ======================================

function openPage(pageId){

pages.forEach(page=>{

page.classList.remove("active");

});

const activePage=document.getElementById(pageId);

if(activePage){

activePage.classList.add("active");

}

menus.forEach(menu=>{

menu.classList.remove("active");

if(menu.dataset.page===pageId){

menu.classList.add("active");

}

});

}

menus.forEach(menu=>{

menu.addEventListener("click",()=>{

openPage(menu.dataset.page);

});

});


// ======================================
// PART - 1 END
// ======================================
// ======================================
// GOOGLE LOGIN
// PART - 2
// ======================================

googleLoginBtn.addEventListener("click", async()=>{

try{

showLoading();

const result = await signInWithPopup(auth, googleProvider);

const user = result.user;

const userRef = ref(database,"users/"+user.uid);

const snapshot = await get(userRef);

if(!snapshot.exists()){

await set(userRef,{

uid:user.uid,

name:user.displayName || "",

email:user.email || "",

photo:user.photoURL || "",

wallet:0,

referralCode:user.uid.substring(0,8),

referredBy:"",

totalMatch:0,

totalWin:0,

totalDeposit:0,

totalWithdraw:0,

isAdmin:false,

createdAt:Date.now()

});

}

hideLoading();

showToast("Login Successful");

}catch(error){

hideLoading();

console.log(error);

showToast(error.message);

}

});


// ======================================
// AUTH STATE
// ======================================

onAuthStateChanged(auth,async(user)=>{

if(user){

currentUser=user;

loginPage.classList.add("hidden");

app.classList.remove("hidden");

loadUserData();

loadNotice();

loadBanner();

loadMatches();

loadWinner();

}else{

currentUser=null;

loginPage.classList.remove("hidden");

app.classList.add("hidden");

}

});


// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

showToast("Logout Successful");

});


// ======================================
// USER DATA
// ======================================

async function loadUserData(){

const snapshot=await get(ref(database,"users/"+currentUser.uid));

if(!snapshot.exists()) return;

currentUserData=snapshot.val();

walletBalance.innerText=currentUserData.wallet || 0;

wallet.innerText=currentUserData.wallet || 0;

userName.innerText=currentUserData.name || "";

userEmail.innerText=currentUserData.email || "";

userUid.innerText=currentUser.uid;

profilePhoto.src=currentUserData.photo;

profilePhotoLarge.src=currentUserData.photo;

}


// ======================================
// END PART - 2
// ======================================
// ======================================
// NOTICE
// BANNER
// MATCH LIST
// PART - 3
// ======================================

function loadNotice(){

const noticeRef = ref(database,"notice");

onValue(noticeRef,(snapshot)=>{

if(snapshot.exists()){

noticeText.innerText = snapshot.val().text || "";

}

});

}


// ======================================
// BANNER
// ======================================

function loadBanner(){

const bannerRef = ref(database,"banners");

onValue(bannerRef,(snapshot)=>{

const slider=document.querySelector(".bannerSlider");

if(!slider) return;

slider.innerHTML="";

if(!snapshot.exists()) return;

const banners=snapshot.val();

Object.keys(banners).forEach((key,index)=>{

const banner=document.createElement("div");

banner.className="banner";

if(index===0){

banner.classList.add("active");

}

banner.innerHTML=`

<img src="${banners[key].image}" alt="Banner">

`;

slider.appendChild(banner);

});

startBannerSlider();

});

}

function startBannerSlider(){

const banners=document.querySelectorAll(".banner");

if(banners.length<=1) return;

setInterval(()=>{

banners[bannerIndex].classList.remove("active");

bannerIndex++;

if(bannerIndex>=banners.length){

bannerIndex=0;

}

banners[bannerIndex].classList.add("active");

},4000);

}


// ======================================
// MATCH LIST
// ======================================

function loadMatches(){

const matchRef=ref(database,"matches");

onValue(matchRef,(snapshot)=>{

homeMatchList.innerHTML="";

if(!
// ======================================
// JOIN MATCH
// DEPOSIT
// WITHDRAW
// PART - 4
// ======================================


// ======================================
// JOIN MATCH
// ======================================

joinMatchBtn.addEventListener("click",async()=>{

if(!selectedMatch){

showToast("Please Select Match");

return;

}

if(currentUserData.wallet<selectedMatch.entryFee){

showToast("Insufficient Balance");

return;

}

showLoading();

const wallet=currentUserData.wallet-selectedMatch.entryFee;

await update(ref(database,"users/"+currentUser.uid),{

wallet:wallet,

totalMatch:(currentUserData.totalMatch||0)+1

});

const joinRef=push(ref(database,"matchPlayers/"+selectedMatch.id));

await set(joinRef,{

uid:currentUser.uid,

name:currentUserData.name,

photo:currentUserData.photo,

email:currentUserData.email,

joinedAt:Date.now()

});

hideLoading();

showToast("Match Joined Successfully");

loadUserData();

});


// ======================================
// DEPOSIT MODAL
// ======================================

depositBtn.addEventListener("click",()=>{

depositModal.classList.remove("hidden");

});

withdrawBtn.addEventListener("click",()=>{

withdrawModal.classList.remove("hidden");

});


// ======================================
// CLOSE MODAL
// ======================================

window.addEventListener("click",(e)=>{

if(e.target===depositModal){

depositModal.classList.add("hidden");

}

if(e.target===withdrawModal){

withdrawModal.classList.add("hidden");

}

});


// ======================================
// DEPOSIT REQUEST
// ======================================

submitDepositBtn.addEventListener("click",async()=>{

const amount=document.getElementById("depositAmount").value.trim();

const number=document.getElementById("depositNumber").value.trim();

const trx=document.getElementById("depositTrx").value.trim();

if(amount===""||number===""||trx===""){

showToast("Fill All Fields");

return;

}

showLoading();

const depositRef=push(ref(database,"depositRequests"));

await set(depositRef,{

uid:currentUser.uid,

name:currentUserData.name,

amount:Number(amount),

number:number,

trxId:trx,

status:"pending",

createdAt:Date.now()

});

depositModal.classList.add("hidden");

hideLoading();

showToast("Deposit Request Submitted");

});


// ======================================
// WITHDRAW REQUEST
// ======================================

submitWithdrawBtn.addEventListener("click",async()=>{

const amount=document.getElementById("withdrawAmount").value.trim();

const number=document.getElementById("withdrawNumber").value.trim();

if(amount===""||number===""){

showToast("Fill All Fields");

return;

}

if(Number(amount)>currentUserData.wallet){

showToast("Insufficient Balance");

return;

}

showLoading();

const withdrawRef=push(ref(database,"withdrawRequests"));

await set(withdrawRef,{

uid:currentUser.uid,

name:currentUserData.name,

amount:Number(amount),

number:number,

status:"pending",

createdAt:Date.now()

});

withdrawModal.classList.add("hidden");

hideLoading();

showToast("Withdraw Request Submitted");

});


// ======================================
// END PART - 4
// ======================================
// ======================================
// ADMIN PANEL
// PROFILE
// REFERRAL
// PART - 5
// ======================================


// ======================================
// PROFILE UPDATE
// ======================================

async function updateProfile(name,photo){

await update(ref(database,"users/"+currentUser.uid),{

name:name,

photo:photo

});

showToast("Profile Updated");

loadUserData();

}


// ======================================
// REFERRAL
// ======================================

function loadReferral(){

const referralCode=document.getElementById("referralCode");

if(referralCode){

referralCode.innerText=currentUserData.referralCode;

}

}

const copyReferralBtn=document.getElementById("copyReferralBtn");

if(copyReferralBtn){

copyReferralBtn.addEventListener("click",()=>{

navigator.clipboard.writeText(currentUserData.referralCode);

showToast("Referral Code Copied");

});

}


// ======================================
// WINNER LIST
// ======================================

function loadWinner(){

const winnerRef=ref(database,"winners");

onValue(winnerRef,(snapshot)=>{

winnerList.innerHTML="";

if(!snapshot.exists()) return;

const winners=snapshot.val();

Object.keys(winners).reverse().forEach((key)=>{

const winner=winners[key];

const card=document.createElement("div");

card.className="winnerCard";

card.innerHTML=`

<img src="${winner.photo}">

<div>

<h3>${winner.name}</h3>

<p>${winner.match}</p>

<p>Prize : ৳${winner.prize}</p>

</div>

`;

winnerList.appendChild(card);

});

});

}


// ======================================
// MY MATCHES
// ======================================

function loadMyMatches(){

const matchRef=ref(database,"matchPlayers");

onValue(matchRef,(snapshot)=>{

myMatches.innerHTML="";

if(!snapshot.exists()) return;

const data=snapshot.val();

Object.keys(data).forEach((matchId)=>{

Object.keys(data[matchId]).forEach((playerId)=>{

const player=data[matchId][playerId];

if(player.uid===currentUser.uid){

const card=document.createElement("div");

card.className="matchCard";

card.innerHTML=`

<div class="matchContent">

<div class="matchTitle">

${player.name}

</div>

<div class="matchPrize">

Joined Successfully

</div>

</div>

`;

myMatches.appendChild(card);

}

});

});

});

}


// ======================================
// ADMIN CHECK
// ======================================

async function checkAdmin(){

const snapshot=await get(ref(database,"users/"+currentUser.uid));

if(!snapshot.exists()) return;

const user=snapshot.val();

if(user.isAdmin){

const admin=document.getElementById("adminPage");

if(admin){

admin.classList.remove("hidden");

}

}

}


// ======================================
// INITIAL LOAD
// ======================================

window.addEventListener("load",()=>{

loadReferral();

loadMyMatches();

checkAdmin();

});


// ======================================
// END PART - 5
// ======================================
// ======================================
// APP STARTUP
// HISTORY
// SUPPORT
// PART - 6 (FINAL)
// ======================================


// ======================================
// HISTORY
// ======================================

function loadHistory(){

const historyRef=ref(database,"history/"+currentUser.uid);

onValue(historyRef,(snapshot)=>{

historyList.innerHTML="";

if(!snapshot.exists()) return;

const history=snapshot.val();

Object.keys(history).reverse().forEach((key)=>{

const item=history[key];

const card=document.createElement("div");

card.className="matchCard";

card.innerHTML=`

<div class="matchContent">

<div class="matchTitle">

${item.title}

</div>

<div class="matchInfo">

<span>${item.type}</span>

<span>৳${item.amount}</span>

</div>

</div>

`;

historyList.appendChild(card);

});

});

}


// ======================================
// SUPPORT BUTTONS
// ======================================

const whatsappBtn=document.getElementById("whatsappSupport");

const telegramBtn=document.getElementById("telegramSupport");

const messengerBtn=document.getElementById("messengerSupport");

if(whatsappBtn){

whatsappBtn.onclick=()=>{

window.open("https://wa.me/","_blank");

};

}

if(telegramBtn){

telegramBtn.onclick=()=>{

window.open("https://t.me/","_blank");

};

}

if(messengerBtn){

messengerBtn.onclick=()=>{

window.open("https://m.me/","_blank");

};

}


// ======================================
// AUTO LOAD
// ======================================

async function initializeApp(){

if(!currentUser) return;

await loadUserData();

loadNotice();

loadBanner();

loadMatches();

loadWinner();

loadMyMatches();

loadHistory();

loadReferral();

checkAdmin();

}


// ======================================
// START
// ======================================

onAuthStateChanged(auth,(user)=>{

if(user){

currentUser=user;

loginPage.classList.add("hidden");

app.classList.remove("hidden");

initializeApp();

}else{

loginPage.classList.remove("hidden");

app.classList.add("hidden");

}

});


// ======================================
// END OF APP.JS
// FF TOURNAMENT BD
// VERSION 1.0
// ======================================