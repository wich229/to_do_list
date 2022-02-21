let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  // prevent form being submited.
  e.preventDefault();

  //get input values.
  //console.log(e.target);
  let form = e.target.parentElement;
  //console.log(form);
  //console.log(form.children);
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;
  //console.log(todoText, todoMonth, todoDate);

  //prevent empt item
  if (todoText === "") {
    alert("Please enter the text.");
    return;
  } else if (todoMonth === "" || todoDate === "") {
    alert("Please enter the month or date.");
    return;
  } else if (
    parseInt(todoMonth) < 1 ||
    parseInt(todoMonth) > 12 ||
    parseFloat(todoMonth) === 0
  ) {
    alert("Please enter a valid month.");
    return;
  } else if (
    parseInt(todoDate) < 1 ||
    parseInt(todoDate) > 31 ||
    parseFloat(todoDate) === 0
  ) {
    alert("Please enter a valid date.");
    return;
  }

  // create todo list below
  let todoItem = document.createElement("div");
  todoItem.classList.add("todoItem");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " / " + todoDate;
  todoItem.appendChild(text);
  todoItem.appendChild(time);

  //create green check and red trash
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let completeItem = e.target.parentElement;
    completeItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let trashItem = e.target.parentElement;
    trashItem.addEventListener("animationend", (e) => {
      trashItem.remove();
    });
    trashItem.style.animation = "scaleDown 0.5s forwards";
  });

  todoItem.appendChild(completeButton);
  todoItem.appendChild(trashButton);

  todoItem.style.animation = "scaleUp 0.5s forwards";

  //create an object
  let myTodo = {
    text: todoText,
    month: todoMonth,
    date: todoDate,
  };

  //store data into an array of objects.
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));
  // clear the text
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";

  section.appendChild(todoItem);
});

let dataList = localStorage.getItem("list");
if (dataList !== null) {
  let dataListArray = JSON.parse(dataList);
  myListArray.forEach((item) => {
    // create todo list below
    let todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.text;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;
    todoItem.appendChild(text);
    todoItem.appendChild(time);
  });
}
