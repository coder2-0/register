window.onload = function () {
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });
};

function submitForm() {
  // Get form values
  const id = document.getElementById("id").value;
  const fullName = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const status = document.getElementById("status").value;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("fullName", fullName);
  formData.append("address", address);
  formData.append("status", status);

  const data = new URLSearchParams(formData).toString();

  // Send POST request
  fetch("https://resgister-backend.onrender.com/fee", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(handleResponse)
    .then(displayConfirmation)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function displayConfirmation(data) {
  // Update DOM to show confirmation
  const form = document.querySelector("form");
  const confirmation = document.getElementById("confirmation");
  const title = document.querySelector("h1");

  form.style.display = "none";
  confirmation.style.display = "flex";
  title.innerText = "Confirmation of Registration";

  const information = document.getElementById("information");
  information.innerHTML = `ID: ${data.id}<br>
    Full Name: ${data.fullName}<br>
    Address: ${data.address}<br>
    Fee: ${data.fee}`;

  const switchButton = document.getElementById("switch");
  switchButton.addEventListener("click", function () {
    title.innerText = "Registration Page";
    form.style.display = "block";
    confirmation.style.display = "none";
  });
}

function handleError(error) {
  console.error("Error sending POST request:", error);
}
