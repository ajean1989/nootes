<?php

declare(strict_types=1);

Db::Connexion();

$json = file_get_contents('php://input');

$json = json_decode($json,true);  // [[],[],...]


$query = 'INSERT INTO content( page_id, type, position, content) VALUES ( :page_id, :type, :position, :content)';
$statement = Db::$pdo->prepare($query);
$statement->execute([
    'page_id'=>$json['page_id'],
    'type'=>$json['type'],
    'position'=>$json['position'],
    'projection'=>$json['projection'],

]); 