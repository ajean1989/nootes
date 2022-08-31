<?php

declare(strict_types=1);

$json = file_get_contents('php://input');

$json = json_decode($json,true);  // [[],[],...]




Db::Connexion();

if($json[2]['type'] === 'note'){
    $query = 'UPDATE note SET 
    note.note_name = \'' .  $json[0]['input'] . '\'
    WHERE note.note_id = \'' . $json[1]['note_id'] . '\''; 
}
elseif($json[2]['type'] === 'page'){
    $query = 'UPDATE page SET 
    page.page_name = \'' .  $json[0]['input'] . '\'
    WHERE page.page_id = \'' . $json[1]['page_id'] . '\''; 
}


$statement = Db::$pdo->prepare($query);
$statement->execute(); 




$updateContent = json_encode(true);

