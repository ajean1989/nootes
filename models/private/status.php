<?php

declare(strict_types=1);

Db::Connexion();

if(isset($_SESSION['username']) && isset($_SESSION['mail']))
{
    $statusRequest = ['connexion' => 1, 
                     'username' => $_SESSION['username'],
                     'mail' => $_SESSION['mail']];
}
else
{
    $statusRequest = ['connexion' => 0, 
    'username' => '',
    'mail' => ''];
}


$statusRequest = json_encode($statusRequest);



