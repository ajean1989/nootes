<?php

declare(strict_types=1);



Class Db
{


   public static object $pdo;



    public static function connexion()
    {
        try
            {
              
            self::$pdo = new PDO('mysql:host=localhost;dbname=nootes;charset=utf8;port=3306',
                    'adrien',
                    'adr13NjMy',
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                    )   ;
              /*

             
            self::$pdo = new PDO('mysql:host=sojacqomysql.mysql.db;port=3306;dbname=sojacqomysql;charset=utf8',
            'sojacqomysql',
            'adr13NjMy',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            )   ;
        
*/

            }
        catch (Exception $e)
            {
            die('Erreur : ' . $e->getMessage());
            }

    }


    public static function fetch($myQuery, $className) // : string*3
    {
        self::connexion();

        $query = $myQuery ;
        $statement = self::$pdo->prepare($query);
        $statement->setFetchMode(PDO::FETCH_CLASS, $className);
        $statement->execute();
        $instancesToCatch = $statement->fetch(PDO::FETCH_CLASS);

        return $instancesToCatch;
    }




    public static function fetchall($myQuery, $className) // : string*3
    {

        self::connexion();

        $query = $myQuery;
        $statement = self::$pdo->prepare($query);
        $statement->execute();
        $arrayToCatch = $statement->fetchall(PDO::FETCH_CLASS, $className);

        return $arrayToCatch;

    }

}