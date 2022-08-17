<?php

declare(strict_types=1);



//if(isset($_POST['username'])){
//$hey = json_encode($_POST['username']);

//echo $hey;
//}

//require_once $modelsDirectory . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'connexion.php';


//echo($connexionResponse);



$status= [];

if(isset($_SESSION['try']) && $_SESSION['try']>10)
{
    $_SESSION['error'] = 'Trop d\'echecs Kasparov, reviens dans ... 180 minutes';
    $status['try'] = $_SESSION['try'];
    $status = json_encode($status);
    echo $status;
}



if (isset($_POST['username']))
{
    // Initialisation des tentatives

    if(!isset($_SESSION['try']))
    {
        $_SESSION['try'] = (int) 1;
    }

    
    require_once $modelsDirectory . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'connexion.php';


    // Est ce que les inputs matches ?
    // Pas de contrôle des entrées car $_POST sera uniquement comparé et jamais affiché ou en requête

 
    foreach($listUsers as $user)
    {
        if($user->username === $_POST['username'] && $user->password === SHA1($_POST['password']))
        {
            $_SESSION['mail'] = $user->mail;
            $_SESSION['username'] = $user->username;
            $_SESSION['admin'] = $user->admin;
        }

    } 

    if(isset($_SESSION['username']))
    {
        unset($_SESSION['try']);
        $status['connexion'] = 1;
        $status['username'] =  $_POST['username'];
        $status['mail'] = $_SESSION['mail'];
        $status['admin'] = $_SESSION['admin'];
        $status['error'] = 'none';
        $status = json_encode($status);
        echo $status;
    }
    else
    {

        $status['connexion'] = 0;
        $status['error'] = ' Erreur - identifiants non valides : ' . $_SESSION['try'] . '/10 tentatives -';
        $_SESSION['try']++;
        $status = json_encode($status);
        echo $status;
    }


}
else
{
    if(isset($_SESSION['username']))
    {
        $status['connexion'] = 1;
        $status['error'] = 'Déjà connecté(e)';
        $status = json_encode($status);
        echo $status;
    }
    else
    {
        $status['error'] =  'Erreur : pas de donnée formulaire reçue';
        $status = json_encode($status);
        echo $status;
    }
}

























