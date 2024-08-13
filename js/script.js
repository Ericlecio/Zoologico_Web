document.addEventListener('DOMContentLoaded', function () {
    fetchAnimals();

    const form = document.getElementById('animal-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        saveAnimal();
    });
});

function fetchAnimals() {
    fetch('http://localhost:3000/animais')
        .then(response => response.json())
        .then(data => {
            const animalsList = document.getElementById('animals');
            animalsList.innerHTML = '';
            data.forEach(animal => {
                const li = document.createElement('li');
                li.textContent = `${animal.nome} (${animal.especie}) - ${animal.idade} anos - ${animal.sexo} - ${animal.origem}`;
                animalsList.appendChild(li);
            });
        });
}

function saveAnimal() {
    const id = document.getElementById('animal-id').value;
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const origem = document.getElementById('origem').value;

    const animal = { nome, especie, idade, sexo, origem };

    if (id) {
        fetch(`http://localhost:3000/animais/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animal),
        })
            .then(response => response.json())
            .then(() => {
                fetchAnimals();
                form.reset();
            });
    } else {
        fetch('http://localhost:3000/animais', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animal),
        })
            .then(response => response.json())
            .then(() => {
                fetchAnimals();
                form.reset();
            });
    }
}
