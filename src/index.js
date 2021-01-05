

function getCereals(){
    return fetch('http://127.0.0.1:3000/api/v1/cereals/')
    .then(resp => resp.json()
    .then(data => {
        data.forEach(data => displayCereals(data))
        console.log(data)
    }))
}

function updateLikes(){

  return fetch("http://127.0.0.1:3000/api/v1/cereals/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    name: "updated name"
  })
  })
  .then(resp => resp.json())
  .then(console.log)

}

// functions 

let main = document.querySelector("main")


function displayCereals(cereal){
    let card = document.createElement("div")
    let img = document.createElement("img")
    let h2 = document.createElement("h2")
    let pMilk = document.createElement("p")
    let pTopping = document.createElement("p")
    let pDescription = document.createElement("p")
    let button = document.createElement("button")
    let commentButton = document.createElement("button")
    let input = document.createElement("input")

    card.classList.add("card")
    h2.textContent = cereal.name 
    img.src = cereal.image
    pMilk.textContent = cereal.milk
    pDescription.textContent = cereal.description
    pTopping.textContent = cereal.topping
    button.textContent= "Like"
    commentButton.textContent = "Comment"
   

    card.append(img, h2, button, pDescription, pMilk, pTopping, input, commentButton)
    main.append(card)

}




getCereals()



