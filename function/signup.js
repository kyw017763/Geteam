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