<?php 

declare(strict_types=1);



Class CRUDUser extends UsersControls
{

    public function addUser()
    {

        Db::connexion();  

        $this->Setinputs();         

        $this->inputsControls();

        $this->htmlspecialchars();

        $this->mailAlreadyInDb();

        $this->usernameAlreadyInDb();

        if($_SESSION['error'] === 'none')
        {
            $query = 'INSERT INTO user(username, mail, password) VALUES (:username, :mail, :password)';
            $statement = Db::$pdo->prepare($query);
            $statement->execute([
                'username'=>$this->inputUsername,
                'mail'=>$this->inputMail,
                'password'=>$this->inputPassword,
            ]);  
        }
    }



    public function modifyUser()
    {

        Db::connexion();  

        $this->Setinputs();         

        $this->inputsControls('modify');

        $this->htmlspecialchars('modify');

        $this->userAlreadyInDb();


        $queryUpdateUser = 'UPDATE users SET
        mail = \'' . $this->inputMail . '\',
        name = \'' . $this->inputUsername . '\',
        WHERE mail = \'' . $_SESSION['mail'] . '\'';
        
        $statement = Db::$pdo->prepare($queryUpdateUser);
        $statement->execute();  
        
      
    }

    public function modifyPassword()
    {

        Db::connexion();  

        $this->comparePassword();

        $this->SetInputForNewPassword();         

        $this->inputsControls('password');

        $this->htmlspecialchars('password'); // Pour le SHA1




        $queryUpdatePassword = 'UPDATE users SET
        password = \'' . $this->inputPassword . '\'
        WHERE mail = \'' . $_SESSION['mail'] . '\'';
        
        $statement = Db::$pdo->prepare($queryUpdatePassword);
        $statement->execute();  
        
      
    }


    public function deleteUser()
    {

        Db::connexion();  

        $queryUpdatePassword = 'DELETE FROM users WHERE mail = \'' . $_SESSION['mail'] . '\'';
        $statement = Db::$pdo->prepare($queryUpdatePassword);
        $statement->execute();  
        
      
    }



}
