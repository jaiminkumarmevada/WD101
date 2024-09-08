function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  
  function isAgeValid(dob) {
    const age = calculateAge(dob);
    return age >= 18 && age <= 55;
  }
  
  // Email validation
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordPattern.test(password);
  }
  
  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termAccepted = document.getElementById("term").checked;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return false;
    }
  
    
    if (!isAgeValid(dob)) {
      alert("You must be between 18 and 55 years old.");
      return false;
    }
  
   
    saveDataToStorage(name, email, password, dob, termAccepted);
    displaySavedData();
    document.getElementById("myForm").reset();
    return true;
  }
  
  function saveDataToStorage(name, email, password, dob, termAccepted) {
    const formData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      termAccepted: termAccepted
    };
  
    let storedData = JSON.parse(localStorage.getItem("formDataList")) || [];
    storedData.push(formData);
    localStorage.setItem("formDataList", JSON.stringify(storedData));
  }
  
  function displaySavedData() {
    const storedData = JSON.parse(localStorage.getItem("formDataList")) || [];
  
    const table = document.getElementById("data-table");
    table.innerHTML = '';
   
    let headers = `
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>DOB</th>
        <th>Accepted terms?</th>
      </tr>`;
    table.innerHTML = headers;
  
 
    storedData.forEach(data => {
      const newRow = table.insertRow();
      newRow.insertCell(0).innerText = data.name;
      newRow.insertCell(1).innerText = data.email;
      newRow.insertCell(2).innerText = data.password;
      newRow.insertCell(3).innerText = data.dob;
      newRow.insertCell(4).innerText = data.termAccepted ? "Yes" : "No";
    });
  }
  
  window.onload = displaySavedData;
  
  document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
    validateForm();
  });
  
  