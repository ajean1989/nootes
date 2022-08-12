<?php

declare(strict_types=1);

Db::Connexion();

$query = 'SELECT user.user_id, user.username, note.note_id, note.note_name, note.share FROM user INNER JOIN note ON user.user_id = note.user_id WHERE note.share = 1';

//Voir si on peut suppr note.share dans $query

$PublicNotes = Db::fetchall($query, 'Content');

//$propPublicNotes = get_object_vars($PublicNotes);

$propPublicNotes = $PublicNotes;

$propPublicNotes = json_encode($propPublicNotes);










