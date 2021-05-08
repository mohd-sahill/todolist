const todoinput=document.querySelector(".todo-input");
const todobutton=document.querySelector(".todo-button");
const todolist=document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");

//event listeners
todobutton.addEventListener('click',addtodo );
todolist.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filtertodo)

//functions

//creating todolist items
function addtodo(event) {
    event.preventDefault();

    //creating the todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoinput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //checkmark button
    const completedButton= document.createElement("button");
    completedButton.innerText='C';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton= document.createElement("button");
    trashButton.innerText='X';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //attaching it to the todolist

    todolist.appendChild(todoDiv);
}

//deleting todolist items
function deletecheck(e) {
    const item = e.target;
    if (item.classList[0]=== "trash-btn"){
      const todo = item.parentElement;
      todo.classList.add("fall");
      todo.addEventListener('transitionend',function () {
          todo.remove();
      });
    }

//check mark
if(item.classList[0]==="completed-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}
}

function filtertodo(e) {
    let todos = todolist.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
     });
    }



    ///////


    
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }