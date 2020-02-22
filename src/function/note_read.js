<?php
    header('Content-Type: text/html; charset=UTF-8');
    session_start();
    include "dbconn.php";
    include "setting.php";

mysqli_query($conn, "UPDATE note_recv SET recv_chk = 1 where idx = '$idx'");

echo "<meta http-equiv='refresh' content='0; url=note_recv.php'>";

   $conn->close();
?>