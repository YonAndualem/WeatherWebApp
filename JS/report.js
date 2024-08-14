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


        const formData = {
            name: name,
            email: email,
            issueType: issueType,
            description: description,
        };

        localStorage.setItem("formData", JSON.stringify(formData));

        showModal("Thank You for your feedback!", function () {
            window.location.href = "../Assets/weather.html";
        });
    });

function showModal(message, callback) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementsByClassName("close")[0];

    modalMessage.textContent = message;
    modal.style.display = "block";

    closeBtn.onclick = function () {
        modal.style.display = "none";
        if (callback) callback();
    };

    
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (callback) callback();
        }
    };


    setTimeout(function () {
        modal.style.display = "none";
        if (callback) callback();
    }, 3000); 
}
