<?php

session_destroy();
$status['connexion'] = 0;
$status = json_encode($status);
echo $status;

