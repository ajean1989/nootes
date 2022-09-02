<?php 

declare(strict_types=1);

// Pour le contrôle de l'ancien password
$usersQuery = 'SELECT password FROM user WHERE mail = \'' .  $_SESSION['mail'] . '\'';
$password = Db::fetch($usersQuery, 'User');




$NewPassword = new CRUDUser;
$NewPassword->modifyPassword();

