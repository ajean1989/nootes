<?php

declare(strict_types=1);

if(isset($_SESSION['username'])){
    $DeleteUser = new CRUDUser;

    $DeleteUser->deleteUser();

    unset($_SESSION['username']);
    unset($_SESSION['mail']);
    unset($_SESSION['admin']);
}

$response = true;
$response = json_encode($response);
echo $response;



