<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

$regist_day = date("Y-m-d");
$chk_num=0;

if(!isset($write_send)) {
    $write_send = "[fromFooter]";
    $chk_num=1;
}


$sql_send = mysqli_query($conn, "INSERT INTO note_send VALUES(null, '$write_recv', '$write_send', '$write_content', '$regist_day')");
$sql_recv = mysqli_query($conn, "INSERT INTO note_recv VALUES(null, '$write_recv', '$write_send', '$write_content', $chk_num, '$regist_day')");

echo "
<script>
alert('쪽지가 전송되었습니다');
location.href = 'note_send.php';
</script>
";

mysqli_close($conn);
?>