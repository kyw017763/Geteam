<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

// echo $big;
// echo $kind;
// echo $num;
// exit;
?>


<?php
    $regist_day = date("Y-m-d");

   if($big=="study"){
        if($kind=="develop"){
            $apply_sql = "DELETE FROM `apply_study_develop` WHERE num_recv=$num AND id_apply='$userid'";

            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE study_develop SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="design"){
            $apply_sql = "DELETE FROM `apply_study_design` WHERE num_recv=$num AND id_apply='$userid'";

            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE study_design SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="etc"){
            $apply_sql = "DELETE FROM `apply_study_etc` WHERE num_recv=$num AND id_apply='$userid'";
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE study_etc SET apply_num='$a_num' WHERE num='$num'";
        }  
   } 

   if($big=="contest"){
        if($kind=="develop"){
            $apply_sql = "DELETE FROM `apply_contest_develop` WHERE num_recv=$num AND id_apply='$userid'";
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE contest_develop SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="design"){
            $apply_sql = "DELETE FROM `apply_contest_design` WHERE num_recv=$num AND id_apply='$userid'";
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE contest_design SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="etc"){
            $apply_sql = "DELETE FROM `apply_contest_etc` WHERE num_recv=$num AND id_apply='$userid'";
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE contest_etc SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="idea"){
            $apply_sql = "DELETE FROM `apply_contest_idea` WHERE num_recv=$num AND id_apply='$userid'";
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] - 1;
            $apply_delete_sql = "UPDATE contest_idea SET apply_num='$a_num' WHERE num='$num'";
        }
   }

   mysqli_query($conn, $apply_sql);
   mysqli_query($conn, $apply_delete_sql);

   echo "
   <script>
        window.alert('신청이 취소되었습니다!');
    </script>
    "; 

   if($big=="study") {
        echo "
        <script>
        location.href = 'study_list.php?num=$num&page=$page&kind=$kind';
        </script>
        ";
    } else if($big=="contest"){
        echo "
        <script>
        location.href = 'contest_list.php?num=$num&page=$page&kind=$kind';
        </script>
        ";
    }
   
   ?>