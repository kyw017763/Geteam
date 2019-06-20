<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "dbconn.php";
include "setting.php";

$regist_day = date("Y-m-d");

$sql_send = mysqli_query($conn, "INSERT INTO note_send(recv_id, send_id, content, recv_chk, send_date) VALUES('$write_recv','$write_send', '$write_content', '0', '$regist_day')");
$sql_recv = mysqli_query($conn, "INSERT INTO note_recv(recv_id, send_id, content, send_date) VALUES('$write_recv','$write_send', '$write_content', '$regist_day')");

echo "
<script>
alert('쪽지가 전송되었습니다');
location.href = 'index.php';
</script>
";

mysqli_close($conn);
?>