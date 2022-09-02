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


            // Créé notes, page, content par défault 

            //Note
            $query = 'SELECT user_id FROM user ORDER BY user_id DESC';
            $user_id = Db::fetch($query, 'User');

            $query = "INSERT INTO note (note_name, user_id) VALUES ('Nouvelle note', '".  $user_id->user_id . "')"; 

            $statement = Db::$pdo->prepare($query);
            $statement->execute(); 

            //page
            $query = 'SELECT note_id FROM note ORDER BY note_id DESC';
            $note_id = Db::fetch($query, 'Note');


            $query = "INSERT INTO page (note_id, page_name) VALUES ('" . $note_id->note_id ."' , 'Nouvelle page')"; 

            $statement = Db::$pdo->prepare($query);
            $statement->execute(); 

            $query = 'SELECT page_id FROM page ORDER BY page_id DESC';
            $page_id = Db::fetch($query, 'Page');

            $query = "INSERT INTO content (page_id, position, type, content) VALUES ('" . $page_id->page_id ."', '1', 'p', 'Nouvelle page - faites un double clic pour modifier ce texte. Ajouter un titre, du texte ou du code avec + . Vous pouvez ensuite déplacer les blocs de contenu si besoin')"; 

            $statement = Db::$pdo->prepare($query);
            $statement->execute(); 
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




        $queryUpdatePassword = 'UPDATE user SET
        password = \'' . $this->inputPassword . '\'
        WHERE mail = \'' . $_SESSION['mail'] . '\'';
        
        $statement = Db::$pdo->prepare($queryUpdatePassword);
        $statement->execute();  
        
      
    }


    public function deleteUser()
    {

        Db::connexion();  

        $queryUpdatePassword = 'DELETE FROM user WHERE mail = \'' . $_SESSION['mail'] . '\'';
        $statement = Db::$pdo->prepare($queryUpdatePassword);
        $statement->execute();  

        // Prévoir de suppr aussi les notes, pages et contents associés.
        
    }



}
