<?php

declare(strict_types=1);

$json = file_get_contents('php://input');

$json = json_decode($json, true);  // [share => x, note_id => y]




Db::Connexion();

if($json['share'] === 1){
    $query = 'UPDATE note SET 
    share = \'0\'
    WHERE note.note_id = \'' . $json['note_id'] . '\''; 
}
elseif($json['share'] === 0){
    $query = 'UPDATE note SET 
    share = \'1\'
    WHERE note.note_id = \'' . $json['note_id'] . '\''; 
}


$statement = Db::$pdo->prepare($query);
$statement->execute(); 




$updateContent = json_encode(true);

