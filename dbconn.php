<?php 

$hostname = "localhost";
$username = "root";
$password = "autoset";
$dbname = "zteam";

$conn = mysqli_connect($hostname, $username, $password, $dbname);


if(!$conn){
	echo "MySQL 접속 에러 : ";
	echo mysqli_connect_error();
	exit();
} else {
}


mysqli_set_charset($conn, 'utf8');
?>
