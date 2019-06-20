<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";
?>

<?php
if($kind=="develop"){
    $sql_delete = "DELETE FROM study_develop WHERE num=$num";
} else if($kind=="design"){
    $sql_delete = "DELETE FROM study_design WHERE num=$num";
} else if($kind=="etc"){
    $sql_delete = "DELETE FROM study_etc WHERE num=$num";
}
mysqli_query($conn, $sql_delete);

$list_sql = "SELECT * FROM member WHERE id='$userid'";
$list_result = mysqli_query($conn, $list_sql);
$list_row = mysqli_fetch_array($list_result);
$list_num = $list_row[list_num];
$list_num = $list_num - 1;
$list_sql = "UPDATE member SET list_num='$list_num' WHERE id='$userid'";
mysqli_query($conn, $list_sql);

mysqli_close($conn);

echo "
<script>
    window.alert('스터디 게시글이 삭제되었습니다!');
</script>
"; 

echo "
    <script>
    location.href = 'study_list.php?num=$num&page=$page&kind=$kind';
    </script>
";

?>