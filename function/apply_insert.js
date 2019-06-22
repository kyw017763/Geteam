<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";
?>

<?php
    $regist_day = date("Y-m-d");
    
   if($big=="study"){
        if($kind=="develop"){
            $apply_sql = "INSERT INTO `apply_study_develop`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
            
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM study_develop WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;

            $apply_add_sql = "UPDATE study_develop SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="design"){
            $apply_sql = "INSERT INTO `apply_study_design`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM study_design WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;

            $apply_add_sql = "UPDATE study_design SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="etc"){
            $apply_sql = "INSERT INTO `apply_study_etc`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM study_etc WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;

            $apply_add_sql = "UPDATE study_etc SET apply_num='$a_num' WHERE num='$num'";
        }  
        $apply_sql .= "
        VALUES ('$num_recv', '$id_apply', '$id_recv', '$name_apply', '$name_recv', '$topic', '$title', '$regist_day', '$portfolio', '$want', '0')
        ";
   } 

   if($big=="contest"){
        if($kind=="develop"){
            $apply_sql = "INSERT INTO `apply_contest_develop`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_develop WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;
            $apply_add_sql = "UPDATE contest_develop SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="design"){
            $apply_sql = "INSERT INTO `apply_contest_design`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_design WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;
            $apply_add_sql = "UPDATE contest_design SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="etc"){
            $apply_sql = "INSERT INTO `apply_contest_etc`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_etc WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;
            $apply_add_sql = "UPDATE contest_etc SET apply_num='$a_num' WHERE num='$num'";
        } else if($kind=="idea"){
            $apply_sql = "INSERT INTO `apply_contest_idea`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
        
            $result_apply_num = mysqli_query($conn, "SELECT apply_num FROM contest_idea WHERE num='$num'");
            $row = mysqli_fetch_array($result_apply_num);
            $a_num = $row[0] + 1;
            $apply_add_sql = "UPDATE contest_idea SET apply_num='$a_num' WHERE num='$num'";
        }
        $apply_sql .= "
        VALUES ('$num_recv', '$id_apply', '$id_recv', '$name_apply', '$name_recv', '$topic', '$title', '$regist_day', '$part', '$portfolio', '$want', '0')
        ";
   }

    mysqli_query($conn, $apply_sql);
    mysqli_query($conn, $apply_add_sql);

    $add_result = mysqli_query($conn, "SELECT c_apply FROM counting");
    $add_row = mysqli_fetch_array($add_result);
    $add_num = $add_row[0];
    $add_num = $add_num + 1;

    $add_sql = "UPDATE counting SET c_apply='$add_num'";
    mysqli_query($conn, $add_sql);   

    
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
