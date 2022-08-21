<?php

declare(strict_types=1);

Db::Connexion();

$json = file_get_contents('php://input');
$json = json_decode($json);

$query = 'SELECT note.note_id, note.note_name, note.share, page.page_id, page.page_name, content.content_id, content.position, content.type, content.content FROM user INNER JOIN note ON user.user_id = note.user_id INNER JOIN page ON note.note_id = page.note_id INNER JOIN content ON page.page_id = content.page_id WHERE content.page_id = \'' . $json . '\'';

//Voir si on peut suppr note.share dans $query

$insideContent = Db::fetchall($query, 'Content');

$insideContent = json_encode($insideContent);


