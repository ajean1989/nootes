<?php

declare(strict_types=1);

Db::Connexion();

$query = 'SELECT note.note_id, note.note_name, note.share, page.page_id, page.page_name FROM user INNER JOIN note ON user.user_id = note.user_id INNER JOIN page ON note.note_id = page.note_id WHERE user.username = \'' . $_SESSION['username'] . '\'';

//Voir si on peut suppr note.share dans $query

$outsideContent = Db::fetchall($query, 'Content');

$outsideContent = json_encode($outsideContent);


