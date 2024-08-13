document.getElementById('animal-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const origem = document.getElementById('origem').value;

    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    const nextId = animals.length > 0 ? animals[animals.length - 1].id + 1 : 1;

    const animal = { id: nextId, nome, especie, idade, sexo, origem };

    saveAnimal(animal);

    document.getElementById('animal-form').reset();
    fetchAnimals();
});

function saveAnimal(animal) {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
}

function updateAnimalsList() {
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    const animalsList = document.getElementById('animals');
    animalsList.innerHTML = '';
    animals.forEach(animal => {
        const li = document.createElement('li');
        li.textContent = `ID: ${animal.id}, Nome: ${animal.nome}, Espécie: ${animal.especie}, Idade: ${animal.idade}, Sexo: ${animal.sexo}, Origem: ${animal.origem}`;
        li.appendChild(createEditButton(animal));
        li.appendChild(createDeleteButton(animal.id));
        animalsList.appendChild(li);
    });
}

function createEditButton(animal) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.className = 'edit';
    button.onclick = () => {
        document.getElementById('animal-id').value = animal.id;
        document.getElementById('nome').value = animal.nome;
        document.getElementById('especie').value = animal.especie;
        document.getElementById('idade').value = animal.idade;
        document.getElementById('sexo').value = animal.sexo;
        document.getElementById('origem').value = animal.origem;
        
        // Atualiza o animal no localStorage ao clicar em Editar
        const saveButton = document.getElementById('save-button');
        saveButton.onclick = () => {
            const editedAnimal = {
                id: animal.id,
                nome: document.getElementById('nome').value,
                especie: document.getElementById('especie').value,
                idade: document.getElementById('idade').value,
                sexo: document.getElementById('sexo').value,
                origem: document.getElementById('origem').value
            };
            
            // Encontra o índice do animal na lista
            let animals = JSON.parse(localStorage.getItem('animals')) || [];
            const index = animals.findIndex(a => a.id === animal.id);
            
            if (index !== -1) {
                // Atualiza o animal na lista local
                animals[index] = editedAnimal;
                localStorage.setItem('animals', JSON.stringify(animals));
                
                // Atualiza a lista de animais na página
                fetchAnimals();
                
                // Limpa o formulário após salvar
                document.getElementById('animal-form').reset();
            }
        };
    };
    return button;
}


function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.className = 'remover';
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

function fetchAnimals() {
    updateAnimalsList();
}

const species = [
    "Leão", "Tigre", "Elefante", "Girafa", "Zebra", "Macaco", "Panda", "Pinguim", "Lobo", "Rinoceronte", "Hipopótamo", "Canguru", "Koala", "Puma", "Orangotango", "Urso Polar", "Tubarão", "Baleia", "Gorila", "Lince", "Suricata", "Papagaio", "Cobra", "Arara", "Camelo", "Polvo", "Golfinho", "Esquilo", "Águia", "Falcão", "Cavalo", "Búfalo", "Javali", "Pardal", "Pica-pau", "Cisne", "Cardeal", "Coruja", "Tartaruga", "Sapo", "Lagarto", "Serpente", "Coala", "Mariposa", "Libélula", "Besouro", "Bicho-pau", "Formiga", "Abelha", "Vespa", "Joaninha", "Tarântula", "Escorpião", "Centopeia", "Aranha", "Gafanhoto", "Barata", "Morcego", "Rato", "Cobra Coral", "Mico-leão-dourado", "Tamanduá-bandeira", "Anta", "Capivara", "Jaguar", "Onça-pintada", "Macaco-prego", "Macaco-aranha", "Boto", "Peixe-boi", "Tatu", "Capivara", "Jaguatirica", "Gato-do-mato", "Ariranha", "Anta", "Quati", "Avestruz", "Tuiuiú", "Iaque", "Gnu", "Carneiro", "Furão", "Doninha", "Texugo", "Mangusto", "Tigre-branco", "Lobo-guará", "Lobo-marinho", "Cervo", "Raposa", "Pangolim", "Tamanduá", "Guanaco", "Puma", "Tatu-canastra", "Suricata", "Leopardo", "Leopardo-das-neves", "Morsa", "Rena", "Girafa", "Rinoceronte", "Búfalo-africano", "Zebra", "Pinguim", "Baleia", "Cavalo", "Coala", "Canguru", "Orangotango", "Hipopótamo", "Elefante", "Leão", "Tigre", "Lince", "Urso-pardo", "Urso-polar", "Veado", "Gazela", "Corça", "Corvo", "Gaivota", "Tordo"
];

species.sort(); 

function populateSpecies() {
    const selectSpecies = document.getElementById('especie');
    species.forEach(specie => {
        const option = document.createElement('option');
        option.textContent = specie;
        option.value = specie;
        selectSpecies.appendChild(option);
    });
}

populateSpecies();


