<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather_issues";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;

    $sql = "SELECT * FROM admins WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['admin'] = $email;
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
$conn->close();
