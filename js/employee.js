const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const countryInput = document.getElementById("country");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");
const emergencyContactInput = document.getElementById("emergency-contact");
const selfDescriptionInput = document.getElementById("self-description");
const pictureInput = document.getElementById("picture");
const picturePreview = document.getElementById("picture-preview");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const employee = {
            name: nameInput.value,
            address: addressInput.value,
            country: countryInput.value,
            dob: dobInput.value,
            phone: phoneInput.value,
            emergencyContact: emergencyContactInput.value,
            selfDescription: selfDescriptionInput.value,
            picture: pictureInput.files[0], // Get the selected file
        };

        console.log(employee);

        // Display employee data
        const employeeDetails = document.createElement("div");
        employeeDetails.innerHTML = `
      <h2>Employee Details</h2>
      <p>Name: ${employee.name}</p>
      <p>Address: ${employee.address}</p>
      <p>Country: ${employee.country}</p>
      <p>Date of Birth: ${employee.dob}</p>
      <p>Phone: ${employee.phone}</p>
      <p>Emergency Contact: ${employee.emergencyContact}</p>
      <p>Self Description: ${employee.selfDescription}</p>
      <img src="" alt="Employee Picture" id="employee-picture">
  `;
        document.body.appendChild(employeeDetails);

        // Display img
        const pictureReader = new FileReader();
        pictureReader.onload = function (event) {
            const employeePicture = document.getElementById("employee-picture");
            employeePicture.src = event.target.result;
            employeePicture.style.width = "100px";
        };
        pictureReader.readAsDataURL(employee.picture);
    });
}
