<?php

$recipient = $_POST['email'];


switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $subject = "Here is the link to reset the password for e-mail: " . $_POST['email'];
        $headers = "From:  noreply@developerakademie.com";

        mail($recipient, $subject, "Please click on the following link to reset the password: 
        https://f015d041@gruppe-610.developerakademie.net/join-610/html/reset_password.html?email=".$_POST['email'], $headers);

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
