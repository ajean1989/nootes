<?php

ob_start(); 

if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    $mail = $_SESSION['mail'];
}
else{
    $username;
    $mail;
}

echo '
<dialog id="dialog__profil">
    <p>username : '. $_SESSION['username'] . '</p>
    <p>e-mail : '. $_SESSION['mail'] . '</p>
    <form id="form--modifyPass">
        <label for="password">Mot de passe</label> : <input type="password" name="password" id="password">
        <label for="newPassword">Nouveau mot de passe</label> : <input type="password" name="newPassword" id="newPassword">
        <label for="newPasswordR">répéter le nouveau mot de passe</label> : <input type="password" name="newPasswordR" id="newPasswordR">
        <button type="submit" id="btn--modify_Password">Modifer le mot de passe</button>
        <button type="button" id="btn--delete_account">Supprimer le compte</button>
        <button type="button" id="btn--close_modal">Fermer cette fenêtre</button>
    </form>
</dialog>
    ';




$info = isset($_SESSION['info']) ? ($_SESSION['info']) : '';

echo '
<dialog id="dialog__info">
    <p>
    '. $info . '
    </p>
    <button type="button" id="btn--close_infomodal">Fermer</button>
</dialog>';





$content = ob_get_clean();


require_once $layoutsDirectory . 'html.php';  