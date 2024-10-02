document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;

        fetch("backend/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    document.getElementById("loginSection").style.display = "none";
                    document.getElementById("reportsSection").style.display = "block";
                    fetchReports();
                } else {
                    alert("Invalid email or password.");
                }
            });
    });

function fetchReports() {
    fetch("backend/fetchreports.php")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document
                .getElementById("reportsTable")
                .querySelector("tbody");
            tbody.innerHTML = "";
            data.forEach((report) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${report.id}</td>
                    <td>${report.name}</td>
                    <td>${report.email}</td>
                    <td>${report.issue_type}</td>
                    <td>${report.description}</td>
                    <td>${report.report_time}</td>
                    <td>
                        <button onclick="openReplyModal('${report.email
                    }')">Reply</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function openReplyModal(email) {
    const modal = document.getElementById("replyModal");
    modal.style.display = "block";


    document.getElementById("sendReply").onclick = function () {
        const message = document.getElementById("replyMessage").value;

        const closeBtn = document.getElementsByClassName("close")[0];

        closeBtn.onclick = function () {
            modal.style.display = "none";
        };

        fetch("backend/sendReply.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        })
            .then((response) => response.text())
            .then((result) => {
                alert(result);
                modal.style.display = "none";
                document.getElementById("replyMessage").value = "";
            });
    };
}
