<?php 

declare(strict_types=1);


Class UsersControls extends UsersSafety
{


    public function mailAlreadyInDb()
    // Affiche un message si l'utilisateur est déjà enregistrer
    {

        if(isset($_SESSION['mail'])) // En cas de modification de profil
        {
            if($_SESSION['mail'] !== $this->inputMail)
            {
                foreach($GLOBALS['listUsers'] as $user)
                {
                    if($user->mail === $this->inputMail)
                    {
                        $_SESSION['error'] = ':: Modification impossible :: Adresse mail déjà enregistrée ::';
                    }
                }
            }
        }
        else    // En cas d'inscription
        {
            foreach($GLOBALS['listUsers'] as $user)
            {
                if($user->mail === $this->inputMail)
                {
                    $_SESSION['error'] = ':: Adresse mail déjà enregistrée ::';
                }
            }
        }

    }

    public function usernameAlreadyInDb()
    // Affiche un message si l'utilisateur est déjà enregistrer
    {

        if(isset($_SESSION['username'])) // En cas de modification de profil
        {
            if($_SESSION['username'] !== $this->inputUsername)
            {
                foreach($GLOBALS['listUsers'] as $user)
                {
                    if($user->username === $this->inputUsername)
                    {
                        $_SESSION['error'] = 'Modification impossible, username déjà utilisé.';
                    }
                }
            }
        }
        else    // En cas d'inscription
        {
            foreach($GLOBALS['listUsers'] as $user)
            {
                if($user->username === $this->inputUsername)
                {
                    $_SESSION['error'] = 'username déjà utilisé.';
                }
            }
        }

    }


    public function comparePassword()
    {
        if($_POST['newPassword'] !== $_POST['newPasswordR'])
        {
            $_SESSION['error'] = ':: Les nouveaux mots de passe ne sont pas identiques ::';
        }
    }

}