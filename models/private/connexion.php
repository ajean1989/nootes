<?php

declare(strict_types=1);

$usersQuery = 'SELECT * FROM user';

$listUsers = Db::fetchall($usersQuery, 'User');