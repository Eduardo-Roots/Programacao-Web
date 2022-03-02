let lembretes;
let output;

function formatDate(date) {
    // formata a data para o formato DD/MM/YYYY
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

function showList() {
    // mostra a lista de todo
    if (lembretes.length > 0) {
        const htmlTemp = (`<ul> ${lembretes.map(itens => `<li> ${formatDate(itens.date)} --> ${itens.descricao}</li> </ul>`)} </ul><button class="ml-5 mt-5 bg-danger text-light">Apagar tudo do dia</button>`);
        output.innerHTML = htmlTemp;
    } else {
        output.innerHTML = 'Você ainda não tem lembretes!';
    }
}

function saveList() {
    // converte os dados em string e salva no local storage
    localStorage.setItem('tasks', JSON.stringify(lembretes));
}

function clearList() {
    // varre a lista a procura de tarefas realizadas
    for (let i = 0; i < lembretes.length; i++) {
        if (lembretes[i].done === 'false') {
            // remove 1 elemento na posição i;
            lembretes.splice(i, 1);
            // localStorage.clear('tasks', JSON.stringify(lembretes))
            localStorage.removeItem('tasks', JSON.stringify(lembretes))
            // voltando o indice no array para validar novamente a lista
            i = 0;
        } else {
            lembretes[i].id = i;
        }
    }
    showList();
    saveList();
}

function clickList(element) {
    // somente fazer algo quando clicar em um item li
    if (element.target.localName === 'li') {
        element.target.dataset.done = !element.target.dataset.done === 'true';
        lembretes[element.target.dataset.id].done = element.target.dataset.done;
        saveList();
    } else if (element.target.localName === 'button') {
        clearList();
    }
}


function onSubmit(element) {
    const task = {};

    // pego o valor cadastrado no primeiro input do meu form
    task.descricao = element.target[0].value;
    task.date = new Date();
    task.id = lembretes.length;
    task.done = 'false';

    // adicionando a task na lista
    lembretes.push(task);
    saveList();
    showList();
    // utiliza o preventDefault para evitar do form realizar o reload da página
    element.preventDefault();
}


window.addEventListener('load', () => {
    // guarda em uma variável o elemento compromisso
    output = document.getElementById('notas');
    
    if (localStorage.getItem('tasks')) {
        lembretes = JSON.parse(localStorage.getItem('tasks'));
        showList();
    }

    // adiciona o listener para o evento submit, utilizei form para usar o required do input HTML
    document.getElementById('form-task').addEventListener('submit', onSubmit);
    output.addEventListener('click', clickList);
});