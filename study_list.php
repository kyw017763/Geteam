<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

$big = 'study';
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    
    <!--Designerd by: http://bootstrapthemes.co-->
    <head>
        <meta charset="utf-8">
        <title>즐팀 : 스터디 목록</title>
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
    	function study_write_chk() {
    		var p_set = document.frm_study_write;
    		
    		var double_result = document.getElementById("study_write_double_result");
    		var topic_result = document.getElementById("study_write_topic_result");
    		var title_result = document.getElementById("study_write_title_result");

    		if(p_set.write_want_num.value=="") {
    			double_result.innerHTML = "값을 입력해주세요";
    			p_set.write_want_num.focus();
    		} else if(p_set.write_topic.value=="") {
    			double_result.innerHTML = "";
    			topic_result.innerHTML = "주제를 입력해주세요";
    			p_set.write_topic.focus();
    		} else if(p_set.write_title.value=="") {
    			topic_result.innerHTML = "";
    			title_result.innerHTML = "제목을 입력해주세요";
    			p_set.write_title.focus();
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

        function not_alert() {
			alert('스터디 글 최대 작성 수 3개를 초과하셨습니다!');
        }
    	</script>
    	
    </head>

    <body data-spy="scroll" data-target=".navbar-collapse">
    
        <div class="culmn">
            <!--Home page style-->

			<?php include "header.php"; ?>

			<?php include "searchStudyList.php"; ?>

            <div class="container">
                <div class="row">
                    <div class="col-sm-8 col-sm-offset-2">
                        <ul class="nav nav-pills nav-fill nav-justified m-top-100" style="margin-bottom: 50px;">
                            <li class="nav-item">
                                <a class="nav-link" href="study_list.php?kind=develop&big=study" target="_self" style="color: #efdc05; font-size: 1.1rem;">개발</a>           
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="study_list.php?kind=design&big=study" target="_self" style="color: #efdc05; font-size: 1.1rem;">디자인</a>    
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="study_list.php?kind=etc&big=study" target="_self" style="color: #efdc05; font-size: 1.1rem;">etc</a>              
                            </li>
                        </ul>
                    </div>
                
                <div class="separator_auto"></div>
                    
                <div class="col-sm-12">

                    <div class="page_title text-center">
                        <h2>
                        <?php 
                            if($kind=="develop"){
                                echo "개발 관련 스터디";
                            } else if($kind=="design"){
                                echo "디자인 관련 스터디";
                            } else if($kind=="etc"){
                                echo "기타 스터디 및 모임";
                            }
                        ?>
                        </h2>
                        
                        <div class="separator_auto"></div>
                        <div class="skill_bottom_item m-top-20">
                            <h6>총 게시글 수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="statistic-counter"><?php echo "$total_record"; ?></span></h6>
                        </div>
                        
                    </div>
                </div>
                        
                    
            	<div class="col-sm-10 col-sm-offset-1">
                    <div class="col-sm-10">
                    	<form method="post" action="study_list.php?mode=search&kind=<?php echo $kind; ?>">
                            <select name="search_list" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="width: 30%; display: inline-block;">
                            <option value="subject">제목</option>
                            <option value="content">내용</option>
                            <option value="name">작성자</option>
                            </select>
                            <input type="search" class="form-control form_fifty" placeholder="Search" name="search" style="display: inline-block; width: 50%;">
                            <button type="submit" class="btn_ btn-primary" style="padding: 1.2em 1.5em;"><i class="fa fa-search"></i></button>
                        </form>
                    </div>
                </div>
                        
                <!-- 글쓰기 버튼 -->
                <div class="col-sm-10 col-sm-offset-1 m-top-20">
                	<div class="col-sm-3">
                        <?php 
                        $result = mysqli_query($conn, "SELECT * FROM member WHERE id='$userid'");
                        $row = mysqli_fetch_array($result);
                        $user_list_num = $row['list_num'];
                        
                        if($user_list_num >= 3) {
                        ?>
                        	<button onClick='not_alert()' class="home_btns form-control btn btn-primary">글쓰기</button>
                        <?php 
                        } else {
                        ?>
                        	<button type='button' class="home_btns form-control btn btn-primary" data-toggle="modal" data-target="#modal_study_write">글쓰기</button>
                        <?php 
                        } 
                        ?>
                    </div>

                <!-- 정렬 선택 -->
                    <div class="col-sm-3">
                        <form method="post" action="study_list.php?mode=search&kind=<?php echo $kind; ?>">
                            <select onchange="location = this.value;" class="form-control" style="display: inline-block;">
                            <option value="study_list.php?kind=<?php echo $kind?>&range=num">글번호</option>
                            <option value="study_list.php?kind=<?php echo $kind?>&range=author">작성자</option>
                            <option value="study_list.php?kind=<?php echo $kind?>&range=topic">주제</option>
                            </select>
                        </form>
                    </div>
                </div>
            
			<!-- study목록 각 하나의 article -->
			<!--블럭 내에 보여 줄 데이터들 DB에서 가져온 값이 저장된 $row 변수에서 한 속성씩 빼냄-->
                <?php 
                    for($i = $start; $i < $start+$scale && $i < $total_record; $i++){
                        mysqli_data_seek($result_list, $i); //가져올 레코드로 위치(포인터) 이동
                        $row = mysqli_fetch_array($result_list); //하나의 레코드 가져오기
                        
                        $item_num = $row['num'];
                        $item_id = $row['id'];
                        $item_name = $row['name'];
                        $item_topic = $row['topic'];
                        $item_title = $row['title'];
                        $item_content = $row['content'];
                        $item_a_num = $row['apply_num'];
                        $item_w_num = $row['want_num'];
                        
                        $item_apply_s = $row['start_day'];
                        $item_apply_s = substr($item_apply_s, 0, 10);
                        
                        $item_apply_e = $row['end_day'];
                        $item_apply_e = substr($item_apply_e, 0, 10);
                        
                        $item_content = strip_tags($item_content);
                        
                        $item_hit = $row['hit'];

                        // CSS로 말줄임표 처리
                ?>

                <?php
                    $timenow = date("Y-m-d");
                    
                    $diff_date = (strtotime($item_apply_e) - strtotime($timenow)) / 86400;
                    
                    if($item_apply_e < $timenow) {
                        if(abs($diff_date) < 10) { // 신청 마감일과 현재 날짜가 10일 이상 차이나면 아예 안보임
                            if($diff_date < 0) {
                                $diff_date = $diff_date + abs($diff_date)*2;

                                echo "
                                <div class='col-sm-6 m-top-10'>
                                <div class='not_list'>
                                <span class='badge' style='padding-bottom: 5px; background: #efdc05; color: white; float:right'>D - +$diff_date</span>
                                <span>No.$item_num</span> <!-- 번호 -->
                                <span>작성자 | $item_id ($item_name) <!-- 작성자 -->
                                
                                <span class='title' style='margin-top: 15px;'>[$item_topic] $item_title</span> <!-- 주제, 제목 -->
                                
                                <span class='content' style='margin-bottom: 23px;'>$item_content</span>
                                
                                <span>신청 기간 | $item_apply_s ~ $item_apply_e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span style='float: left;'>
                                    신청현황 | $item_a_num / $item_w_num 
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    조회수 | $item_hit
                                </span> <!-- 신청수, 조회수 -->
                                ";
                            } else {
                                echo "
                                <div class='col-sm-6 m-top-10'>
                                    <div class='not_list'>
                                    <span class='badge' style='padding-bottom: 5px; background: #efdc05; color: white; float:right'>D - $diff_date</span>
                                    <span>No.$item_num</span> <!-- 번호 -->
                                    <span>작성자 | $item_id ($item_name) <!-- 작성자 -->
                                    
                                    <span class='title' style='margin-top: 15px;'>[$item_topic] $item_title</span> <!-- 주제, 제목 -->
                                    
                                    <span class='content' style='margin-bottom: 23px;'>$item_content</span>
                                    
                                    <span>신청 기간 | $item_apply_s ~ $item_apply_e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span style='float: left;'>
                                        신청현황 | $item_a_num / $item_w_num 
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        조회수 | $item_hit
                                    </span> <!-- 신청수, 조회수 -->
                                    ";
                            }

                                if($userid==$item_id){ //신청기간 지난 게시물의 삭제 버튼
                                ?>
                                    <a href="study_delete_process.php?num=<?php echo $item_num?>&page=<?php echo $page?>&kind=<?php echo $kind?>">
                                        <button type="button" class="btn btn-primary_delete" style="position: absolute; right: 40px; bottom: 20px; padding: 1em 1em; border-radius: 50%;">
                                        <i class='fa fa-trash text-primary'></i>
                                        </button>
                                    </a>
                                <?php
                                }
                                ?>

                            <?php
                            echo "    
                                </div>
                            </div>
                            ";
                        }
                } else {
                    echo "
                        <a href='study_view.php?num=$item_num&page=$page&kind=$kind&big=study' style='text-decoration: none;'>
                            <div class='col-sm-6 m-top-10'>
                                <div class='list'>
                                <span class='badge' style='padding-bottom: 5px; background: #efdc05; color: white; float:right'>D - $diff_date</span>
                                <span>No.$item_num</span> <!-- 번호 -->
                                <span>작성자 | $item_id ($item_name)</span> <!-- 작성자 -->
                                
                                <span class='title' style='margin-top: 15px;'>[$item_topic] $item_title</span> <!-- 주제, 제목 -->
                                
                                <span class='content' style='margin-bottom: 23px;'>$item_content</span>

                                <span>신청일 | $item_apply_s ~ $item_apply_e</span>
                                <span>
                                    신청현황 | $item_a_num / $item_w_num 
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    조회수 | $item_hit
                                </span> <!-- 신청수, 조회수 -->
                                </div>
                            </div>
                        </a>
            			";
                    }
                    } //for문
                ?>

            <div class="col-sm-4 col-sm-offset-4 text-center m-top-50">
            <!--페이지 번호 표시-->
            <nav aria-labesl="...">
            <div>
              <ul class="pagination pagination-lg">
                  	<?php 
                  	if($page-5 >= 1) {
                  	
                  	?>
                  	<li class="page-item">
                      <a class="page-link" href="study_list.php?page=<?php echo $page-5 ?>&kind=<?php echo $kind?>" style="background: rgb(247,247,247); color: #FF8489; border: 0;">&laquo;</a>
                    </li>
                    <?php
                  	} else {
                    ?>
                    <li class="page-item disabled">
                      <a class="page-link" href="#" style="background: rgb(247,247,247); color: #efdc05; border: 0;">&laquo;</a>
                    </li>
                    <?php 
                  	}
                    ?>
                    
                    <?php
                    for($i=1; $i<=$total_page; $i++){
                        if($page == $i) {
                     ?>
                     		<li class="page-item active">
                              <a class="page-link" href="#" style="background: rgb(247,247,247); color: #efdc05; border: 0;"><?php echo $i ?></a>
                            </li>
                     <?php 
                        } else {
                      ?>
                      		<li class="page-item disabled">
                              <a class="page-link" href="study_list.php?page=<?php echo $i ?>&kind=<?php echo $kind ?>" style="background: rgb(247,247,247); color: #ff6863; border: 0;"><?php echo $i ?></a>
                            </li>
                     <?php 
                        }
                    }
                    ?>
                    
                    <?php 
                  	if($page+5 <= $total_page) {
                  	?>
                  	<li class="page-item">
                      <a class="page-link" href="study_list.php?page=<?php echo $page+5 ?>" style="background: rgb(247,247,247); color: #ff6863; border: 0;">&raquo;</a>
                    </li>
                    <?php
                  	} else {
                    ?>
                    <li class="page-item disabled">
                      <a class="page-link" href="#" style="background: rgb(247,247,247); color: #efdc05; border: 0;">&raquo;</a>
                    </li>
                    <?php 
                  	}
                    ?>
                    
                      </ul>
                </div>
                </nav>
            </div>

		</div> <!-- row -->
	</div> <!-- container -->
        	<?php include "footer.php"; ?>
</div> <!-- culmn -->  

                                    
<!-- Insert Modal -->
<div class="modal fade" id="modal_study_write" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        
    <!-- Modal content-->
        <div class="modal-content">

        <div class="modal-header">
            <h6 class="modal-title" style="display: inline-block;">Study - Write</h6>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div> <!-- modal header -->
		
		<form name="frm_study_write" class="form_write" method="post" action="study_insert_process.php?num=<?php echo $num ?>&page=<?php echo $page ?>&kind=<?php echo $kind ?>&big=<?php echo $big ?>">
                
        <div class="modal-body" style="padding: 50px;">
                    <label>
                        작성자
                    <input type="text" class="form-control" name="write_author" value="<?php echo $userid ?> (<?php echo $username ?>)" readonly>
                    </label>
                    
                    <label class="short" style="display: inline-block;">
                        필요 인원
                    <input type="number" name="write_want_num">
                    </label>
                    
                    <label class="short" style="display: inline-block; margin-left: 20px;">
                        신청 마감일
                        <input type="date" class="short" name="write_end_day" value="<?php $regist_day = date("Y-m-d"); echo $regist_day ?>">
                    </label>
                    
                    <span id="study_write_double_result" class="fail"></span>
                    
                    <label>
                        스터디 주제
                    <input type="text" name="write_topic">
                    </label>
                    <span id="study_write_topic_result" class="fail"></span>
                    
                    <div class="textarea_counter">
                        <label>
                            스터디 제목
                            <input type="text" id="text" name="write_title" maxlength="50" onkeyup="text_lengCounter()">
                            <span id="ex_counter" class="counter">( <span id="text_counter" class="counter"></span> / 50 )</span>
                        
                        </label>
                        <span id="study_write_title_result" class="fail"></span>
                    </div>

                    <script src="https://cdn.ckeditor.com/ckeditor5/12.2.0/classic/ckeditor.js"></script>
                    <label>
                    스터디 소개 : 기간, 진행방식, 스터디 주제 설명, 주의사항 등을 자유롭게 적어주세요!
                        <textarea name="write_content" id="editor">
                        </textarea>
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
                <button type="button" onClick="study_write_chk()" class="form-control btn btn-primary">저장</button>
            </div>
        </div> <!-- modal footer -->
        
    	</form>

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
	
<?php mysqli_close($conn); ?>