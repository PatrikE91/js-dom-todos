const list = document.querySelector("#todo-list");
const url = "http://localhost:3000/todos/";

function render(todos) {
  const list = document.querySelector("#todo-list");
  // todos.forEach((e) => {
  const li = document.createElement("li");
  const completedButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  completedButton.className = "cmpBtn";

  completedButton.innerText = "completed";
  deleteButton.innerText = "delete";
  li.innerText = todos.title;

  completedButton.addEventListener("click", () => {
    if (todos.completed === true) {
      fetch(url + todos.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: false }),
      })
        .then((response) => response.json())
        .then(function () {
          list.innerHTML = "";
          readAsync();
        });
    } else {
      fetch(url + todos.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      })
        .then((response) => response.json())
        .then(function () {
          list.innerHTML = "";
          readAsync();
        });
    }
  });

  deleteButton.addEventListener("click", () => {
    // e.preventDefault();
    fetch(url + todos.id, {
      method: "DELETE",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (todos) {
        list.innerHTML = "";
        readAsync();
      });
  });

  if (todos.completed === true) {
    li.style.color = "grey";
    li.style.textDecoration = "line-through";
  }
  list.append(li);
  li.append(completedButton, deleteButton);
}

function renderAll(todos) {
  todos.forEach((todo) => render(todo));
}

function submitEvent() {
  const form = document.querySelector("form");
  const newTodo = document.querySelector(".text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo.value,
        completed: false,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (todos) {
        list.innerHTML = "";
        form.reset();
        readAsync();
      });
  });
}
submitEvent();

// fetch(url)
//   .then((res) => res.json())
//   .then((todos) => renderAll(todos));

// function read() {
//   fetch(url)
//     .then((res) => res.json())
//     .then((todos) => renderAll(todos));
// }

async function readAsync() {
  let response = await fetch(url);
  let json = await response.json();
  renderAll(json)
}

function init() {
  readAsync()
    .then(result => console.log(result))
    .catch(err => console.error(err))
}

init();
