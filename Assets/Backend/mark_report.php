<?php
// Database connection details
$host = 'localhost'; // Database host
$user = 'your_username'; // Database username
$password = 'your_password'; // Database password
$database = 'your_database'; // Database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$status = $data->status;

// Prepare and execute the update query
$sql = "UPDATE reports SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Report status updated successfully."]);
} else {
    echo json_encode(["message" => "Error updating report status: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
