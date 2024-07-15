import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://pet-shop-cd111-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue)

    //to reset input section
    //inputFieldEl.value = ""
    clearInputFieldEl()

    //setting input line by line
    //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    // appendItemToShoppingListEl(inputValue)
})





onValue(shoppingListInDB, function(snapshot) {


    if (snapshot.exists()) {
        // console.log(snapshot.VAL())
        let itemsArray = Object.entries(snapshot.val())

        // console.log(snapshot.val())


        clearShoppingListEl()


        // console.log(itemsArray)
        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
                //console.log(itemsArray[i])
        }

    } else {

        shoppingListEl.innerHTML = "no items...yet"
    }




})



function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""

}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}


function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)


    })

    shoppingListEl.append(newEl)

}