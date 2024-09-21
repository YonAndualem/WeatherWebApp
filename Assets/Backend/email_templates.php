<?php
function getEmailTemplate($subject, $body) {
    return "
    <html>
    <head>
        <title>$subject</title>
    </head>
    <body>
        <h1>$subject</h1>
        <p>$body</p>
    </body>
    </html>
    ";
}
?>
