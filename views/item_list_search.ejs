<!-- 검색 후의 목록 또는 검색 전의 목록의 데이터 DB에서 가져옴-->
<?php

    if($mode=="search"){
        
        trim($search);
        
        if(!$search){
            echo("
                <script>
                window.alert('검색하실 단어를 입력해주세요');
                history.go(-1);
                </script>
            ");
        } else if(mb_strlen($search)<=1){
            echo("
                <script>
                window.alert('2글자 이상의 단어를 입력해주세요');
                history.go(-1);
                </script>
            ");
        }

        if($kind=="develop"){
            $sql = "SELECT * FROM study_develop WHERE $search_list LIKE '%$search%' ORDER BY num DESC";
        } else if($kind=="design"){
            $sql = "SELECT * FROM study_design WHERE $search_list LIKE '%$search%' ORDER BY num DESC";
        } else if($kind=="etc"){
            $sql = "SELECT * FROM study_etc WHERE $search_list LIKE '%$search%' ORDER BY num DESC";
        }

    } else {
        if($kind=="develop"){
            $sql = "SELECT * FROM study_develop ORDER BY ";
        } else if($kind=="design"){
            $sql = "SELECT * FROM study_design ORDER BY ";
        } else if($kind=="etc"){
            $sql = "SELECT * FROM study_etc ORDER BY ";
        }
        
        if($range=="author"){
            $sql.="id, num DESC";
        } else if($range=="topic") {
            $sql.="topic, num DESC";
        } else {
            $sql.="num, id DESC";
        }
    }
    
    $scale = 10;
    
    $result_list = mysqli_query($conn, $sql);
    $total_record = mysqli_num_rows($result_list); //전체 글 수

    if($total_record % $scale==0)
        $total_page = $total_record/$scale;
    else
        $total_page = floor($total_record/$scale)+1;
    
    if(!$page) $page = 1; 
    //페이지 번호($page)가 0일 때 페이지 번호를 1로 초기화
    
    //표시할 페이지($page)에 따라 $start 계산 => 각각의 페이지의 시작번호
    $start = ($page-1) * $scale;
    
    
    
?>