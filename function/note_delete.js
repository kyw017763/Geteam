<?php
    header('Content-Type: text/html; charset=UTF-8');
    session_start();
    include "auth.php";
    include "dbconn.php";
    include "setting.php";

    if($kind == "recv"){
        $result_note_delete = mysqli_query($conn, "DELETE FROM recv_note WHERE idx=$idx");
    } else {
        $result_note_delete = mysqli_query($conn, "DELETE FROM send_note WHERE idx=$idx");
    }

    echo "
    <script>
    alert('쪽지가 삭제되었습니다');
    </script>
    ";

    if($kind = "recv"){
        echo "location.href = 'note_recv.php'";
    } else {
        echo "location.href = 'note_send.php'";
    }

mysqli_close($conn);
?>