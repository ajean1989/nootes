<?php

declare(strict_types=1);

session_start();


// Chargement des variables

require_once '../src/var.php';

// Chargement des classes

require_once $classDirectory . 'test.php';

require_once $classDirectory . 'db.php';
require_once $classDirectory . 'users_inputs.php';
require_once $classDirectory . 'users_safety.php';
require_once $classDirectory . 'users_controls.php';
require_once $classDirectory . 'CRUDUser.php';
require_once $classDirectory . 'user.php';
require_once $classDirectory . 'note.php';
require_once $classDirectory . 'page.php';
require_once $classDirectory . 'content.php';




// Router

$regex = '#/fetch#';
$uri = $_SERVER['REQUEST_URI'];

if(preg_match($regex,$uri))
{
    switch($uri)
    {
        case '/fetch/Public/outside':
            require_once $controlsDirectory . 'public'. DIRECTORY_SEPARATOR .'outside.php';
            break;
        case '/fetch/Public/inside':
            require_once $controlsDirectory . 'public'. DIRECTORY_SEPARATOR .'inside.php';
            break;
        case '/fetch/Private/status':
           require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'status.php';
           break;
        case '/fetch/Private/connexion':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'connexion.php';
            break;
        case '/fetch/Private/signin':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'signin.php';
            break;
        case '/fetch/Private/outside':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'outside.php';
            break;
        case '/fetch/Private/inside':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'inside.php';
            break;
        case '/fetch/Private/update':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'update.php';
            break;
        case '/fetch/Private/add':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'add.php';
            break;
        case '/fetch/Private/disconnect':
            require_once $controlsDirectory . 'private'. DIRECTORY_SEPARATOR .'disconnect.php';
            break;
        
    }

}
else{
    require_once $layoutsDirectory . 'html.php';  
}




