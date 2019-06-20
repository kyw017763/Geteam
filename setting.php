<?php
header('Content-Type: text/html; charset=UTF-8');

if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 

extract($_POST);
extract($_GET);
extract($_SERVER);
extract($_FILES);
extract($_ENV);
extract($_COOKIE);
extract($_SESSION);

/*
 $signin_email = $_POST['signin_email'];
 $signin_pwd = $_POST['signin_pwd'];
 $search = $_POST['search'];
 $userid = $_POST['userid'];
 $username = $_POST['username'];
 */
?>