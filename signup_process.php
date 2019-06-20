<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "dbconn.php";
include "setting.php";

    $sql = "SELECT * FROM member WHERE id='$signup_email'";
    $result_signup_chk = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result_signup_chk);

    $secession_sql = "SELECT * FROM secession WHERE secession_id='$signup_email' AND date(secession_date) >= date(subdate(now(), INTERVAL 30 DAY)) and date(secession_date) <= date(now())";
    $result_secession = mysqli_query($conn, $secession_sql);
    $secession_row = mysqli_fetch_array($result_secession);

    if(!(preg_match("/[A-Za-z0-9]{8}@e-mirim.hs.kr/", $signup_email))) {
        echo "
        <script>
        alert('학교 이메일 형식은 @e-mirim.hs.kr 입니다');
        location.href='signup.php'
        </script>
        ";
        exit;
    } else if(!(preg_match("/(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/", $signup_pwd))) {
        echo "
        <script>
        alert('비밀번호 형식이 틀립니다');
        location.href='signup.php'
        </script>
        ";
        exit;
    }else if($row) {
        echo "
        <script>
        alert('해당 이메일을 가진 회원이 이미 가입되어있습니다');
        location.href='signup.php'
        </script>
        ";
        exit;
    }else if($secession_row) {
        echo "
        <script>
        alert('탈퇴한지 30일이 지나지 않은 이메일은 재가입이 불가능합니다');
        location.href='index.php'
        </script>
        ";
        exit;
    }

    //위의 if문에서 안걸리면 INSERT
    $sql_signup = mysqli_query($conn, "INSERT INTO `member` (id, name, pwd, s_num, interest1, interest2, interest3, profile, list_num) VALUES('$signup_email', '$signup_name', '$signup_pwd', '$signup_num', '$signup_inter1', '$signup_inter2', '$signup_inter3', '$signup_profile', 0)");
    if(!$sql_signup){ echo "
    <script>
    alert('회원가입에 실패했습니다');
    location.href='signup.php'
    </script>
    ";
    echo exit;
    } else {
    $add_result = mysqli_query($conn, "SELECT c_member FROM counting");
    $add_row = mysqli_fetch_array($add_result);
    $add_num = $add_row[0];
    $add_num = $add_num + 1;

    $add_sql = "UPDATE counting SET c_member='$add_num'";
    mysqli_query($conn, $add_sql);    
        
    echo "
    <script>
    location.href='signin.php'
    </script>
    ";
    }

mysqli_close($conn);

?>
