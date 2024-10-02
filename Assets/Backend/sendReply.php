<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function getEmailTemplate($subject, $body)
{
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
$messageBody = $data->message;


$subject = 'Response to Your Report';


$message = getEmailTemplate($subject, $messageBody);

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'lyticsweather@gmail.com';
    $mail->Password = 'lvyq bsst fjer dony';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('lyticsweather@gmail.com', 'Weather Issues Admin');
    $mail->addAddress($email);

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $message;

    $mail->send();

    echo json_encode(["message" => "Reply sent successfully."]);
} catch (Exception $e) {
    echo json_encode(["error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
