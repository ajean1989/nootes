<?php

declare(strict_types=1);

// Pour la fonction userAlreadyInDb()

$usersQuery = 'SELECT username, mail FROM user';
$listUsers = Db::fetchall($usersQuery, 'User');

// Ajout en DB

$_SESSION['error'] = 'none';

$UsersInputs = new UsersInputs;
$UsersSafety = new UsersSafety;
$UsersControls = new UsersControls;
$AddUser = new CRUDUser;
$User = new User;


$User->addUser();

