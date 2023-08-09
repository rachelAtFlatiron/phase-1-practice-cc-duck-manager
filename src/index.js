// get relevant const elements
const nav = document.getElementById("duck-nav");
const duckName = document.getElementById("duck-display-name");
const image = document.getElementById("duck-display-image");
const likes = document.getElementById("duck-display-likes");
const form = document.getElementById("new-duck-form");

let globalDuck = {}
const url = "http://localhost:3000/ducks";

//adds duck to navbar
function addDuck(duck) {
	let navImg = document.createElement("img");
	navImg.src = duck.img_url;
	nav.append(navImg);
	// add click event listener to each nav element
	navImg.addEventListener("click", (e) => {
        populateDuck(duck)
    });
}

//updates details with selected duck
function populateDuck(duck) {
    globalDuck = duck
	duckName.textContent = duck.name;
	image.src = duck.img_url;
	likes.textContent = `${duck.likes} likes`;
}

// GET all my data
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		// use data to populate nav
		console.log(data);
		data.forEach((duck) => {
			addDuck(duck);
		});
		populateDuck(data[0])
	});

// add event listener for like button, to increment on click
likes.addEventListener("click", (e) => {
	let curLikes = parseInt(likes.textContent);
	let newLikes = curLikes + 1;
	

    fetch(`${url}/${globalDuck.id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({likes: newLikes})
    })
    .then(res => res.json())
    .then(data => {
        // PATCH updates server
        likes.textContent = `${data.likes} likes`; //update DOM
        globalDuck.likes = data.likes //update global variable
    })

});

// form submit event listener
form.addEventListener("submit", (e) => {
	e.preventDefault();
	let newDuck = {
		name: e.target["duck-name-input"].value,
		img_url: e.target["duck-image-input"].value,
		likes: 0,
	};
    //POST
    fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newDuck)
    })
    .then(res => res.json())
    .then(data => addDuck(data))
});


