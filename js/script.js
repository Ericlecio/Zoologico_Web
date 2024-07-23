document.getElementById('animal-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('animal-id').value;
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const data_nascimento = document.getElementById('data_nascimento').value;

    const animal = { id: id || generateId(), nome, especie, data_nascimento };

    if (id) {
        updateAnimal(animal);
    } else {
        saveAnimal(animal);
    }

    document.getElementById('animal-form').reset();
    document.getElementById('animal-id').value = '';
    fetchAnimals();
});

function generateId() {
    return '_' + Math.random().toString(10).substr(2,3);
}

function saveAnimal(animal) {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
}

function updateAnimal(animal) {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals = animals.map(a => a.id === animal.id ? animal : a);
    localStorage.setItem('animals', JSON.stringify(animals));
}

function fetchAnimals() {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    const animalsList = document.getElementById('animals');
    animalsList.innerHTML = '';
    animals.forEach(animal => {
        const li = document.createElement('li');
        li.textContent = `ID: ${animal.id}, Nome: ${animal.nome}, Espécie: ${animal.especie}, Data de Nascimento: ${animal.data_nascimento}`;
        li.appendChild(createEditButton(animal));
        li.appendChild(createDeleteButton(animal.id));
        animalsList.appendChild(li);
    });
}

function createEditButton(animal) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.onclick = () => {
        document.getElementById('animal-id').value = animal.id;
        document.getElementById('nome').value = animal.nome;
        document.getElementById('especie').value = animal.especie;
        document.getElementById('data_nascimento').value = animal.data_nascimento;
    };
    return button;
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.onclick = () => {
        removeAnimal(id);
    };
    return button;
}

function removeAnimal(id) {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals = animals.filter(animal => animal.id !== id);
    localStorage.setItem('animals', JSON.stringify(animals));
    fetchAnimals();
}

// Initial fetch
fetchAnimals();
