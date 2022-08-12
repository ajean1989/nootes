<?php

declare(strict_types=1);


Class Test
{


    public static function var_dump($test)
    {
        echo '<pre>';
        var_dump($test);
        echo '</pre>';
        exit;
    }

}