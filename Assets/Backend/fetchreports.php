<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather_issues";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch data
$sql = "SELECT * FROM reports";
$result = $conn->query($sql);

$reports = [];
while ($row = $result->fetch_assoc()) {
    // Format the report_time in two lines: time on one line and date on the next
    $formatted_time = date('h:i:s A', strtotime($row['report_time']));
    $formatted_date = date('d-m-Y', strtotime($row['report_time']));
    
    // Combine time and date with an HTML <br> tag for new line in HTML
    $row['report_time'] = $formatted_time . "<br>" . $formatted_date;
    
    // Add the row to the reports array
    $reports[] = $row;
}

// Encode the reports array to JSON and output it
echo json_encode($reports);

// Close the connection
$conn->close();
?>
