<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

mysqli_query($conn,"UPDATE member SET name='$name', s_num='$s_num', interest1='$interest1', interest2='$interest2', interest3='$interest3', profile='$profile' WHERE id='$userid'");


echo 
"
<script>
    alert('정보가 변경되었습니다!');
    history.back();
</script>
";
mysqli_close($conn);
?>