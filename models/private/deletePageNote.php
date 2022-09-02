<?php

declare(strict_types=1);

Db::Connexion();

$json = file_get_contents('php://input');

$json = json_decode($json,true);  // []




if(isset($json['note_id'])){
    $query = 'DELETE FROM note WHERE note_id = \'' . $json['note_id'] . '\'';
    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 

    $query = 'SELECT page_id FROM page WHERE note_id = \'' . $json['note_id'] . '\'';
    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 
    $page_id = $statement->fetchall(PDO::FETCH_COLUMN);


    foreach($page_id as $id){
        $query = 'DELETE FROM page WHERE page_id = \'' . $id . '\'';
        $statement = Db::$pdo->prepare($query);
        $statement->execute(); 

        $query = 'DELETE FROM content WHERE page_id = \'' .$id . '\'';
        $statement = Db::$pdo->prepare($query);
        $statement->execute(); 
    }


   

}
elseif(isset($json['page_id'])){
    $query = 'DELETE FROM page WHERE page_id = \'' . $json['page_id'] . '\'';
    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 

    $query = 'DELETE FROM content WHERE page_id = \'' . $json['page_id'] . '\'';
    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 

}



