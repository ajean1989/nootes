<?php

declare(strict_types=1);


// Chargement des variables

require_once '../src/var.php';

// Chargement des classes

require_once $classDirectory . 'test.php';

require_once $classDirectory . 'db.php';
require_once $classDirectory . 'user.php';
require_once $classDirectory . 'note.php';
require_once $classDirectory . 'page.php';
require_once $classDirectory . 'content.php';

// Router

$regex = '#^/fetch#';
$uri = $_SERVER['REQUEST_URI'];

if(preg_match($regex,$uri))
{
    switch($uri)
    {
        case '/fetch/public/users':
            require_once $controlsDirectory . 'public'. DIRECTORY_SEPARATOR .'users.php';
            break;


        
    }

}
else{
    require_once $layoutsDirectory . 'html.php';  
}




