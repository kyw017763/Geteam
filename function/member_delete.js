<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

mysqli_query($conn,"DELETE FROM member WHERE id='".$_SESSION['userid']."'"); 

$secession_date = date("Y-m-d");
mysqli_query($conn,"INSERT INTO secession (secession_id, secession_name, secession_date) VALUES('$userid', '$username', '$secession_date')"); 

echo 
"<script>
    alert('$username 님의 탈퇴가 완료되었습니다.');
</script>";

session_destroy();

echo 
"<script>
    history.back();
</script>";

mysqli_close($conn);
?>