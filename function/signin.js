<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "dbconn.php";
include "setting.php";

/*
echo "<pre>";
echo "SELECT * FROM member WHERE id='$signin_email' AND pwd='$signin_pwd'";
print_r($_POST);

echo "</pre>";
exit();
*/

$result_signin = mysqli_query($conn, "SELECT * FROM member WHERE id='$signin_email' AND pwd='$signin_pwd'");
$row = mysqli_fetch_array($result_signin);

/*echo "<pre>";
echo "SELECT * FROM member WHERE id='$signin_email' AND pwd='$signin_pwd'";
print_r($_SESSION);

echo "</pre>";
exit();*/

if($row) {
    if($id_ck == "yes") {
        setcookie("cookie_id", $signin_email);
    }
    $_SESSION['userid'] = $signin_email;
    $_SESSION['username'] = $row['name'];

    echo "
    <script>
        location.href = 'index.php';
    </script>
    ";
} else {
    echo "
    <script>
        location.href='signin.php?fail=o'
    </script>
    ";
}

mysqli_close($conn);
?>
