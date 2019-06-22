<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

$pw = $_POST['pw'];
$pw1 = $_POST['pw1'];
$pw2 = $_POST['pw2'];

$sql = mysqli_query($conn, "select * from member where id='$userid'");
$member = mysqli_fetch_array($sql);

if($pw = $member['pwd']){
	if($pw1 = $pw2){
	if(!(preg_match("/(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/", $pw1))) {
        echo "
        <script>
        alert('비밀번호 형식이 틀립니다');
        location.href='mypage.php'
        </script>
        ";
    }
}
}

mysqli_query($conn,"update member set pwd='".$pw1."' where id='".$_SESSION['userid']."'");

echo "
<script>
    alert('비밀번호가 변경되었습니다!');
    location.href='mypage.php'
</script>
";

    mysqli_close($conn);

?>