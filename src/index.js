import { initializeApp } from 'firebase/app'
import {
    getFirestore, 
    getDocs, 
    collection, 
    onSnapshot, 
    addDoc, 
    query, 
    orderBy
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA3SmBUoy8TG8xSJT1h0TX8b-ax6zcLFAY",
    authDomain: "gjett-tallet.firebaseapp.com",
    projectId: "gjett-tallet",
    storageBucket: "gjett-tallet.appspot.com",
    messagingSenderId: "960180686337",
    appId: "1:960180686337:web:48a1f78eb510b20acefa00"
  };


//-----------------------------------------------------

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection ref
const colRef = collection(db, "personer")

//query
const q = query(colRef, orderBy("score"))

//get collection data

onSnapshot(q,(snapshot) => {
  let tempdata = []
  snapshot.docs.forEach((doc) => {
    tempdata.push({...doc.data(), id: doc.id})
  })
  scoreboardout(tempdata)
  console.log(tempdata)
})

//display score board and send to HTML
function scoreboardout(par1){
     console.log("a", par1[1])
     const liste = []
     for (let i = 0; i < par1.length && i < 10; i++){
          const sui = document.createElement('li')
          sui.textContent = `${par1[i].score} ${par1[i].navn}`
          sui.classList.add('suilist')
          liste.push(sui)
     }
     const score_board = document.querySelector(".score_board")
     score_board.replaceChildren(...liste)
  }


  //adding to score board

const addplayerscoreform = document.querySelector('.add')
addplayerscoreform.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    navn: addplayerscoreform.name.value,
    score: ,
  })
  then(() => {
    addplayerscoreform.reset()
  })
})