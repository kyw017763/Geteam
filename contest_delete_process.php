<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";
?>

<?php
if($kind=="develop"){
    $sql_delete = mysqli_query($conn, "DELETE FROM contest_develop WHERE num=$num");
} else if($kind=="design"){
    $sql_delete = mysqli_query($conn, "DELETE FROM contest_design WHERE num=$num");
} else if($kind=="etc"){
    $sql_delete = mysqli_query($conn, "DELETE FROM contest_etc WHERE num=$num");
} else if($kind=="idea"){
    $sql_delete = mysqli_query($conn, "DELETE FROM contest_idea WHERE num=$num");
}

$list_sql = mysqli_query($conn, "SELECT * FROM member WHERE id='$userid'");
$list_row = mysqli_fetch_array($list_sql);
$list_num = $list_row[list_num];
$list_num = $list_num - 1;

$list_sql = mysqli_query($conn, "UPDATE member SET list_num='$list_num' WHERE id='$userid'");

mysqli_close($conn);

echo "
<script>
    window.alert('공모전 게시글이 삭제되었습니다!');
</script>
"; 

echo "
<script>
location.href = 'contest_list.php?num=$num&page=$page&kind=$kind';
</script>
";

?>