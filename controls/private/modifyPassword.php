<?php 

declare(strict_types=1);


unset($_SESSION['info']); 
unset($_SESSION['error']); 

if(isset($_SESSION['mail']))
{
    if(isset($_POST['password']))
    {

        require_once $modelsDirectory . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR .  'modifyPassword.php';


        if($password->password !== SHA1($_POST['password']))
        {
            $return = ['valid'=> 0];
            $_SESSION['info'] = 'L\'ancien mot de passe n\'est pas correcte';
        }
        else
        {
            if(!isset($_SESSION['error'])){  
                $return = ['valid'=> 1];
                $_SESSION['info'] = 'Mot de passe modifié';
            }
            else{
                $return = ['valid'=> 0];
                $_SESSION['info'] = $_SESSION['error'];
            }
        }
    }
    else
    {
        $return = ['valid'=> 0];
        $_SESSION['info'] = 'Erreur de transmission';
    }
}

$return = json_encode($return);

echo $return;


