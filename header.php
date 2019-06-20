<?php
include "setting.php";
//phpinfo();
?>
<nav class="navbar navbar-default navbar-fixed white bootsnav">
    <!-- Start Top Search -->
    <div class="top-search">
        <div class="container">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" class="form-control" placeholder="Search">
                <span class="input-group-addon close-search"><i class="fa fa-times"></i></span>
            </div>
        </div>
    </div>
    <!-- End Top Search -->

    <div class="container" style="user-select:none;">   
    
        <?php 
        if(isset($userid)) {
            $sql_badge_cal = mysqli_query($conn, "SELECT * FROM note_recv WHERE recv_id='$userid' AND recv_chk='0' ");
            $sql_badge_cal = mysqli_num_rows($sql_badge_cal);
        ?>
        <!-- Start Atribute Navigation -->
        <div class="attr-nav">
            <ul>
                <li class="dropdown">
                    <a href="note_recv.php">
                        <i class="fa fa-envelope-o"></i>
                        <?php
                            if(isset($userid)){
                            ?>
                                <span class="badge"><?php echo $sql_badge_cal ?></span>
                            <?php
                            }
                        ?>
                    </a>
                </li>
                
            </ul>
        </div>   
        <?php
        }
        ?>
        <!-- End Atribute Navigation -->

        <!-- Start Header Navigation -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="index.php">
                <!-- 로고 이미지 -->
                <img src="assets/images/logo.png" class="logo" alt="zteam logo image" style="width: 6.3rem; height: 2.2rem;">
            </a>
        </div>
        <!-- End Header Navigation -->
        
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-menu">
            <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                <li><a href="study_list.php?kind=develop&big=study" target="_self">스터디</a></li>                    
                <li><a href="contest_list.php?kind=develop&big=contest" target="_self">공모전</a></li>                    
                <li><a href="mypage.php" target="_self">My Page</a></li>                   
                
                <?php 
                if($userid) {
                    ?>
                    <li><a href="session_unset.php" target="_self">SignOut</a></li>
                <?php
                } else {
                    ?>
                    <li><a href="signin.php" target="_self">SignIn</a></li>
                    <li><a href="signup.php" target="_self">SignUp</a></li>  
                <?php
                }
                ?>
                
            </ul>
        </div><!-- /.navbar-collapse -->
    </div>  
</nav>