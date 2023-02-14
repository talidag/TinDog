import {dogsData, fakeDogsData} from '/data.js';
import Dog from '/Dog.js'

const infoDiv = document.getElementById("info")
const buttons = document.getElementsByTagName("input");

const likedDogs = []
const nopedDogs = []
let dogArrayIndex = 0
let isSkipped = false

for (const button of buttons) {
    if(button.id !== "cat-btn") {
        button.disabled = true;
    }
}

document.addEventListener("click", function(event){

    if(event.target.id === "cat-btn") {
        renderTutorial()
    }
    else if(event.target.id === "tutorial") {
        setTimeout(() => {
            renderTutorialLike()
        }, 200);
        
    }
    else if(event.target.id === "like") {
        likeDog()
    }
    else if(event.target.id === "nope") {
        nopeDog()
    }
    else if(event.target.id === "yes") {
        setTimeout(() => {
            for (const button of buttons) {
                button.disabled = false;
            }
            renderDog()
        }, 100);
            
    }
    else if(event.target.id === "skip") {
        isSkipped=true
        setTimeout(() => {
            for (const button of buttons) {
                button.disabled = false;
            }
            renderDog()
        }, 300);
            
    }
    else if(event.target.id === "chat") {
        const likedArray = likedDogs.map(element => `<p class="matches">• ${element}</p>`)
        buttons.namedItem("like").disabled = true
        buttons.namedItem("nope").disabled = true

        if (likedDogs.length > 0) {
            infoDiv.innerHTML = `<p class="not-cat"> Here is a list of all your matches so far: <br> </p>
            ${likedArray}
            <br><br><br>
            <p class="not-cat"> Click on the <img id="paw-icon-chat" src="/images/utils/paw-icon.png"/> icon to see if there are any other dogs in your area.</p>`
        } else {
            infoDiv.innerHTML = `<p class="not-cat">You have no matches so far. 
            <p class="not-cat"> Click on the <img id="paw-icon-chat" src="/images/utils/paw-icon.png"/> icon to see if there are any other dogs in your area.</p>
            <br> <p class="not-cat"> If there are no more dogs, then lower your expectations next time!</p>`
        }
    }

    // To continue with this buttons

    else if(event.target.id === "profile") {
        renderProfile()
    }
    else if(event.target.id === "paw") {
        setTimeout(() => {
            renderDog()
        }, 300);    }

})


// Tutorial functions

function renderTutorial() {
    infoDiv.innerHTML = `
        <div id="tutorial-div">
            <h3 class="intro-text">Let's get you ready! </h3>
            <p class="not-cat"> Here's everything you need to know </p>
            <button id="tutorial"> Start tutorial </button>
            <button id="skip"> Skip </button>
        </div>`    
}

function renderTutorialLike() {

    buttons.namedItem("like").disabled = false
    infoDiv.innerHTML = `
    <p id="how-to-like">Press <img id="like-tutorial" src="/images/utils/like-icon.png"/> to LIKE a dog. <br><br>
    It will only be a Match if you both Like each other. <br><br>
    Try it out!</p>
    ${new Dog(fakeDogsData[0]).getDogHtml()}`
    fakeDogsData.shift()
}   

function likeDog() {

    if (fakeDogsData.length > 0 && !isSkipped) {
        buttons.namedItem("like").disabled = true
        document.getElementsByClassName("dog-card")[0].innerHTML += `<input id="like-image" type="image" src="/images/utils/like-image.png" />`
        setTimeout(() => {
            buttons.namedItem("nope").disabled = false
            renderTutorialNope()
        }, 1000)
        return
    }

    document.getElementsByClassName("dog-card")[0].innerHTML += `<input id="like-image" type="image" src="/images/utils/like-image.png" />`
    buttons.namedItem("like").disabled = true
    buttons.namedItem("nope").disabled = true

    setTimeout(() => {
        likedDogs.push(getDog().name)
        dogArrayIndex++
        getDog()
        renderDog()
    }, 1000)
}

function renderTutorialNope() {

    infoDiv.innerHTML = `
    <p id="how-to-nope">Press <img id="nope-tutorial" src="/images/utils/nope-icon.png"/> if you don't like a dog.</p>
    ${new Dog(fakeDogsData[0]).getDogHtml()}`
    fakeDogsData.shift()

}

function nopeDog() {

    if (fakeDogsData.length > 0 && !isSkipped)  {
        buttons.namedItem("nope").disabled = true
        document.getElementsByClassName("dog-card")[0].innerHTML += `<input id="nope-image" type="image" src="/images/utils/nope-image.png" />`
        setTimeout(() => {
            renderPicture()
        }, 1000)

        return
    }

    document.getElementsByClassName("dog-card")[0].innerHTML += `<input id="nope-image" type="image" src="/images/utils/nope-image.png" />`
    buttons.namedItem("like").disabled = true
    buttons.namedItem("nope").disabled = true
    setTimeout(() => {
        nopedDogs.push(getDog().name)
        dogArrayIndex++
        getDog()
        renderDog()
    }, 1000);
}

function renderPicture() {

    infoDiv.innerHTML = `
    <p id="quote-dogs">“I'm suspicious of people who don't like dogs, but I trust a dog when it doesn't like a person.” <br>
    ― Bill Murray</p>
    <p id="finish-tutorial"> Ready to meet some dogs today? <br><button id="yes"> YES! <i class="fa-solid fa-paw"></i></button></p>
    
    ${new Dog(fakeDogsData[0]).getDogHtml()}`
    console.log(fakeDogsData)
    fakeDogsData.shift()
    console.log(fakeDogsData.length)


}

function renderDog() {
    if (dogsData.length > dogArrayIndex) {
        buttons.namedItem("like").disabled = false
        buttons.namedItem("nope").disabled = false
        infoDiv.innerHTML = getDog().getDogHtml() 
    }
    else { 

        infoDiv.innerHTML= `<p class="not-cat">We've run out of potential matches in your area. <br> <br>Check your matches by clicking on the <img id="chat-img" src="/images/utils/chat-icon.png"/> icon.</p>`   
    }
}

function getDog() {

    let nextDogData = dogsData[dogArrayIndex]
    return nextDogData ? new Dog(nextDogData) : {}
}

function renderIntro() {
    infoDiv.innerHTML = `
    <div id="tutorial-div">
        <p class="intro-text">Welcome to <br>TinDog!</p>
        <p class="not-cat">By clicking Continue you confirm that you're not a cat.</p>
        <button id="cat-btn">Continue <i class="fa-solid fa-dog"></i></button>
    </div>` 
}

function renderProfile() {
    buttons.namedItem("like").disabled = true
    buttons.namedItem("nope").disabled = true
    infoDiv.innerHTML = `
    <div id="profile-container"> 
        <img id="profile-pic" src="/images/utils/profile-pic.jpg"/>
        <p id="profile-message">
            Hello Sir. <br> We regret to inform you that your account has been suspended. <br>
            We ban accounts when there has been a violation of our Terms of Use and/or Community Guidelines. <br>
            You will not be able to edit your profile as it is currently under review by our staff.
        </p>

    </div>` 
}

renderIntro()