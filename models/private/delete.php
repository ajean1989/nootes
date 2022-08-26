<?php

declare(strict_types=1);

Db::Connexion();

$json = file_get_contents('php://input');

$json = json_decode($json);  // [[],[],...]


$query = 'DELETE FROM content WHERE content_id = \'' . $json . '\'';
$statement = Db::$pdo->prepare($query);
$statement->execute(); 




