const url = "http://localhost:3000/ducks"

const duckNav = document.getElementById('duck-nav')
const duckForm = document.getElementById('new-duck-form')

const createDuck = (duck) => {
    let duckImg = document.createElement('img')
    duckImg.src = duck.img_url
    duckNav.append(duckImg)

    duckImg.addEventListener('click', () => {
        const name = document.getElementById('duck-display-name')
        const image = document.getElementById('duck-display-image')
        const likes = document.getElementById('duck-display-likes')

        name.textContent = duck.name 
        image.src = duck.img_url
        likes.textContent = `${duck.likes} Likes`
        likes.addEventListener('click', () => {
            likes.textContent = `${parseInt(likes.textContent) + 1} Likes`
        })

    })
}
duckForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newDuck = {
        name: e.target['duck-name-input'].value,
        img_url: e.target['duck-image-input'].value,
        likes: 0
    }
    fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newDuck)
    })
    .then(res => res.json())
    .then(duck => {
        createDuck(duck)
    })

})
fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(duck => {
        createDuck(duck)
    })
})