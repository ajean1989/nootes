<?php 
header("Content-Security-Policy: default-src 'self'");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
header("Cache-Control: no-cache, no-store, must-revalidate");


if(!isset($_COOKIE['previousData']))
{
    setcookie('previousData', 'init', time()+365*24*3600);
}
else
{
    $json = file_get_contents('php://input');
    if($json !== "")
    {
        $jsonData = json_decode($json);
        setcookie('previousData', $jsonData, time()+365*24*3600);
    }
     
}


function taille_dossier($rep){                              //  $rep = dossier source
    $racine=opendir($rep);                                  // $racine : ressource
    $taille=0;                                     
    while($dossier=readdir($racine)){                       // $dossier = liste des fichiers  
        if(!in_array($dossier, Array("..", "."))){          // Si . et .. n'appartiennent pas à la liste
            if(is_dir("$rep/$dossier")){                       // Si le fichier est un dossier                  $rep/$dossier = dossier source                
                $taille+=taille_dossier("$rep/$dossier");                                                        // $racine : ressource
            }else{                                                                                               // $dossier = liste des fichiers  
                $taille+=filesize("$rep/$dossier");                                                              //Si . et .. n'appartiennent pas à la liste
            }                                                                                                        // Si le fichier est un dossier            Nouveau  $rep/$dossier = dossier source  
        }
    }                                                                                                                                                              // infini
    closedir($racine);
    return $taille;
}


$size = taille_dossier(dirname(__DIR__)); // Si racine dans public (dirname(__DIR__)) sinon (__DIR__)


$data = array('size' => $size, 'cookie' => $_COOKIE['previousData']);
$data = json_encode($data);
echo $data;





