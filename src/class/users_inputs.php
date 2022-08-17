<?php 

declare(strict_types=1);

Class UsersInputs
{

    public mixed $inputUsername;
    public mixed $inputMail;
    public mixed $inputPassword;

   
    public  function Setinputs()
    {
        $this->inputUsername = isset($_POST['username']) ? $_POST['username'] : false ;
        $this->inputMail = isset($_POST['mail']) ? $_POST['mail'] : false ;
        $this->inputPassword = isset($_POST['password']) ? $_POST['password']: false ;
    }

    public  function SetInputForNewPassword()
    {
        $this->inputPassword = isset($_POST['newPassword']) ? $_POST['newPassword']: false ;
    }

   


}