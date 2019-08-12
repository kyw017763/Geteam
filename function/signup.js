    $secession_sql = "SELECT * FROM secession WHERE secession_id='$signup_email' AND date(secession_date) >= date(subdate(now(), INTERVAL 30 DAY)) and date(secession_date) <= date(now())";
    $result_secession = mysqli_query($conn, $secession_sql);
    $secession_row = mysqli_fetch_array($result_secession);

   else if($secession_row) {
        echo "
        <script>
        alert('탈퇴한지 30일이 지나지 않은 이메일은 재가입이 불가능합니다');
        location.href='index.php'
        </script>
        ";
        exit;
    }