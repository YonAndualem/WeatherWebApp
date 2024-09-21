<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Function to get email template
function getEmailTemplate($subject, $body) {
    return "
    <html>
    <head>
        <title>$subject</title>
    </head>
    <body>
        <h1>$subject</h1>
        <p>$body</p>
        <br>
        <br>
        <br>
        <hr>
        <p>Thank you for using our service!</p>
        <br>
        <p>Weatherlytics.</p>
    </body>
    </html>
    ";
}

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$messageBody = $data->message; // Get the custom message

// Customize your email subject
$subject = 'Response to Your Report';

// Get the email template with the custom message
$message = getEmailTemplate($subject, $messageBody);

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'lyticsweather@gmail.com'; // Your Gmail address
    $mail->Password = 'ijizjwfqvvmefnfa'; // Your App Password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption
    $mail->Port = 587; // TCP port to connect to

    // Recipients
    $mail->setFrom('lyticsweather@gmail.com', 'Weather Issues Admin');
    $mail->addAddress($email); // Add recipient

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $message;

    $mail->send();
    
    echo json_encode(["message" => "Reply sent successfully."]);
} catch (Exception $e) {
    echo json_encode(["error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>
