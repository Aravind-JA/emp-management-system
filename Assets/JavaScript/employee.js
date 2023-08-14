function retrieveAndUseIdFromUrl(url) {
    const regex = /\/employee\/([^/]+)$/;
  
    const match = url.match(regex);
    if (match) {
        const id = match[1];
        
        return id;
  
     
    } else {
      console.error('Id not found in the URL');
    }
  }
  

const empID = retrieveAndUseIdFromUrl(window.location.href);

const empNaming = document.getElementById('emp_naming');

const empGender = document.getElementById('gender').querySelector('h4');
const empAge = document.getElementById('age').querySelector('h4');
const empDOB = document.getElementById('dob').querySelector('h4');
const empPhone = document.getElementById('phone').querySelector('h4');
const empQualification = document.getElementById('qualifications').querySelector('h4');
const empAddress = document.getElementById('address').querySelector('h4');
const empCountry = document.getElementById('country').querySelector('h4');

fetch(`http://localhost:8080/employees/${empID}`)
    .then((res) => res.json())
    .then((employee) => {
        empNaming.innerHTML = `
                    <h2>${employee.salutation} ${employee.firstName} ${employee.lastName}</h2>
                    <p>${employee.email}</p>`;

        empGender.textContent = employee.gender;
        empAge.textContent = age(employee.dob) + " Years";
        empDOB.textContent = dob(employee.dob);
        empPhone.textContent = employee.phone;
        empQualification.textContent = employee.qualifications;
        empAddress.textContent = employee.address;
        empCountry.textContent = employee.country;
    });

// to GET image

// fetch(`http://localhost:3000/employees/${empID}/avatar`)
//     .then((res) => res.blob())
//     .then((value) => {
//         const imageUrl = URL.createObjectURL(value);
//         const empImageBanner = document.getElementById('employee_image');

//         empImageBanner.src = imageUrl;
//      });

function dob(dob) {
const dobDate = new Date(dob);
const year = dobDate.getFullYear();
const month = (dobDate.getMonth() + 1).toString().padStart(2, '0');
const date = dobDate.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${date}`;
    
return dateString;
}

function age(dob) {

    const dobDate = new Date(dob);
    const now = new Date();
    const age = now.getFullYear() - dobDate.getFullYear();

    return age;
}
//     const [day, month, year] = dob.split("-");
//     const newDateString = `${year}-${month}-${day}`;

//     const dateOfBirth = new Date(newDateString);
//     const now = new Date();

//     let age = now.getFullYear() - dateOfBirth.getFullYear();

//     return age;
// }

const Delete = document.getElementById('deleteEmp');
Delete.addEventListener('click', async function () {
    openDelEmployee(empID);
});

const Update = document.getElementById('editEmp');
Update.addEventListener('click', async function () {
    openEditEmployee(empID);
});



