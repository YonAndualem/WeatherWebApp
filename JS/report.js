document
  .getElementById("reportForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const issueType = document.getElementById("issue-type").value;
    const description = document.getElementById("description").value.trim();

    if (name === "" || email === "" || issueType === "" || description === "") {
      showModal("Please fill in all required fields.");
      return;
    }

    if (!/^[A-Za-z\s'-]+$/.test(name)) {
      showModal("Please enter a valid name.");
      return;
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      showModal("Please enter a valid email address.");
      return;
    }

    // Create a JSON object
    const formData = {
      name: name,
      email: email,
      issueType: issueType,
      description: description,
    };

    // Save the JSON object as a string in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Redirect the user to the assets/weather page after showing the modal
    showModal("Form submitted successfully!", function () {
      window.location.href = "../Assets/weather.html";
    });
  });

// Function to show the modal with a custom message
function showModal(message, callback) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.getElementsByClassName("close")[0];

  modalMessage.textContent = message;
  modal.style.display = "block";

  // Handle the modal close event
  closeBtn.onclick = function () {
    modal.style.display = "none";
    if (callback) callback();
  };

  // Close the modal if the user clicks outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      if (callback) callback();
    }
  };

  // Automatically close the modal after a delay and then call the callback
  setTimeout(function () {
    modal.style.display = "none";
    if (callback) callback();
  }, 3000); // Auto-close after 3 seconds
}
