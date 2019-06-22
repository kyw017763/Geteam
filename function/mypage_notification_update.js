<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

// echo $chk1;
// echo $chk2;
// echo $chk3;
// exit;

mysqli_query($conn,"UPDATE member SET noti_ap='$chk1' WHERE id='$userid'");
mysqli_query($conn,"UPDATE member SET noti_recvap='$chk2' WHERE id='$userid'");
mysqli_query($conn,"UPDATE member SET noti_vol='$chk3' WHERE id='$userid'");

echo "
<script>
    alert('알림 설정이 변경되었습니다!');
    history.back();
</script>
";

?>