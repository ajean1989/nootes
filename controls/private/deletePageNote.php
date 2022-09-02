<?php

declare(strict_types=1);

require_once $modelsDirectory . DIRECTORY_SEPARATOR . 'private' . DIRECTORY_SEPARATOR . 'deletePageNote.php';

$response = true;

$response = json_encode($response);

echo $response;