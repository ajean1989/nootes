<?php

declare(strict_types=1);

$json = file_get_contents('php://input');

$json = json_decode($json,true);  // [[],[],...]




Db::Connexion();

if($json[1]['type'] === 'note'){
    $query = "INSERT INTO note (note_name, user_id) VALUES ('" .  $json[0]['input'] . "', '".  $json[3]['user_id'] . "')"; 

    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 


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
elseif($json[1]['type'] === 'page'){
    $query = "INSERT INTO page (page_name, note_id) VALUES ('" .  $json[0]['input'] . "', '".  $json[2]['note_id'] . "')";

    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 
}







$updateContent = json_encode(true);

