<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
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
        <title>즐팀 : 로그인</title>
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
    	window.onload = function() {
        	
        var text_pwd = document.getElementById("text_pwd"); //넘겨받은 메일값
        var text_find_pwd = document.getElementById("text_find_pwd"); //메일이 정확한지 확인하는 정규표현식에 따른 결과를 보여주는 span
        var page_original = document.getElementById("original");
        var page_new = document.getElementById("new");                                        

        btn_find.onclick = function() {
           	page_original.style.display = "none";
           	page_new.style.display = "block";
           	text_find_pwd.innerHTML = "해당 이메일로 전송이 완료되었습니다!";
            
            setTimeout(function() {
            sendTheEmail()
            }, 3000);
        }

        function sendTheEmail() {
            var p_set = document.frm_email_write;
            
            text_pwd = '[비밀번호 찾기 이메일]' + text_pwd;

            p_set.submit();
        }
    	}
    	</script>
    </head>

    <body data-spy="scroll" data-target=".navbar-collapse">
    
        <div class="culmn">

			<?php include "header.php"; ?>

            <div class="container">
                <div class="row">

                    <div class="col-sm-8 col-sm-offset-2" style="margin-top: 200px; margin-bottom: 150px;">
                    
                        <div class="col-sm-12">
                        <div class="page_title text-center">
                            <h2>로그인</h2>
                            <div class="separator_auto"></div>
                        </div>
                        </div>
                        
                        <div class="col-sm-10">
                        
                        <form action="signin_process.php" method="post" class="form_write" name="frm_signin">
                        <label>
                        	이메일
                            <?php 
                                if(isset($cookie_id)){
                                    echo "<input type='email' class='form-control' placeholder='학교 이메일을 입력해주세요' name='signin_email' value='$cookie_id'>";
                                } else {
                                    echo "<input type='email' class='form-control' placeholder='학교 이메일을 입력해주세요' name='signin_email'>";
                                }
                            ?>
                        </label>

                        <label>
                        	비밀번호
                        <input type="password" class="form-control" placeholder="비밀번호를 입력해주세요" name="signin_pwd">
                        </label>
                        
                        <div class="checks etrans" style="float: left;">
                          <input type="checkbox" id="email_save" value="yes" name="id_ck">
    					  <label for="email_save">이메일 저장</label>
                        </div>
						
						<div class="menu_signin" style="float: right;">
                            <span data-toggle="modal" data-target="#find_pwd_modal" style="cursor: pointer;">비밀번호 찾기</span>
    						
    						<a href="signup.php"><span>회원가입</span></a>
                        </div>
                        
                        <button type="submit" name="signin" class="form-control btn btn-primary">로그인</button>
                        
        				<span id="singnin_find_result" class="fail"></span>

                        <?php 
                        if($fail) {
                            echo "<span id='signup_result' class='fail'>이메일 또는 비밀번호가 다릅니다</span>";
                        }
                        ?>
                        </form>

                        </div>
                    </div>

                </div> <!-- row -->
	        </div> <!-- container -->
        	<?php include "footer.php"; ?>
        </div> <!-- culmn -->  

                          
<!-- Insert Modal -->
<div class="modal fade" id="find_pwd_modal" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        
    <!-- Modal content-->
        <div class="modal-content">

        <div class="modal-header">
            <h6 class="modal-title" style="display: inline-block;">Find Password</h6>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div> <!-- modal header -->

        <div class="modal-body" style="padding: 4rem;">
            <div id="new" style="display: none;">
                <span id="text_find_pwd" class="content"></span>
            </div>

            <div id="original" class="col-sm-10 col-sm-offset-1">
                <form name="frm_email_write" class="form_write" action="note_not_auth_write_process.php?$write_recv=<?php echo 's2017s04@e-mirim.hs.kr'; ?>&write_send=<?php echo "[FindPassword]" ?>&write_content=<?php echo $text_pwd ?>" method="get"> <!-- signin_findpwd에는 이메일로 비밀번호 확인 메일이 가는 로직 -->
                    <div class="col-sm-8">
                        <input type="text" id="text_pwd" name="text_pwd" maxlength="25" placeholder="학교 이메일(아이디)을 입력해주세요" style="padding: 1.25rem 0.3rem;">
                    </div>
                    <div class="col-sm-4">
                        <button type="button" id="btn_find" class="form-control btn btn-primary">확인</button>
                    </div>
                </form>
            </div>
        </div> <!-- modal body -->

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