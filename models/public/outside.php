<?php

declare(strict_types=1);

Db::Connexion();

$query = 'SELECT user.user_id, user.username, note.note_id, note.note_name, note.share, page.page_id, page.page_name FROM user INNER JOIN note ON user.user_id = note.user_id INNER JOIN page ON note.note_id = page.note_id WHERE note.share = 1';

//Voir si on peut suppr note.share dans $query

$PublicNotes = Db::fetchall($query, 'Content');

//$propPublicNotes = get_object_vars($PublicNotes);

$propPublicNotes = $PublicNotes;

$propPublicNotes = json_encode($propPublicNotes);










