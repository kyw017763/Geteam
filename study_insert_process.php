<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";
?>

<?php
$regist_day = date("Y-m-d");
$str_regist_day = strtotime($regist_day);
$str_write_end_day = strtotime($write_end_day);
$str_modify_end_day = strtotime($modify_end_day);

/*
if($str_regist_day > $str_write_end_day) {
    echo "비교할 시간이 현재 시간보다 이전입니다.";
} elseif($str_regist_day > $str_write_end_day) {
    echo "비교할 시간이 현재시간과 같습니다.";
} else {
    echo "비교할 시간이 현재시간보다 작습니다.";
}
*/

if($write_end_day > $str_regist_day) {
    echo("
        <script>
        window.alert('신청 마감일은 오늘 이후여야 합니다!');
        location.href = 'study_list.php?num=$num&page=$page&kind=$kind';
        </script>
    ");
    exit;
}

if($modify_end_day > $str_regist_day) {
    echo("
        <script>
        window.alert('신청 마감일은 오늘 이후여야 합니다!');
        location.href = 'study_list.php?num=$num&page=$page&kind=$kind';
        </script>
    ");
    exit;
}

if($mode=="modify") {
    if($kind=="develop"){
        $modify_sql="UPDATE study_develop SET topic='$modify_topic', title='$modify_title', content='$modify_content', want_num='$modify_want_num', end_day='$modify_end_day' WHERE num='$num'";
    } else if($kind=="design"){
        $modify_sql="UPDATE study_design SET topic='$modify_topic', title='$modify_title', content='$modify_content', want_num='$modify_want_num', end_day='$modify_end_day' WHERE num='$num'";
    } else if($kind=="etc"){
        $modify_sql="UPDATE study_etc SET topic='$modify_topic', title='$modify_title', content='$modify_content', want_num='$modify_want_num', end_day='$modify_end_day' WHERE num='$num'";
    }

    mysqli_query($conn, $modify_sql);

} else {
    if($kind=="develop"){
        $insert_sql = "INSERT INTO study_develop (id, name, topic, title, content, want_num, apply_num, start_day, end_day, hit) ";
        $recent_num_sql = "SELECT num FROM study_develop ORDER BY num DESC LIMIT 1";
    } else if($kind=="design"){
        $insert_sql = "INSERT INTO study_design (id, name, topic, title, content, want_num, apply_num, start_day, end_day, hit) ";
        $recent_num_sql = "SELECT num FROM study_develop ORDER BY num DESC LIMIT 1";
    } else if($kind=="etc"){
        $insert_sql = "INSERT INTO study_etc (id, name, topic, title, content, want_num, apply_num, start_day, end_day, hit) ";
        $recent_num_sql = "SELECT num FROM study_develop ORDER BY num DESC LIMIT 1";
    }
    
    $insert_sql .= "VALUES('$userid', '$username', '$write_topic', '$write_title', '$write_content', '$write_want_num', 0, '$regist_day', '$write_end_day', 0)";
    mysqli_query($conn, $insert_sql);
    
    $list_result = mysqli_query($conn, "SELECT * FROM member WHERE id='$userid'");
    $list_row = mysqli_fetch_array($list_result);
    $list_num = $list_row['list_num'];
    $list_num = $list_num + 1;
    
    $list_sql = "UPDATE member SET list_num='$list_num' WHERE id='$userid'";
    mysqli_query($conn, $list_sql);

    // counting 테이블에서 +1
    $add_result = mysqli_query($conn, "SELECT c_list FROM counting"); // 원래 값 알아냄
    $add_row = mysqli_fetch_array($add_result); 
    $add_num = $add_row[0]; 
    $add_num = $add_num + 1; // 원래 값에서 +1

    $add_sql = "UPDATE counting SET c_list='$add_num'"; // +1된 값 UPDATE
    mysqli_query($conn, $add_sql);

    // study_~ 테이블에서 가장 마지막에 들어간 num 값을 알아옴
    $recent_num_row = mysqli_fetch_array(mysqli_query($conn, $recent_num_sql));
    $recent_num_result = $recent_num_row[0];
    // recent table에 insert
    $recent_insert_result = mysqli_query($conn, "INSERT INTO `recent`(`big`, `kind`, `list_num`) VALUES ('$big', '$kind', '$recent_num_result')");
    
    // recent table 레코드 개수 - 3개 아래면 삭제하지 않기 위함
    $result_all = mysqli_query($conn, "SELECT * FROM recent");
    $result_all_num = mysqli_num_rows($result_all);

    if($result_all_num > 3) { // 3개 이상이면 가장 오래된 거 하나는 삭제
        $recent_min_num =  mysqli_query($conn, "SELECT  num FROM recent ORDER BY num ASC LIMIT 1");
        $recent_min_num_result = mysqli_fetch_array($recent_min_num)[0];
        $recent_insert_result = mysqli_query($conn, "DELETE FROM `recent` WHERE num=$recent_min_num_result");
    }

}

mysqli_close($conn);

echo "
    <script>
    location.href = 'study_list.php?num=$num&page=$page&kind=$kind';
    </script>
";
?>