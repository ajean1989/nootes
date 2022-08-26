<?php

declare(strict_types=1);

Db::Connexion();

$json = file_get_contents('php://input');
$json = json_decode($json);

$query = 'SELECT note.note_id, note.note_name, note.share, page.page_id, page.page_name, content.content_id, content.position, content.type, content.content FROM note INNER JOIN page ON note.note_id = page.note_id INNER JOIN content ON page.page_id = content.page_id WHERE page.page_id = \'' . $json .'\'';

//Voir si on peut suppr note.share dans $query

$PublicNotes = Db::fetchall($query, 'Content');

//$propPublicNotes = get_object_vars($PublicNotes);

$propPublicNotes = $PublicNotes;

$propPublicNotes = json_encode($propPublicNotes);



