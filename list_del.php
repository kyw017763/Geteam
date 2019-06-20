<?php
    header('Content-Type: text/html; charset=UTF-8');
    session_start();
    include "dbconn.php";
    include "setting.php";

   if($gb=='1'){
    for($i=0; $i<sizeof($mnum);$i++){
        if($mnum[$i]){
            mysqli_query($conn, "DELETE FROM `study_develop` WHERE `study_develop`.`num` = $mnum[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }

    else if($gb2=='1'){
    for($i=0; $i<sizeof($mnum2);$i++){
        if($mnum2[$i]){
            mysqli_query($conn, "DELETE FROM `study_design` WHERE `study_design`.`num` = $mnum2[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }

    else if($gb3=='1'){
    for($i=0; $i<sizeof($mnum3);$i++){
        if($mnum3[$i]){
            mysqli_query($conn, "DELETE FROM `study_etc` WHERE `study_etc`.`num` = $mnum3[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }
    else if($gb4=='1'){
    for($i=0; $i<sizeof($mnum4);$i++){
        if($mnum4[$i]){
            mysqli_query($conn, "DELETE FROM `contest_develop` WHERE `contest_develop`.`num` = $mnum4[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }

    else if($gb5=='1'){
    for($i=0; $i<sizeof($mnum5);$i++){
        if($mnum5[$i]){
            mysqli_query($conn, "DELETE FROM `contest_design` WHERE `contest_design`.`num` = $mnum5[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }

    else if($gb6=='1'){
    for($i=0; $i<sizeof($mnum6);$i++){
        if($mnum6[$i]){
            mysqli_query($conn, "DELETE FROM `contest_etc` WHERE `contest_etc`.`num` = $mnum6[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }

    else if($gb7=='1'){
    for($i=0; $i<sizeof($mnum7);$i++){
        if($mnum7[$i]){
            mysqli_query($conn, "DELETE FROM `contest_idea` WHERE `contest_idea`.`num` = $mnum7[$i];");
            echo "<meta http-equiv='Refresh' content='0; url=mypage.php'>";
        }
    }
   }
   $conn->close();
?>