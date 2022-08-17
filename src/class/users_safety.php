<?php 

declare(strict_types=1);


Class UsersSafety extends UsersInputs
{

    private int $lenName;
    private int $lenPassword;

    private string $regexName;
    private string $regexPassword;


    public function getLen($type='new')    
    {
        if($type !== 'password')
        {
            $this->lenName = strlen($this->inputUsername);
            //$lenMail = strlen($this->inputMail);
        }
        if($type==='new' || $type === 'password')
        {
                $this->lenPassword = strlen($this->inputPassword);
        }
    }


    public function setRegex($type='new')
    {
        if($type !== 'password')
        {
            $this->regexName = '#[^=”<>:/\*$()]{' . $this->lenName . '}#';
            $this->regexMail = '#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#';
        }
        if($type==='new'|| $type === 'password')
        {
            $this->regexPassword = '#[^=”<>:/\*$()]{' . $this->lenPassword . '}#';
        }
     
    }


   


    public function inputsControls($type='new')
    {
        $this->getLen($type);

        $this->setRegex($type);

        if($type !== 'password')
        {
            if(!preg_match($this->regexName, $this->inputUsername))
            {    
                $_SESSION['error'] = ':: Les caratères interdits pour le username sont = ” < > / \ * $ ( ) ::';
            }
            elseif(!preg_match($this->regexMail, $this->inputMail))
            {
                $_SESSION['error'] = ':: Adresse mail non valide ::';
            }
        }
        if($type === 'new' || $type === 'password')
        {
            if(!preg_match($this->regexPassword, $this->inputPassword))
            {
                $_SESSION['error'] = ':: Les caratères interdits pour le mot de passe sont = ” < > / \ * $ ( ) ::';
           }
            elseif($this->lenPassword < 6)
            {    
                $_SESSION['error'] = ':: Le mot de passe doit faire au moins 6 caractères ::';
            }
        }
    }

    

    public function htmlspecialchars($type='new')
    {
        if($type !== 'password')
        {
            $this->inputName = htmlspecialchars($this->inputUsername);
            $this->inputMail = htmlspecialchars($this->inputMail);
        }
        if($type === 'new' || $type === 'password')
            {
                $this->inputPassword = SHA1($this->inputPassword);
            }

    }


}