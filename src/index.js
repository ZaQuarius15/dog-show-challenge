const dogsUrl = `http://localhost:3000/dogs`;
const table = document.getElementById('table-body');
const dogForm = document.getElementById('dog-form')

const fetchDogs = () => {
    fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
}

const renderDogs = (dogs) => {
    table.innerHTML = ' '
    for (dog of dogs) {
        table.innerHTML += renderDog(dog);
    }
}

const renderDog = (dog) => {
    return `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-btn" data-id=${dog.id}>Edit Dog</button></td></tr>`
}

const handleEditButton = (target) => {
    const dogId = target.dataset.id;
    dogForm.dataset.id = dogId
    fetch(dogsUrl+'/'+`${dogId}`)
    .then (resp => resp.json())
    .then(dog => {
        dogForm.name.value = `${dog.name}`
        dogForm.breed.value = `${dog.breed}`
        dogForm.sex.value = `${dog.sex}`
    })
    
}


document.addEventListener("click", (e) => {
    if (e.target.className === "edit-btn") {
      handleEditButton(e.target)
    }
  })

dogForm.addEventListener("submit", (e) => {
    e.preventDefault
    handleFormSubmit(e.target)
})


const handleFormSubmit = (form) => {
    const name = form['name'].value;
    const breed = form['breed'].value;
    const sex = form['sex'].value;
    const dogId = form.dataset.id
    form.reset();
    const formData= {
      name: name,
      breed: breed,
      sex: sex
    }

    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
  
    fetch(dogsUrl+'/'+dogId, reqObj)
    .then(resp => resp.json())
    .then(dogObject => {
      fetchDogs()
    })
  }

fetchDogs()


