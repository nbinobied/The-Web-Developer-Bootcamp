var todos = [];
var input = prompt("What would you like to do?");

while (input !== "quit") {
    if (input === "list") {
        listTodos();
    }
    else if (input === "new") {
        addTodo();
    }
    else if (input === "delete") {
        deleteTodo();
    }
    input = prompt("What would you like to do?");
}
console.log("Quit the app");

function listTodos() {
    console.log("**********");
    todos.forEach(function (todo, index) {
        console.log(index + ": " + todo);
    });
    console.log("**********");
}

function addTodo() {
    var todo = prompt("Enter a new todo");
    todos.push(todo);
    console.log("Added a Todo");
}

function deleteTodo() {
    var index = prompt("Enter index of todo to delete");
    todos.splice(index, 1);
    console.log("Deleted Todo");
}