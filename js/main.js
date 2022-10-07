let nameInp = document.querySelector("#name-inp");
let lastNameInp = document.querySelector("#last-name-inp");
let phoneInp = document.querySelector("#phone-inp");
let weekInp = document.querySelector("#week-inp");
let monthInp = document.querySelector("#month-inp");
let closeBtn = document.querySelector("#close-btn");
let submitBtn = document.querySelector("#submit-btn");

// create
async function createStudents() {
  console.log(nameInp.value);
  console.log(lastNameInp.value);
  console.log(phoneInp.value);
  console.log(weekInp.value);
  console.log(monthInp.value);

  if (
    !nameInp.value.trim() ||
    !lastNameInp.value.trim() ||
    !phoneInp.value.trim() ||
    !weekInp.value.trim() ||
    !monthInp.value.trim()
  ) {
    alert("Заполните Поля!");
    return;
  } else {
    alert("success!");
  }

  let studentObj = {
    name: nameInp.value,
    lastName: lastNameInp.value,
    phone: phoneInp.value,
    weekKPI: weekInp.value,
    monthKPI: monthInp.value,
  };

  await fetch("http://localhost:8000/students", {
    method: "POST",
    body: JSON.stringify(studentObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}
submitBtn.addEventListener("click", createStudents);

// read
async function addStudents() {
  let response = await fetch("http://localhost:8000/students");
  let save = await response.json();
  let div = document.querySelector(".container");
  div.innerHTML = "";
  save.forEach(item => {
    div.innerHTML += `<div class="card" style="width: 18rem; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
 <div class="card-body">
   <p class="card-text">Name: ${item.name}</p>
   <p class="card-text">Last Name: ${item.lastName}</p>
   <p class="card-text">Phone Number: ${item.phone}</p>
   <p class="card-text">week KPI: ${item.weekKPI}</p>
   <p class="card-text">month KPI: ${item.monthKPI}</p>
   <button class="btn btn-dark bg-dark delete-btn">Delete</button>
   <button class="btn btn-dark bg-info update-btn">Update</button>
 </div>
</div>`;
  });
  deleteStudent();
}
addStudents();
submitBtn.addEventListener("click", addStudents);

// delete

// delete
async function deleteStudent() {
  deleBtn = document.querySelectorAll('.delete-btn')
  let studentId = +prompt("Введите ключ для удаления");
  await fetch(`http://localhost:8000/students/${studentId}`, {
    method: "DELETE",
  });
}
addStudents();
deleteBtn.addEventListener("cliclk", deleteStudent)

