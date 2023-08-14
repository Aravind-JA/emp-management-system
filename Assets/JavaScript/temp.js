
// function to display the employees
ReadEmployee();

async function ReadEmployee() {
  const response = await fetch("http://localhost:8080/employees");
  const empData = await response.json();

  let temp = '';
  let maxCountOnPage = 10;

  let totalPage = Math.max(Math.ceil(empData.length / maxCountOnPage), 1);
  const currentPage = Pagination(totalPage);

  for (let i = (currentPage - 1) * maxCountOnPage; i < Math.min(currentPage * maxCountOnPage, empData.length); i++) {

    const emp = empData[i];
    const dobDate = new Date(emp.dob);
    const year = dobDate.getFullYear();
    const month = (dobDate.getMonth() + 1).toString().padStart(2, '0');
    const date = dobDate.getDate().toString().padStart(2, '0');

    temp +=
      `<tr>
    <td>#${i + 1}</td>
    <td class="ver_center">
        <img src="" alt="" id="table-image">
        <p>${emp.salutation + " " + emp.firstName + " " + emp.lastName}</p>
    </td>
    <td>${emp.email}</td>
    <td>${emp.phone}</td>
    <td>${emp.gender}</td>
    <td>${date}-${month}-${year}</td>
    <td>${emp.country}</td>
    <td>
        <button onclick="displayMore(event,'${emp._id}')">
            <span class="material-symbols-outlined">more_horiz</span>
        </button>
        <div class="user_more_options" id="moreModal"></div>
    </td>
    </tr>`;
  }
  document.getElementById('table_body').innerHTML = temp;
}

// function to display employee actions
function displayMore(event, empID) {

  const userOptions = document.getElementById('moreModal');
  userOptions.innerHTML = `
      <a href="/employee/${empID}">
          <div class="user_options">
              <span class="material-symbols-outlined">visibility</span>
              <p>View Details</p>
          </div>
      </a>
      <div class="user_options" onclick="openEditEmployee('${empID}')">
          <span class="material-symbols-outlined">edit</span>
          <p>Edit</p>
      </div>
      <div class="user_options" onclick="openDelEmployee('${empID}')">
          <span class="material-symbols-outlined">delete</span>
          <p>Delete</p>
      </div>
      <button onclick="closeUserOptions()" class="btn btn-primary col-12">Close</button>
  `;


  userOptions.style.visibility = 'visible';
  const buttonRect = event.target.getBoundingClientRect();
  userOptions.style.top = (buttonRect.bottom + 5) + 'px';
}

// function to close employee actions
function closeUserOptions() {
  const userOptions = document.getElementById('moreModal');
  userOptions.style.visibility = 'hidden';
}

//function to open add employee Modal
function openAddEmployee() {
  add_emp.style.display = 'block';
  overlay.style.display = 'block';
}




//function to close add employee Modal
function closeAddEmployee() {
  add_emp.style.display = 'none';
  overlay.style.display = 'none';
  clearModalInputs();
}

//function to open delete employee Modal
async function openDelEmployee(empID) {
  const del_emp = document.getElementById('del_emp');
  del_emp.style.display = 'block';
  overlay.style.display = 'block';

  const delButton = document.getElementById('deleteButton');
  delButton.addEventListener('click', function (e) {
    DeleteEmployee(empID);
  });
}

//function to close delete employee Modal
function closeDelEmployee() {
  del_emp.style.display = 'none';
  overlay.style.display = 'none';
}


//function to  open Edit Employee Modal

function openEditEmployee(empID) {
  edit_emp.style.display = 'block';
  overlay.style.display = 'block';

  fetch(`http://localhost:8080/employees/${empID}`)
    .then((response) => response.json())
    .then((value) => {

      const dobDate = new Date(value.dob);
      const year = dobDate.getFullYear();
      const month = (dobDate.getMonth() + 1).toString().padStart(2, '0');
      const date = dobDate.getDate().toString().padStart(2, '0');
      const dateString = `${year}-${month}-${date}`;

      document.querySelector('#edit_emp [name="salutation"]').value = value.salutation;
      document.querySelector('#edit_emp [name="firstName"]').value = value.firstName;
      document.querySelector('#edit_emp [name="lastName"]').value = value.lastName;
      document.querySelector('#edit_emp [name="email"]').value = value.email;
      document.querySelector('#edit_emp [name="phone"]').value = value.phone;
      document.querySelector('#edit_emp [name="dob"]').value = dateString;
      document.querySelector(`#edit_emp [name="gender"][value="${value.gender}"]`).checked = true;
      document.querySelector('#edit_emp [name="qualifications"]').value = value.qualifications;
      document.querySelector('#edit_emp [name="address"]').value = value.address;
      document.querySelector('#edit_emp [name="country"]').value = value.country;
      document.querySelector('#edit_emp [name="state"]').value = value.state;
      document.querySelector('#edit_emp [name="city"]').value = value.city;
      document.querySelector('#edit_emp [name="pin"]').value = value.pin;
    });

  document.getElementById('editEmployee').addEventListener('click', function (event) {
    event.preventDefault();
    editEmployee(empID);
  });
}





//function to Edit Employee

async function editEmployee(empID) {
  const formData = {
    salutation: document.querySelector('#edit_emp [name="salutation"]').value,
    firstName: document.querySelector('#edit_emp [name="firstName"]').value,
    lastName: document.querySelector('#edit_emp [name="lastName"]').value,
    email: document.querySelector('#edit_emp [name="email"]').value,
    phone: document.querySelector('#edit_emp [name="phone"]').value,
    dob: document.querySelector('#edit_emp [name="dob"]').value,
    gender: document.querySelector(`#edit_emp [name="gender"]:checked`).value,
    qualifications: document.querySelector('#edit_emp [name="qualifications"]').value,
    address: document.querySelector('#edit_emp [name="address"]').value,
    country: document.querySelector('#edit_emp [name="country"]').value,
    state: document.querySelector('#edit_emp [name="state"]').value,
    city: document.querySelector('#edit_emp [name="city"]').value,
    pin: document.querySelector('#edit_emp [name="pin"]').value
  }

  const response = await fetch(`http://localhost:8080/employees/${empID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Employee edited:', data);

  ReadEmployee();
  closeEditEmployee();
  Alert("update");
  // uploadImage(`${empID}`, file);
}


//function to close Edit employee Modal
function closeEditEmployee() {
  edit_emp.style.display = 'none';
  overlay.style.display = 'none';
  clearModalInputs();
}


//function to Clear Input Fields

function clearModalInputs() {
  const modal = document.getElementById("add_emp");
  const inputFields = modal.querySelectorAll("input");

  inputFields.forEach((input) => {
    input.value = "";
  });

  const selectFields = modal.querySelectorAll('select');
  selectFields.forEach((select) => {
    select.value = "";
  });

  const error = document.querySelectorAll('.error');

  error.forEach(e => {
    e.textContent = "";
  });

  // const fileInput = document.getElementById('upload_user_image');
  // const newFileInput = fileInput.cloneNode(true);
  // fileInput.parentNode.replaceChild(newFileInput, fileInput);

}

// to select employee image 
const uploadUserImage = document.getElementById('upload_user_image');
const fileInput = document.getElementById('file_input');
const imageSection = document.getElementById('imageSection');
const imagePreview = document.getElementById('image_preview');

fileInput.addEventListener('click', function (e) {
  uploadUserImage.click();
});

uploadUserImage.addEventListener('change', function (e) {
  const selectedImage = uploadUserImage.files[0];

  if (selectedImage) {
    ;
    console.log("image selected first" + selectedImage.name);
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target.result;

      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;

      imagePreview.innerHTML = '';
      imagePreview.appendChild(imgElement);
      imageSection.style.display = 'flex';
      fileInput.style.display = 'none';
    };

    reader.readAsDataURL(selectedImage);
  }
});


//function to Add Employee

const addEmployee = document.getElementById('add_user_form');

addEmployee.addEventListener('submit', async event => {

  event.preventDefault();

  if (formValidation()) {

    const formData = new FormData(addEmployee);
    const file = uploadUserImage.files[0];

    console.log("Selected Image Second: " + file.name);

    const gender = document.querySelector(`#add_user_form [name="gender"]:checked`).value;
    const dateString = document.querySelector('#add_user_form input[name="dob"]').value;

    const [year, month, day] = dateString.split("-");
    const newDateString = `${day}-${month}-${year}`;
    console.log(dateString);

    formData.set('dob', newDateString);
    formData.set('gender', gender);

    const employeeData = {};
    formData.forEach((value, key) => {
      employeeData[key] = value;
    });

    await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    })
      .then((res) => res.json())
      .then((value) => {
        uploadImage(value.employee._id, file);
      })
      .catch((error) => console.error(error));
    ReadEmployee();
    closeAddEmployee();
    Alert("add");

  }

});


//function to Delete Employee

async function DeleteEmployee(empID) {
  try {
    await fetch(`http://localhost:8080/employees/${empID}`, {
      method: 'DELETE'
    });
    ReadEmployee();
    closeDelEmployee();
    Alert("delete");
  } catch (error) {
    console.error(error);
  }
}

//function to show Alerts 

async function Alert(type) {
  const alert = document.getElementById('alert');
  const alertIcon = document.getElementById('alertIcon');
  const alertMsg = document.getElementById('alertMsg');

  alert.classList.add('show');
  alert.classList.remove('hide');
  alert.classList.add('showAlert');
  setTimeout(() => {
    alert.classList.remove('show');
    alert.classList.add('hide');
  }, 5000);

  if (type === "delete") {
    alert.classList.add('bg-danger');
    alertIcon.textContent = "delete";
    alertMsg.textContent = "Employee data is deleted!!!"
  } else if (type === "add") {
    alert.classList.add('bg-success');
    alertIcon.textContent = "done_all";
    alertMsg.textContent = "New Employee is added!!!"
  } else if (type === "update") {
    alert.classList.add('bg-warning');
    alertIcon.textContent = "account_circle";
    alertMsg.textContent = "Employee data updated!!!"
  }
}

//function for Form Validation

function printError(elemId, hintMsg) {
  document.getElementById(elemId).textContent = hintMsg;
}

function formValidation() {

  console.log("Hello executed form validation");

  let salutationField = document.querySelector('select[name="salutation"]').value;
  let firstNameField = document.querySelector('input[name="firstName"]').value;
  let lastNameField = document.querySelector('input[name="lastName"]').value;
  let emailField = document.querySelector('input[name="email"]').value;
  let phoneField = document.querySelector('input[name="phone"]').value;
  let dobField = document.querySelector('input[name="dob"]').value;
  let genderField = document.querySelector('input[name="gender"]').value;
  let qualificationField = document.querySelector('input[name="qualifications"]').value;
  let addressField = document.querySelector('input[name="address"]').value;
  let countryField = document.querySelector('select[name="country"]').value;
  let stateField = document.querySelector('select[name="state"]').value;
  let cityField = document.querySelector('input[name="city"]').value;
  let pinField = document.querySelector('input[name="pin"]').value;

  var salutationErr = firstNameErr = lastNameErr = emailErr = phoneErr = dobErr = qualificationErr = addressErr = countryErr = stateErr = cityErr = pinErr = true;

  // validate salutation

  if (salutationField == "") {
    printError("salutationErr", "Please select your salutation.");
  } else {
    printError("salutationErr", "");
    salutationErr = false;
  }

  //validate firstName

  if (firstNameField == "") {
    printError("firstNameErr", "Please enter your First name");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(firstNameField) === false) {
      printError("firstNameErr", "Please enter a valid First name");
    } else {
      printError("firstNameErr", "");
      firstNameErr = false;
    }
  }

  // validate lastName

  if (lastNameField == "") {
    printError("lastNameErr", "Please enter your Last name");
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(lastNameField) === false) {
      printError("lastNameErr", "Please enter a valid Last name");
    } else {
      printError("lastNameErr", "");
      lastNameErr = false;
    }
  }

  // validate email

  if (emailField == "") {
    printError("emailErr", "Please enter your email address");
  } else {
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(emailField) === false) {
      printError("emailErr", "Please enter a valid email address");
    } else {
      printError("emailErr", "");
      emailErr = false;
    }
  }

  // mobile number validation

  if (phoneField == "") {
    printError("phoneErr", "Please enter your mobile number");
  } else {
    var regex = /^[1-9]\d{9}$/;
    if (regex.test(phoneField) === false) {
      printError("phoneErr", "Please enter a valid 10 digit mobile number");
    } else {
      printError("phoneErr", "");
      phoneErr = false;
    }
  }

  // dob

  if (dobField == "") {
    printError("dobErr", "Please select your Date of Birth.");
  } else {
    printError("dobErr", "");
    dobErr = false;
  }

  // qualification validation

  if (qualificationField == "") {
    printError("qualificationErr", "Please enter your qualification");
  } else {
    printError("qualificationErr", "");
    qualificationErr = false;
  }

  // Address validation

  if (addressField == "") {
    printError("addressErr", "Please enter your Address");
  } else {
    printError("addressErr", "");
    addressErr = false;
  }

  //country validation

  if (countryField == "") {
    printError("countryErr", "Please select your country.");
  } else {
    printError("countryErr", "");
    countryErr = false;
  }

  //state validation

  if (stateField == "") {
    printError("stateErr", "Please select your state.");
  } else {
    printError("stateErr", "");
    stateErr = false;
  }

  // city validation

  if (cityField == "") {
    printError("cityErr", "Please enter your City.");
  } else {
    printError("cityErr", "");
    cityErr = false;
  }

  // Pin validation

  if (pinField == "") {
    printError("pinErr", "Please enter your PIN/ZIP.");
  } else {
    var regex = /^[1-9]\d{5}$/;
    if (regex.test(pinField) === false) {
      printError("pinErr", "Please enter a valid 6 digit PIN");
    } else {
      printError("pinErr", "");
      pinErr = false;
    }
  }

  if ((salutationErr || firstNameErr || lastNameErr || emailErr || phoneErr || dobErr || qualificationErr || addressErr || countryErr || stateErr || cityErr || pinErr) == true) {
    return false;
  } else {
    return true;
  }
}

// function to close open modals on escape  
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {

    event.preventDefault();

    closeAddEmployee();
    closeDelEmployee();
    closeEditEmployee();
    closeUserOptions();
  }
});

// search function

function Search() {
  let input, searchText, tableBody, tr, td, i, j, textValue;

  input = document.getElementById('search');
  searchText = input.value.toUpperCase();
  tableBody = document.getElementById('table_body');
  tr = tableBody.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td');
    let rowMatch = false;

    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        textValue = td[j].textContent || td[j].innerText;
        if (textValue.toUpperCase().indexOf(searchText) > -1) {
          rowMatch = true;
          break;
        }
      }
    }
    if (rowMatch) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}


// functon display Pagination
var currentPage = 1;

function Pagination(totalPage) {
  const pagination = document.getElementById('pagination');

  if (totalPage > 1) {

    pagination.style.display = 'flex';

    var temp = `<button id="prev-btn"><span class="material-symbols-outlined">navigate_before</span></button>`;

    for (var i = 1; i <= totalPage; i++) {
      temp += ` <button id="page${i}">${i}</button>`;
    }

    temp += `<button id="next-btn"><span class="material-symbols-outlined">navigate_next</span></button>`;

    pagination.innerHTML = temp;

    for (var i = 1; i <= totalPage; i++) {
      (function (pageNumber) {
        const pageCounter = document.getElementById(`page${pageNumber}`);
        pageCounter.addEventListener('click', function (e) {
          currentPage = pageNumber;
          ReadEmployee();
        });
      })(i);
    }
  }
  const currentPageBtn = document.getElementById(`page${currentPage}`);
  currentPageBtn.style.backgroundColor = '#4318FF';
  currentPageBtn.style.color = '#FFF';

  const PrevBtn = document.getElementById('prev-btn');
  if (currentPage == 1) {
    PrevBtn.style.display = 'none';
  }
  PrevBtn.addEventListener('click', function (e) {
    if (currentPage > 1) {

      PrevBtn.style.backgroundColor = '#4318FF';
      PrevBtn.style.color = '#FFF';

      currentPage--;
      ReadEmployee();
    }
  });

  const NextBtn = document.getElementById('next-btn');
  if (currentPage == totalPage) {
    NextBtn.style.display = 'none';
  }
  NextBtn.addEventListener('click', function (e) {
    if (currentPage < totalPage) {
      NextBtn.style.backgroundColor = '#4318FF';
      NextBtn.style.color = '#FFF';
      currentPage++;
      ReadEmployee();
    }
  });

  return currentPage;
}

//function to post image
async function postImage(empID, file) {
  try {
    console.log("Executed postImage");

    const empAvatar = new FormData();
    empAvatar.append('avatar', file);

    const response = await fetch(`http://localhost:8080/employees/${empID}/avatar`, {
      method: 'POST',
      body: empAvatar,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

//functon to get image
async function getImage(empID) {
  try {
    const response = await fetch(`http://localhost:8080/employees/${empID}/avatar`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function uploadImage(empID, file) {
  console.log("image uploaded third " + file.name + " \n " + empID);

  const headers = new Headers();
  headers.append('Content-Type', file.type);

  const formData = new FormData();
  formData.append('avatar', file);

  fetch(`http://localhost:8080/employees/${empID}/avatar`, {
    method: 'POST',
    headers: headers,
    body: formData
  }).then((res) => res.json())
    .then((data) => {
    console.log(data);
    }).catch((err) => {
      console.log("Error : " + err);
  })
}