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
        <title>즐팀 : 회원가입</title>
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
    	function isNumber(s) {
            s += ''; // 문자열로 변환
            s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
            if (s == '' || isNaN(s)) return false;
            return true;
        }

    	
    	function signup_chk(){

    		var p_set = document.frm_signup;
    		
    		var name_result = document.getElementById("signup_name_result");
    		var num_result = document.getElementById("signup_num_result");
    		var pwd_result = document.getElementById("signup_pwd_result");
    		var pwdck_result = document.getElementById("signup_pwdck_result");
    		var email_result = document.getElementById("signup_email_result");
    		var inters_result = document.getElementById("signup_inters_result");
    		var profile_result = document.getElementById("signup_profile_result");
    		var result = document.getElementById("signup_result");	

    		if(p_set.signup_name.value=="") {
    			name_result.innerHTML = "이름을 입력해주세요";
    			p_set.signup_name.focus();
    		} else if(p_set.signup_num.value=="" || !(isNumber(p_set.signup_num.value))) {
    			name_result.innerHTML = "";
    			num_result.innerHTML = "학번을 입력해주세요";
    			p_set.signup_num.focus();
    		} else if(p_set.signup_pwd.value=="") {
    			num_result.innerHTML = "";
    			pwd_result.innerHTML = "비밀번호를 입력해주세요";
    			p_set.signup_pwd.focus();
    		} else if(p_set.signup_email.value=="") {
    			pwd_result.innerHTML = "";
    			email_result.innerHTML = "이메일을 입력해주세요";
    			p_set.signup_email.focus();
    		} else if(p_set.signup_inter1.value=="") {
    			emali_result.innerHTML = "";
    			inters_result.innerHTML = "흥미 주제들을 입력해주세요";
    			p_set.signup_inter1.focus();
    		} else if(p_set.signup_inter2.value=="") {
    			inters_result.innerHTML = "흥미 주제들을 입력해주세요";
    			p_set.signup_inter2.focus();
    		} else if(p_set.signup_inter3.value=="") {
    			inters_result.innerHTML = "흥미 주제들을 입력해주세요";
    			p_set.signup_inter3.focus();
    		} else if(p_set.signup_profile.value=="") {
    			inters_result.innerHTML = "";
    			profile_result.innerHTML = "자기소개를 입력해주세요";
    			p_set.signup_profile.focus();
    		} else if(!(p_set.signup_pwd.value==p_set.signup_pwdck.value)) {
    			profile_result.innerHTML = "";
    			pwdck_result.innerHTML = "비밀번호와 확인 문자가 일치하지 않습니다";
    			p_set.signup_pwdck.focus();
    		} else {
    			p_set.submit();
        	}
    	}

    	function lengCounter() {
			document.getElementById("counter").innerHTML=document.getElementById("textarea").value.length;
        }
    	</script>
    </head>

    <body data-spy="scroll" data-target=".navbar-collapse">
    
        <div class="culmn">

			<?php include "header.php"; ?>

            <div class="container">
                <div class="row">

                    <div class="col-sm-8 col-sm-offset-2" style="margin-top: 150px; margin-bottom: 150px;">
                    
                    <div class="col-sm-12">
                    <div class="page_title text-center">
                        <h2>회원가입</h2>
                        <div class="separator_auto"></div>
                    </div>
                    </div>
                    
                    <div class="col-sm-10">
                        <form class="form_write" action="signup_process.php" method="post" name="frm_signup">
                            <label>
                            	이름
                            <input type="text" name="signup_name" placeholder="실명을 입력해주세요"  maxlength="20">
                            </label>
                            <span id="signup_name_result" class="fail"></span>
    
                            <label>
                            	학번
                            <input type="text" name="signup_num"  maxlength="4">
                            </label>
                            <span id="signup_num_result" class="fail"></span>
                            
                            <label>
                            	이메일
                            <input type="email" name="signup_email" placeholder="학교 이메일을 입력해주세요">
                            </label>
                            <span id="signup_email_result" class="fail"></span>
                            
                            <label>
                            	비밀번호
                            <input type="password" name="signup_pwd" placeholder="영 대소문자/숫자/특수문자!@#$%^&*를 포함한 8~15자입니다" name="signup_pwd">
                            </label>
                            <span id="signup_pwd_result" class="fail"></span>
                            
                            <label>
                            	비밀번호 확인
                            <input type="password" name="signup_pwdck" placeholder="비밀번호 확인">
                            </label>
                            <span id="signup_pwdck_result" class="fail"></span>
                        
                        	<label>
                    			<div>흥미있는 기술 / 공부 주제</div>
                                <div class="col-md-4">
                                <input type="text" name="signup_inter1">
                                </div>
    							
                                <div class="col-md-4">
                                <input type="text" name="signup_inter2">
                                </div>
    
                                <div class="col-md-4">
                                <input type="text" name="signup_inter3">
                                </div>
                            </label>
                            
                            <span id="signup_inters_result" class="fail"></span>
							<br>
							
                            <div class="textarea_counter">
                                <label>
                                	자기소개
                                <textarea id="textarea" name="signup_profile" maxlength="500" onkeyup="lengCounter()"></textarea>
                                
                                <span id="ex_counter" class="counter">( <span id="counter" class="counter"></span> / 500 )</span>
                                </label>
                            </div>
                            <span id="signup_profile_result" class="fail"></span>
								
                            <button type="button" name="signup" onClick="signup_chk()" class="form-control btn btn-primary">회원가입</button>
                        
                        </form>
                    </div>
                    </div>
                </div>

                </div> <!-- row -->
	        </div> <!-- container -->
        	<?php include "footer.php"; ?>
        </div> <!-- culmn -->  

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