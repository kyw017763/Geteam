<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "auth_view.php";
include "dbconn.php";
include "setting.php";

if($kind=="develop"){
    $view_sql = "SELECT * FROM `contest_develop` WHERE num='$num' AND end_day >= curdate( )"; 
} else if($kind=="design"){
    $view_sql = "SELECT * FROM `contest_design` WHERE num='$num' AND end_day >= curdate( )"; 
} else if($kind=="etc"){
    $view_sql = "SELECT * FROM `contest_etc` WHERE num='$num' AND end_day >= curdate( )"; 
} else if($kind=="idea"){
    $view_sql = "SELECT * FROM `contest_idea` WHERE num='$num' AND  AND end_day >= curdate( )"; 
}

$result_view_auth = mysqli_query($conn, $view_sql);
$line = mysqli_num_rows($result_view_auth);

if(!$line) {
    echo ("
    <script>
        window.alert('접근할 수 없는 글입니다!');
        location.href = 'index.php';
    </script>
    ");
    exit;
}
?>

<?php     
    if($kind=="develop"){
        $v_sql = mysqli_query($conn, "SELECT * FROM contest_develop where num = $num");
    } else if($kind=="design"){
        $v_sql = mysqli_query($conn, "SELECT * FROM contest_design where num = $num");
    } else if($kind=="etc"){
        $v_sql = mysqli_query($conn, "SELECT * FROM contest_etc where num = $num");
    } else if($kind=="idea"){
        $v_sql = mysqli_query($conn, "SELECT * FROM contest_idea where num = $num");
    }

    $row = mysqli_fetch_array($v_sql);

    $item_num = $row[num];
    $item_id = $row[id];
    $item_name = $row[name];
    $item_part = $row[part];
    $item_topic = str_replace(" ", "&nbsp;", $row[topic]);
    $item_title = $row[title];

    $item_content = $row[content];
    $item_content_ori = $item_content;

    $item_content = str_replace(" ", "&nbsp;", $item_content);
    $item_content = str_replace("\n", "<br>", $item_content);

    $item_want_num = $row[want_num];
    $item_apply_num = $row[apply_num];

    $item_start_day = $row[start_day];
    $item_start_day = substr($item_start_day, 0, 10);
    $item_end_day = $row[end_day];
    $item_end_day = substr($item_end_day, 0, 10);

    $item_hit = $row[hit] + 1;

    if($kind=="develop"){
        $hit_sql = mysqli_query($conn, "UPDATE contest_develop SET hit=$item_hit WHERE num=$num");
    } else if($kind=="design"){
        $hit_sql = mysqli_query($conn, "UPDATE contest_design SET hit=$item_hit WHERE num=$num");
    } else if($kind=="etc"){
        $hit_sql = mysqli_query($conn, "UPDATE contest_etc SET hit=$item_hit WHERE num=$num");
    } else if($kind=="idea"){
        $hit_sql = mysqli_query($conn, "UPDATE contest_idea SET hit=$item_hit WHERE num=$num");
    }

    mysqli_query($conn, $hit_sql);
    ?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    
    <!--Designerd by: http://bootstrapthemes.co-->
    <head>
        <meta charset="utf-8">
        <title><?php echo "즐팀 공모전 : $item_title"; ?></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href=""> <!-- 파비콘 추가 -->

        <link rel="stylesheet" href="assets/css/slick.css">
        <link rel="stylesheet" href="assets/css/slick-theme.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <link rel="stylesheet" href="assets/css/fonticons.css">
        <link rel="stylesheet" href="assets/css/font-awesome.min.css">

        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.css" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        
        <link rel="stylesheet" href="assets/css/magnific-popup.css">
        <link rel="stylesheet" href="assets/css/bootsnav.css">

        <!--For Plugins external css-->
        <!--<link rel="stylesheet" href="assets/css/plugins.css" />-->

        <!--Theme custom css -->
        <link rel="stylesheet" href="assets/css/style.css">
        <!--<link rel="stylesheet" href="assets/css/colors/maron.css">-->

        <!--Theme Responsive css-->
        <link rel="stylesheet" href="assets/css/responsive.css" />

        <script src="assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

        <script>
        function contest_modify_chk() {
        var p_set = document.frm_contest_modify;
        
        var double_result = document.getElementById("contest_modify_double_result");
        var topic_result = document.getElementById("contest_modify_topic_result");
        var title_result = document.getElementById("contest_modify_title_result");

        if(p_set.modify_want_num.value=="") {
            double_result.innerHTML = "값을 입력해주세요";
            p_set.modify_want_num.focus();
        } else if(p_set.modify_topic.value=="") {
            double_result.innerHTML = "";
            topic_result.innerHTML = "주제를 입력해주세요";
            p_set.modify_topic.focus();
        } else if(p_set.modify_title.value=="") {
            topic_result.innerHTML = "";
            title_result.innerHTML = "제목을 입력해주세요";
            p_set.modify_title.focus();
        } else {
            p_set.submit();
        }
    	}
        
        function lengCounter() {
			document.getElementById("counter").innerHTML=document.getElementById("textarea").value.length;
        }

        function text_lengCounter() {
			document.getElementById("text_counter").innerHTML=document.getElementById("text").value.length;
        }

        </script>

        
<style type="text/css">
            .article_f span {
                display: block;
                font-size: 20px;
            }
            .articlesub_f {
                clear: both;
                height: 3rem;
                border-style: double;
                border-color: #efdc05;
                border-width: 3px 0 3px 0;
                color: #efdc05;
                padding: 10px 25px;
                margin-bottom: 35px;
            }

            @media (max-width: 576px) {
                .articlesub_f {
                    padding: 3px 25px;
                }
            }

            .articlesub_s {
                padding-bottom: 35px;
                margin-bottom: 30px;
            }
            .articlesub_s span.topic {
                color: #efdc05;
                font-weight: 600;
                font-size: 25px;
            }
            .articlesub_s span.title {
                color: black;
                font-weight: 600;
                font-size: 27px;
            }
            .articlesub_s span.content {
                font-size: 20px;
                margin-top: 40px;
            }

            .articlesub_t {
                border-style: solid;
                border-color: #eee;
                border-width: 0 0 0 1.5px;
                color: black;
                padding: 10px 25px;
            }
            .articlesub_t span {
                display: block;
            }
            .articlesub_t span.title {
                color: black;
                font-weight: 600;
                font-size: 17px;
            }
            .articlesub_t span.content {
                color: black;
                font-size: 18px;
                margin-top: 10px;
                margin-bottom: 30px;
                text-align: center;
                letter-spacing: 2px;
            }

            .inner {
                margin-top: 50px;
                padding-bottom: 35px;
                margin-bottom: 30px;
            }
            .inner span {
                display: block;
            }
            .inner span.title {
                color: black;
                font-weight: 600;
                font-size: 22px;
            }
            .inner span.content {
                font-size: 20px;
                margin-top: 10px;
            }

            .article_container {
                padding-top: 30px;
                margin-bottom: 50px; 
                border-style: solid;
                border-color: #eee;
                border-width: 1.5px 0 0 0;
            }

            .nav_bottom {
                margin-top: 30px;
                font-size: 17px;
            }
        </style>

        <script>
            function confirm_a_d() {
                let a_set = document.frm_a_d;

                if(confirm("신청을 취소하시겠습니까?")) {
                    a_set.submit();
                } else {

                }
            }

            function confirm_c_d() {
                let c_set = document.frm_c_d;

                if(confirm("정말 삭제하시겠습니까?")) {
                    c_set.submit();
                } else {

                }
            }

            function not_d(){
                alert("이미 신청자가 있는 글이기에 삭제가 불가능합니다!");
            }
        </script>

    </head>

    <body data-spy="scroll" data-target=".navbar-collapse">
    
        <div class="culmn">
            <!--Home page style-->
        <?php include "header.php"; ?>

        <div class="container">
            <div class="row">
    
                <div class="main_featured m-top-100">
                    <!-- 버튼들 -->
                    <div class="col-sm-12 m-top-50">
                        
                        <div class="col-sm-3 col-xs-3">
                            <div class="buttons">
                                <a href="contest_list.php?kind=<?php echo $kind ?>">
                                <button onClick='not_alert()' class='btn btn-primary'>글목록</button>
                                </a>
                            </div>
                        </div>
                        
                        <?php 
                        if($userid==$item_id){
                        ?>

                        <div class="col-sm-2 col-xs-3 col-xs-offset-1">
                            <div class="buttons">
                                <button class='btn btn-change' data-toggle="modal" data-target="#modal_contest_modify">수정</button>
                            </div>
                        </div>

                        <?php
                        if($kind=="develop"){
                            $d_sql = "SELECT * FROM apply_contest_develop WHERE num_recv = $num";
                        } else if($kind=="design"){
                            $d_sql = "SELECT * FROM apply_contest_design WHERE num_recv = $num";
                        } else if($kind=="etc"){
                            $d_sql = "SELECT * FROM apply_contest_etc WHERE num_recv = $num";
                        } else if($kind=="idea"){
                            $d_sql = "SELECT * FROM apply_contest_idea WHERE num_recv = $num";
                        }
                        $d_result = mysqli_query($conn, $d_sql);
                        $d = mysqli_num_rows($d_result);
                        
                        if($d) {
                        ?>
                            <div class="col-sm-2 col-xs-3">
                                <div class="buttons">
                                    <button type="button" onClick="not_d()" class='btn btn-change'>삭제</button>
                                </div>
                            </div>
                        <?php
                        } else {
                        ?>
                            <div class="col-sm-2 col-xs-3">
                                <div class="buttons">
                                    <form name="frm_c_d" action="contest_delete_process.php?num=<?=$item_num?>&page=<?=$page?>&kind=<?=$kind?>" method="post">
                                        <button type="button" onClick="confirm_c_d()" class='btn btn-change'>삭제</button>
                                    </form>
                                </div>
                            </div>
                        <?php 
                        }
                        ?>


                        <?php
                        } 
                        ?>
                    </div>
                </div>

                <?php 
                    $timenow = date("Y-m-d");
                    $diff_date = (strtotime($item_end_day) - strtotime($timenow)) / 86400;
                ?>

                <article class="col-sm-12  m-top-50 article_container">
                    <div class="col-sm-9 article_f">
                        <div class="col-sm-12 articlesub_f">
                            <span style="float: left;">
                                No. <?php echo $item_num ?>
                            </span>

                            <span style="float: right;">
                                <i class="fa fa-eye"></i>&nbsp;&nbsp;&nbsp;<?php echo $item_hit ?>
                            </span>
                        </div>
                        <div class="col-sm-12 articlesub_s">

                        <span class="title">
                            <a href="<?php echo $item_topic?>" target="_blank">
                                <?php echo $item_title ?>
                                <?php
                                echo "
                                <span class='badge' style='border-radius: 45%; display: inline; padding: 3px 10px; background: #efdc05; color: white; margin: auto 10px;'>D - $diff_date</span>";
                                ?>
                            </a>
                        </span>
                        
                        <div class="inner">
                            <span class="title">
                                파트 분담
                            </span>
                            <span class="content">
                                <?php echo $item_part ?>
                            </span>
                        </div>

                        <span class="content">
                            <?php echo $item_content ?>
                        </span>
                        </div>

                    </div>
                    
                    <div class="col-sm-3 col-xs-7 articlesub_t">
                        <span class="title" style="font-size: 18px; text-align: left; margin: 20px 0 40px 0;">
                            <?php echo $item_id ?>
                            <br>
                            (<?php echo $item_name ?>)
                        </span>

                        <span class="title">신청 현황</span>
                        <span class="content">
                        <?php echo "$item_apply_num / $item_want_num" ?>
                        </span>

                        <span class="title">신청 기간</span>
                        <span class="content" style="line-height: 0.9;">
                        <?php echo "$item_start_day <br> ~ <br> $item_end_day" ?>
                        </span>


                        <?php
                        if($kind=="develop"){
                            $list_sql = mysqli_query($conn, "SELECT * FROM apply_contest_develop WHERE num_recv='$item_num' AND id_apply='$userid'");
                        } else if($kind=="design"){
                            $list_sql = mysqli_query($conn, "SELECT * FROM apply_contest_design WHERE num_recv='$item_num' AND id_apply='$userid'");
                        } else if($kind=="etc"){
                            $list_sql = mysqli_query($conn, "SELECT * FROM apply_contest_etc WHERE num_recv='$item_num' AND id_apply='$userid'");
                        }  else if($kind=="idea"){
                            $list_sql = mysqli_query($conn, "SELECT * FROM apply_contest_idea WHERE num_recv='$item_num' AND id_apply='$userid'");
                        }
                        $list_row = mysqli_fetch_array($list_sql);

                        if($userid!=$item_id){
                            if($list_row){
                            ?>
                            <div class="col-sm-12 col-xs-12">
                                <form name="frm_a_d" action="apply_delete_process.php?num=<?php echo $item_num ?>&page=<?php echo $page ?>&kind=<?php echo $kind ?>&big=<?php echo $big ?>" method="post">
                                    <button type="button" onClick="confirm_a_d()" class='btn btn-already'>이미 신청 완료되었습니다 :)</button>
                                </form>
                            </div>
                            <?php
                            } else {
                            ?>
                            <div class="col-sm-12 col-xs-12">
                                <button class='btn btn-change' data-toggle="modal" data-target="#modal_study_apply">신청하기</button>
                            </div>
                            <?php
                            }
                        }
                        ?>
                        
                    </div>

                    <div class="col-sm-9 nav_bottom">
                        <?php
                            // 단순히 한단계 위 아래로 움직여서는 안된다. 그 글이 삭제되고 두단계 건너뛴 곳에 신청기간이 멀쩡한 글이 있을 수도 있기 때문에!
                            if($kind=="develop"){
                                $b_sql = "SELECT num, title FROM contest_develop WHERE num < $item_num AND end_day >= curdate( ) LIMIT 1";
                                $a_sql = "SELECT num, title FROM contest_develop WHERE num > $item_num AND end_day >= curdate( ) LIMIT 1";
                            } else if($kind=="design"){
                                $b_sql = "SELECT num, title FROM contest_design WHERE num < $item_num AND end_day >= curdate( ) LIMIT 1";
                                $a_sql = "SELECT num, title FROM contest_design WHERE num > $item_num AND end_day >= curdate( ) LIMIT 1";
                            } else if($kind=="etc"){
                                $b_sql = "SELECT num, title FROM contest_etc WHERE num < $item_num AND end_day >= curdate( ) LIMIT 1";
                                $a_sql = "SELECT num, title FROM contest_etc WHERE num > $item_num AND end_day >= curdate( ) LIMIT 1";
                            } else if($kind=="idea"){
                                $b_sql = "SELECT num, title FROM contest_idea WHERE num < $item_num AND end_day >= curdate( ) LIMIT 1";
                                $a_sql = "SELECT num, title FROM contest_idea WHERE num > $item_num AND end_day >= curdate( ) LIMIT 1";
                            }

                            $b = mysqli_query($conn, $b_sql);
                            $a = mysqli_query($conn, $a_sql);

                            $b_row = mysqli_fetch_array($b);
                            $a_row = mysqli_fetch_array($a);

                            $b_result_num = mysqli_num_rows($b);
                            $a_result_num = mysqli_num_rows($a);

                            $b_num = $b_row[0];
                            $a_num = $a_row[0];
                            
                            if($b_result_num){
                                echo "<a href='contest_view.php?num=$b_num&page=$page&kind=$kind'>";
                                echo "<span style='float: left;'><span>&laquo;</span> 이전 글
                                <span style='color: gray'>$b_title</span> 
                                </span>";
                                echo "</a>";
                            } else {
                                echo "<span style='float: left; cursor: no-drop;'><span>&laquo;</span> 이전 글</span>";
                            }

                            if($a_result_num){
                                echo "<a href='contest_view.php?num=$a_num&page=$page&kind=$kind'>";
                                echo "<span style='float: right;'>
                                <span style='color: gray;'>$a_title</span> 
                                다음 글 <span>&raquo;</span></span>";
                                echo "</a>";
                            } else {
                                echo "<span style='float: right; cursor: no-drop;'>다음 글 <span>&raquo;</span></span>";
                            }
                        ?>
                        </div>

                </article>
        </div>

        </div> <!-- row -->
        </div> <!-- container -->
            <?php include "footer.php"; ?>
        </div> <!-- culmn -->  

                               
        <!-- Insert Modal -->
        <div class="modal fade" id="modal_contest_modify" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                
            <!-- Modal content-->
                <div class="modal-content">

                <div class="modal-header">
                    <h6 class="modal-title" style="display: inline-block;">contest - Modify</h6>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div> <!-- modal header -->

                <div class="modal-body" style="padding: 50px;">
                        <form name="frm_contest_modify" class="form_write" method="post" action="contest_insert_process.php?num=<?php echo $num ?>&page=<?php echo $page ?>&kind=<?php echo $kind?>&mode=modify">
                            <label>
                                작성자
                            <input type="text" name="modify_author" value="<?php echo "$cookie_id" ?> (<?php echo "$username"?>)" readonly>
                            </label>
                            
                            <label class="short" class="short" style="display: inline-block;">
                        	필요 인원
                            <input type="number" name="modify_want_num" value="<?php echo $item_want_num ?>">
                            </label>
                            
                            <label class="short" style="display: inline-block; margin-left: 20px;">
                        	신청 마감일
                        	<input type="date" class="short" name="modify_end_day" value="<?php echo $item_end_day ?>">
                            </label>
                            
                            <span id="contest_write_double_result" class="fail"></span>
                            
                            <label>
                        	공모전 링크
                            <input type="text" name="modify_topic" value="<?php echo $item_topic ?>">
                            </label>
                            <span id="contest_modify_topic_result" class="fail"></span>

                            <label>
                                담당 파트 ex) 디자인 1, 기획 2
                            <input type="text" name="write_part">
                            </label>
                        
                            <div class="textarea_counter">
                            <label>
                            	공모전명
                            	<input type="text" id="text" name="modify_title" value="<?php echo $item_title ?>" maxlength="50" onkeyup="text_lengCounter()">
                                <span id="ex_counter" class="counter">( <span id="text_counter" class="counter"></span> / 50 )</span>
                                
                                </label>
                                <span id="contest_modify_title_result" class="fail"></span>
                            </div>
                            
                            <script src="https://cdn.ckeditor.com/ckeditor5/12.2.0/classic/ckeditor.js"></script>
                            <label>
                            공모전 소개 : 첨부한 링크 내 정보 이외의 설명을 자유롭게 적어주세요!
                            <textarea name="write_content" id="editor"><?php echo $item_content ?></textarea>
                            </label>
                            <script>
                                ClassicEditor
                                    .create( document.querySelector( '#editor' ) )
                                    .catch( error => {
                                        console.error( error );
                                    } );
                            </script>

                </div> <!-- modal body -->

                <div class="modal-footer">
                    <div class="col-sm-3 col-sm-offset-9">
                        <button type="button" onClick="contest_modify_chk()" class="form-control btn btn-primary">저장</button>
                    </form>
                    </div>
                </div> <!-- modal footer -->

            </div> <!-- modal content -->

            </div> <!-- modal-dialog -->
        </div> <!-- modal -->

        <!-- Apply Modal -->
        <div class="modal fade" id="modal_contest_apply" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                
            <!-- Modal content-->
                <div class="modal-content">

                <div class="modal-header">
                    <h6 class="modal-title" style="display: inline-block;">Contest - Apply</h6>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div> <!-- modal header -->

                <div class="modal-body" style="padding: 50px;">
                        <form name="frm_contest_apply" class="form_write" method="post" action="apply_insert_process.php?num=<?php echo $num ?>&page=<?php echo $page ?>&kind=<?php echo $kind?>&big=<?php echo $big?>">
                            
                            <input type="hidden" name="num_recv" value="<?php echo $item_num ?>">
                            <input type="hidden" name="id_apply" value="<?php echo $userid ?>">
                            <input type="hidden" name="id_recv" value="<?php echo $item_id ?>">
                            <input type="hidden" name="name_apply" value="<?php echo $username ?>">
                            <input type="hidden" name="name_recv" value="<?php echo $item_name ?>">
                            <input type="hidden" name="topic" value="<?php echo $item_topic ?>">
                            <input type="hidden" name="title" value="<?php echo $item_title ?>">

                            <label>
                            Starter
                            <input type="text" value="<?php echo "$item_id" ?> (<?php echo "$item_name"?>)" readonly disabled>
                            </label>

                            <label>
                            신청자
                            <input type="text" value="<?php echo "$userid" ?> (<?php echo "$username"?>)" readonly disabled>
                            </label>

                            <label class="short" style="display: inline-block;">
                        	신청종료일
                            <input type="date" value="<?php echo $item_end_day ?>" readonly disabled>
                            </label>
                            
                            <label class="short" style="display: inline-block; margin-left: 20px;">
                        	신청일
                            <input type="date" name="day" value="<?php $regist_day = date("Y-m-d"); echo $regist_day ?>" readonly disabled>
                            </label>
                            
                            <label>
                        	신청글
                        	<input type="text" value="<?php echo "[$item_topic] $item_title" ?>" readonly disabled>
                            </label>

                            <div>
                                <label>
                                    희망 담당 파트
                                <textarea name="part" placeholder="100자 이하로 입력해주세요" maxlength="300" class="signup_profile"></textarea>
                                </label>
                            </div>
                            
                            <div>
                                <label>
                                    짧은 포트폴리오
                                <textarea name="portfolio" placeholder="300자 이하로 입력해주세요" maxlength="300" class="signup_profile"></textarea>
                                </label>
                            </div>
                            
                            <div>
                                <label>
                                    스터디에 바라는 점 
                                <textarea name="want" placeholder="500자 이하로 입력해주세요" maxlength="500" class="signup_profile" ></textarea>
                                </label>
                            </div>

                </div> <!-- modal body -->

                <div class="modal-footer">
                    <div class="col-sm-3 col-sm-offset-9">
                        <input type="submit" value="신청하기" class="form-control btn btn-primary"></button>
                    </form>
                    </div>
                </div> <!-- modal footer -->

            </div> <!-- modal content -->

            </div> <!-- modal-dialog -->
        </div> <!-- modal -->

        <!-- JS includes -->
        <script src="assets/js/vendor/jquery-1.11.2.min.js"></script>
        <script src="assets/js/vendor/bootstrap.min.js"></script>

        <script src="assets/js/jquery.magnific-popup.js"></script>
        <script src="assets/js/jquery.easing.1.3.js"></script>
        <script src="assets/js/slick.min.js"></script>
        <script src="assets/js/jquery.collapse.js"></script>
        <script src="assets/js/bootsnav.js"></script>

        <script src="assets/js/plugins.js"></script>
        <script src="assets/js/main.js"></script>
    </body>
</html>