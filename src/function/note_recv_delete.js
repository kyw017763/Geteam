<?php
    header('Content-Type: text/html; charset=UTF-8');
    session_start();
    include "dbconn.php";
    include "setting.php";
   
   if($gb=='1'){
    for($i=0; $i<sizeof($mnum);$i++){
        if($mnum[$i]){
            // echo "hi";
            // echo $mnum[$i];
            // echo "DELETE FROM `note_recv` WHERE `note_recv`.`idx` = $mnum[$i];";
            //$query1 = mysql_query($conn, "DELETE FROM note_recv WHERE idx = $mnum;");
            mysqli_query($conn, "DELETE FROM `note_recv` WHERE `note_recv`.`idx` = $mnum[$i];");
            //$result1 = mysql_query($conn, $query1);
            //mysql_query('delete from note_recv where idx in ('.$mnum.')'); 
            echo "<meta http-equiv='Refresh' content='0; url=note_recv.php'>";
        }
    }
   }
   $conn->close();
?>