<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    
    <!--Designerd by: http://bootstrapthemes.co-->
    <head>
        <meta charset="utf-8">
        <title>즐팀 : 보낸 쪽지함</title>
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
          function note_write_chk() {
            var p_set = document.frm_note_write;
            
            var double_result = document.getElementById("note_write_double_result");
            var topic_result = document.getElementById("note_write_topic_result");
            var title_result = document.getElementById("note_write_title_result");
            var content_result = document.getElementById("note_write_content_result");

            if(p_set.write_send.value=="" || p_set.write_recv.value=="") {
              double_result.innerHTML = "값을 입력해주세요";
              p_set.write_topic.focus();
            } else if(p_set.write_content.value=="") {
              title_result.innerHTML = "";
              content_result.innerHTML = "내용을 입력해주세요";
              p_set.write_content.focus();
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

          function form_delete(){
            var form = document.formm;
            //alert(form);
            var b = 0;
            //alert(form.elements);
            for(i=0; i<form.elements.length;i++){
              if(form.elements[i].name=="mnum[]"){
                if(form.elements[i].checked == true){
                  b++;
                } 
              }
            }

            if (!confirm("정말 삭제하시겠습니까?")) {
              return;
            }

            if(b==0){
              alert("하나 이상의 쪽지를 선택해주세요!");
              return;
            }
            form.gb.value="2";
            form.submit();
          }
    	</script>
    </head>

    <body data-spy="scroll" data-target=".navbar-collapse">
    
        <div class="culmn">

			  <?php include "header.php"; ?>

            <div class="container">
                <div class="row">
                  <div class="col-sm-8 col-sm-offset-2">
                      <ul class="nav nav-pills nav-fill nav-justified m-top-100" style="margin-bottom: 50px;">
                          <li class="nav-item">
                              <a class="nav-link" href="note_recv.php" " target="_self" style="color: #efdc05; font-size: 1.1rem;">받은 쪽지함</a>           
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="note_send.php" target="_self" style="color: #efdc05; font-size: 1.1rem;">보낸 쪽지함</a>    
                          </li>
                      </ul>
                  </div>

                  <div class="separator_auto"></div>
                    
                  <div class="col-sm-12">

                      <div class="page_title text-center">
                          <h2>보낸 쪽지함</h2>
                          <div class="separator_auto"></div>
                      </div>
                  </div>

                  <?php
                    //보낸 쪽지함 DB에서 가져오기(recv_note)
                    //recv_note의 send_id가 세션 userid가 같은 것만 가져오기
                      
                    if( $range=="author"){
                      $result_list = mysqli_query($conn, "SELECT * FROM note_send WHERE send_id='$userid' ORDER BY send_id, idx DESC");
                    } else if($range=="content") {
                      $result_list = mysqli_query($conn, "SELECT * FROM note_send WHERE send_id='$userid' ORDER BY content, idx DESC");
                    } else {
                      $result_list = mysqli_query($conn, "SELECT * FROM note_send WHERE send_id='$userid' ORDER BY idx, send_id DESC");
                    }

                      $scale = 10;
                      
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
                  
                  <div class="col-sm-12">
                    <div class="col-sm-3">
                        <form method="post" action="note_send.php?kind=<?php echo $kind; ?>">
                            <select onchange="location = this.value;" class="form-control" style="display: inline-block;">
                            <option value="note_send.php?range=num">날짜</option>
                            <option value="note_send.php?range=author">작성자</option>
                            <option value="note_send.php?range=content">내용</option>
                            </select>
                        </form>
                    </div>
                    
                    <div class="col-sm-3">
                      <button type='button' class="home_btns form-control btn btn-primary" data-toggle="modal" data-target="#modal_note_write">쪽지 쓰기</button>
                    </div>

                    <div class="col-sm-3">
                      <a href="javascript:form_delete()">
                      <button type="button" class="btn btn-primary_delete" style="padding: 1em 1em; border-radius: 50%;">
                      <i class='fa fa-trash text-primary'></i>
                      </button>
                      </a>
                    </div>
                  </div>      
                <!-- study목록 각 하나의 article -->
                <!--블럭 내에 보여 줄 데이터들 DB에서 가져온 값이 저장된 $row 변수에서 한 속성씩 빼냄-->

                <form action="send_delete.php" method="post" name="formm">
                <div class="col-sm-12 m-top-50">
                <table class="table table-bordered table-hover" style="width: 100%; font-size: 13px;">
                <input type="hidden" name="gb">
                <thead>
                  <tr>
                    <th width="2%"></th>
                    <th width="7.5%">No</th>
                    <th width="20%">받은사람</th>
                    <th width="47.5%">내용</th>
                    <th width="15%">받은날짜</th>
                    <th width="7.5%">확인</th>
                  </tr>
                </thead>
                <tbody>
                <?php 
                  for($i = $start; $i < $start+$scale && $i < $total_record; $i++){
                    $result_list2 = mysqli_query($conn, "SELECT * FROM note_recv WHERE send_id='$userid' ORDER BY idx, send_id DESC");
                    mysqli_data_seek($result_list, $i); //가져올 레코드로 위치(포인터) 이동
                    $recv_row = mysqli_fetch_array($result_list); //하나의 레코드 가져오기
                    mysqli_data_seek($result_list2, $i); //가져올 레코드로 위치(포인터) 이동
                    $recv_row2 = mysqli_fetch_array($result_list2); //하나의 레코드 가져오기

                    $note_idx = $_POST['note_idx'];
                    $note_idx = $recv_row['idx'];
                    $note_content = $recv_row['content'];
                    $note_recv_id = $recv_row['recv_id'];
                    $note_chk = $recv_row2['recv_chk'];
                    $note_date = $recv_row['send_date'];
                    
                    $note_content = str_replace(" ", "&nbsp;", $note_content);
                    $note_content = str_replace("\n", "<br>", $note_content);
                    $note_date = substr($note_date, 0, 10);

                    if($note_chk=='0') {
                      $note_chk='□';
                    }else{
                      $note_chk = '■';
                    }
                    
                ?>

                <tr>
                  <td><input type="checkbox" name="mnum[]" value="<?= $recv_row['idx']?>" >
                  <td><?php echo $note_idx ?></td>
                  <td><?php echo $note_recv_id ?></td>
                  <td><?php echo $note_content ?></td>
                  <td><?php echo $note_date ?></td>
                  <td style="color: #efdc05; "><?php echo $note_chk ?></td>
                </tr>

                <?php
                    } //for문
                ?>
                </tbody>
                </table>
                </div>
              </form>

                  <div class="col-sm-4 col-sm-offset-4 text-center m-top-50">
                  <!--페이지 번호 표시-->
                  <nav aria-labesl="...">
                  <div>
                    <ul class="pagination pagination-lg">
                          <?php 
                          if(page-5 >= 1) {
                          
                          ?>
                          <li class="page-item">
                            <a class="page-link" href="note_recv.php?page=<?php echo $page-5 ?>&kind=<?php echo $kind?>" style="background: rgb(247,247,247); color: #FF8489; border: 0;">&laquo;</a>
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
                                    <a class="page-link" href="note_recv.php?page=<?php echo $i ?>&kind=<?php echo $kind ?>" style="background: rgb(247,247,247); color: #efdc05; border: 0;"><?php echo $i ?></a>
                                  </li>
                          <?php 
                              }
                          }
                          ?>
                          
                          <?php 
                          if(page+5 <= $total_page) {
                          ?>
                          <li class="page-item">
                            <a class="page-link" href="note_recv.php?page=<?php echo $page+5 ?>" style="background: rgb(247,247,247); color: #efdc05; border: 0;">&raquo;</a>
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
<div class="modal fade" id="modal_note_write" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        
    <!-- Modal content-->
        <div class="modal-content">

        <div class="modal-header">
            <h6 class="modal-title" style="display: inline-block;">쪽지</h6>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div> <!-- modal header -->

        <div class="modal-body" style="padding: 50px;">
                <form name="frm_note_write" class="form_write" method="post" action="note_write_process.php">
                    <label>
                        보내는 사람
                    <input type="text" class="form-control" name="write_send" value="<?php echo "$userid" ?>" (<?php echo $username ?>) readonly>
                    </label>

                    <label>
                        받는 사람
                    <input type="text" class="form-control" name="write_recv" >
                    </label>

                    <span id="note_write_double_result" class="fail"></span>
                    
                    <div class="textarea_counter">
                        <label>
                            쪽지 내용
                        <textarea id="textarea" name="write_content" class="note_content" maxlength="70" onkeyup="lengCounter()"></textarea>
                        
                        </label>
                        <span id="note_write_content_result" class="fail"></span>
                    </div>

        </div> <!-- modal body -->

        <div class="modal-footer">
            <div class="col-sm-3 col-sm-offset-9">
                <button onClick="note_write_chk()" class="form-control btn btn-primary">보내기</button>
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