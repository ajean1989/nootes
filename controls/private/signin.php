<?php

declare(strict_types=1);

// output : username, mail, connexion, erreur

if(isset($_SESSION['username']))
{
    $status = ['connexion' => 1];
    $status = json_encode($status);
    echo $status;
}
elseif(isset($_POST['username']))
{

    require_once $modelsDirectory . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'signin.php';

    if($_SESSION['error'] === 'none')
    {
        $_SESSION['username'] = $User->inputUsername;
        $_SESSION['mail'] = $User->inputMail;
        $_SESSION['admin'] = 0;
        $_SESSION['valid'] = 1;     

        $status['username'] = $_SESSION['username'];
        $status['mail'] = $_SESSION['mail'];
        $status['admin'] = $_SESSION['admin'];
        $status['error'] = $_SESSION['error'];

        $status = json_encode($status);
        echo $status;
    }
    else
    {
        $status['error'] = $_SESSION['error'];
        $status = json_encode($status);
        echo $status;
    }

    

}
else
{
    $status['error'] = 'erreur : Les données du formulaire ne sont pas parvenues au serveur';
    $status = json_encode($status);
    echo $status;
}
