let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

// Função para renderizar as tarefas
function renderTarefas() {
  listElement.innerHTML = "";

  tarefas.map((todo, index) => {
    let liElement = document.createElement("li");
    let tarefaText = document.createTextNode(todo);

    // Criar o checkbox
    let checkboxElement = document.createElement("input");
    checkboxElement.setAttribute("type", "checkbox");
    checkboxElement.className = "task-check";

    // Definir se a tarefa está concluída com base no index salvo no localStorage
    checkboxElement.checked = false;
    checkboxElement.onclick = () => {
      if (checkboxElement.checked) {
        liElement.classList.add("completed");
      } else {
        liElement.classList.remove("completed");
      }
      salvarDados();
    };

    // Criar botão de exclusão com o emoji da lixeira
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = "🗑️";

    deleteButton.onclick = () => deletarTarefa(index);

    // Adicionar elementos ao DOM
    liElement.appendChild(checkboxElement);
    liElement.appendChild(tarefaText);
    liElement.appendChild(deleteButton);

    listElement.appendChild(liElement);
  });
}

// Chamando renderTarefas no início
renderTarefas();

// Função para adicionar tarefas
function adcionarTarefas() {
  if (inputElement.value === "") {
    alert("Por favor, insira uma produto");
    return false;
  } else {
    let novaTarefa = inputElement.value;

    tarefas.push(novaTarefa);
    inputElement.value = "";

    renderTarefas();
    salvarDados();
  }
}

buttonElement.onclick = adcionarTarefas;

// Função para deletar tarefa
function deletarTarefa(posicao) {
  tarefas.splice(posicao, 1);
  renderTarefas();
  salvarDados();
}

// Salvar dados no localStorage
function salvarDados() {
  localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}
