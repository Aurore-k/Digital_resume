<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $subject = strip_tags(trim($_POST["subject"]));
  $message = trim($_POST["message"]);

  if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Veuillez remplir correctement le formulaire.";
    exit;
  }

  $to = "sapin.aurore@gmail.com";
  $subject = "Nouveau message de contact : $subject";

  $email_content = "Nom : $name\n";
  $email_content .= "Email : $email\n\n";
  $email_content .= "Message :\n$message\n";

  $email_headers = "From: $name <$email>";

  if (mail($to, $subject, $email_content, $email_headers)) {
    echo "Votre message a été envoyé.";
  } else {
    echo "Oops! Quelque chose a mal tourné.";
  }
}
?>