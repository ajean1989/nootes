<?php

declare(strict_types=1);

$json = file_get_contents('php://input');

$json = json_decode($json,true);  // [[],[],...]

var_dump($json);


Db::Connexion();

for($i=0; $i<count($json); $i++){
    $query = 'UPDATE content SET 
            content.position = \'' .  $json[$i]['position'] . '\',
            content.type = \'' . $json[$i]['type'] . '\',
            content.content= \'' . $json[$i]['content'] . '\'
            WHERE content.page_id = \'' . $json[$i]['page_id'] . '\' AND '; 

    $statement = Db::$pdo->prepare($query);
    $statement->execute(); 
}


//Voir si on peut suppr note.share dans $query

$updateContent = Db::fetchall($query, 'Content');

$updateContent = json_encode($updateContent);


