<?php

include "setting.php";

if(!$userid){
    echo ("
    <script>
        window.alert('로그인 후 이용해주세요!');
        location.href = 'index.php';
    </script>
    ");
    exit;
}

?>