document.getElementById('animal-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('animal-id').value;
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const data_nascimento = document.getElementById('data_nascimento').value;

    const animal = { nome, especie, data_nascimento };

    if (id) {
        // Update animal
        fetch(`/animal/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        }).then(res => res.text())
            .then(data => {
                alert(data);
                fetchAnimals();
            });
    } else {
        // Insert new animal
        fetch('/animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        }).then(res => res.text())
            .then(data => {
                alert(data);
                fetchAnimals();
            });
    }

    document.getElementById('animal-form').reset();
    document.getElementById('animal-id').value = '';
});

function fetchAnimals() {
    fetch('/animais')
        .then(res => res.json())
        .then(data => {
            const animalsList = document.getElementById('animals');
            animalsList.innerHTML = '';
            data.forEach(animal => {
                const li = document.createElement('li');
                li.textContent = `ID: ${animal.id}, Nome: ${animal.nome}, Espécie: ${animal.especie}, Data de Nascimento: ${animal.data_nascimento}`;
                li.appendChild(createEditButton(animal));
                li.appendChild(createDeleteButton(animal.id));
                animalsList.appendChild(li);
            });
        });
}

function createEditButton(animal) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.onclick = () => {
        document.getElementById('animal-id').value = animal.id;
        document.getElementById('nome').value = animal.nome;
        document.getElementById('especie').value = animal.especie;
        document.getElementById('data_nascimento').value = animal.data_nascimento.split('T')[0];
    };
    return button;
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.onclick = () => {
        fetch(`/animal/${id}`, {
            method: 'DELETE'
        }).then(res => res.text())
            .then(data => {
                alert(data);
                fetchAnimals();
            });
    };
    return button;
}

// Initial fetch
fetchAnimals();
