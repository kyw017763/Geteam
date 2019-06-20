<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
include "auth.php";
include "dbconn.php";
include "setting.php";

$sql = mysqli_query($conn, "SELECT * FROM member WHERE id='$userid'");
$member = mysqli_fetch_array($sql);
?>

<!DOCTYPE html>
<html>
<head>
<meta charset=”UTF-8″>
<title>Title of the document</title>
    <style>
        body {
            color: #555;
            background: #eeeeee;
            margin:0;
            padding: 0;
            box-sizing: border-box;}

        h1 {
            padding: 50px 0;
            font-weight: 400;
            text-align: center;}

        p {
            margin: 0 0 20px;
            line-height: 1.5;}

        .main {
            min-width: 320px;
            max-width: 800px;
            padding: 50px;
            margin: 0 auto;
            background: #ffffff;}

        section {
            display: none;
            padding: 20px 0 0;
            border-top: 1px solid #ddd;}

        /*라디오버튼 숨김*/
          input[type=radio]{
              display: none;}

        label {
            display: inline-block;
            margin: 0 0 -1px;
            padding: 15px 25px;
            font-weight: 600;
            text-align: center;
            color: #bbb;
            border: 1px solid transparent;}

        label:hover {
            color: #2e9cdf;
            cursor: pointer;}

        /*input 클릭시, label 스타일*/
        input:checked + label {
              color: #555;
              border: 1px solid #ddd;
              border-top: 2px solid #2e9cdf;
              border-bottom: 1px solid #ffffff;}

        #tab1:checked ~ #content1,
        #tab2:checked ~ #content2,
        #tab3:checked ~ #content3{
            display: block;}

		table.type09 {
		    border-collapse: collapse;
		    text-align: left;
		    line-height: 1.5;

		}
		table.type09 thead th {
		    padding: 10px;
		    font-weight: bold;
		    vertical-align: top;
		    color: #369;
		    border-bottom: 3px solid #036;
		}
		table.type09 tbody th {
		    width: 150px;
		    padding: 10px;
		    font-weight: bold;
		    vertical-align: top;
		    border-bottom: 1px solid #ccc;
		    background: #f3f6f7;
		}
		table.type09 td {
		    width: 350px;
		    padding: 10px;
		    vertical-align: top;
		    border-bottom: 1px solid #ccc;
		}
    </style>
    <script>
        function list_delete(){
            var f1 = document.f1;
            //alert(form);
            var b = 0;
            //alert(form.elements);
            for(i=0; i<f1.elements.length;i++){
              if(f1.elements[i].name=="mnum[]"){
                if(f1.elements[i].checked == true){
                  b++;
                } 
              }
            }
            
            if (!confirm("정말 삭제하시겠습니까?")) {
              return;
            }

            if(b==0){
              alert("하나 이상의 게시글을 선택해주세요!");
              return;
            }
            f1.gb.value="1";
            f1.submit();
          }

          function list_delete2(){
            var f2 = document.f2;
            //alert(form);
            var b2 = 0;
            //alert(form.elements);
            for(i=0; i<f2.elements.length;i++){
              if(f2.elements[i].name=="mnum2[]"){
                if(f2.elements[i].checked == true){
                  b2++;
                } 
              }
            }
            
            if (!confirm("정말 삭제하시겠습니까?")) {
              return;
            }

            if(b2==0){
              alert("하나 이상의 게시글을 선택해주세요!");
              return;
            }
            f2.gb2.value="1";
            f2.submit();
          }

          function list_delete3(){
            var f3 = document.f3;
            //alert(form);
            var b3 = 0;
            //alert(form.elements);
            for(i=0; i<f3.elements.length;i++){
              if(f3.elements[i].name=="mnum3[]"){
                if(f3.elements[i].checked == true){
                  b3++;
                } 
              }
            }
            
            if (!confirm("정말 삭제하시겠습니까?")) {
              return;
            }

            if(b3==0){
              alert("하나 이상의 게시글을 선택해주세요!");
              return;
            }
            f3.gb3.value="1";
            f3.submit();
          }
    </script>
</head>

<body>
	<?php
                    $result_list = mysqli_query($conn, "SELECT * FROM study_develop WHERE id='$userid' ORDER BY num DESC");       
                    $scale = 10;
                    $total_record = mysqli_num_rows($result_list); //전체 글 수

                    $result_list2 = mysqli_query($conn, "SELECT * FROM study_design WHERE id='$userid' ORDER BY num DESC");       
                    $scale2 = 10;
                    $total_record2 = mysqli_num_rows($result_list2); //전체 글 수

                    $result_list3 = mysqli_query($conn, "SELECT * FROM study_etc WHERE id='$userid' ORDER BY num DESC");       
                    $scale3 = 10;
                    $total_record3 = mysqli_num_rows($result_list3); //전체 글 수



                    //study_develop
                      if($total_record % $scale==0)
                      $total_page = $total_record/$scale;
                      else
                      $total_page = floor($total_record/$scale)+1;
                      
                      if(!$page) $page = 1;

                      $start = ($page-1) * $scale;

                    //study_design
                      if($total_record2 % $scale2==0)
                      $total_page2 = $total_record2/$scale2;
                      else
                      $total_page2 = floor($total_record2/$scale2)+1;
                      
                      if(!$page2) $page2 = 1;

                      $start2 = ($page2-1) * $scale2;

                      //study_etc
                      if($total_record3 % $scale3==0)
                      $total_page3 = $total_record3/$scale3;
                      else
                      $total_page3 = floor($total_record3/$scale3)+1;
                      
                      if(!$page3) $page3 = 1;

                      $start3 = ($page3-1) * $scale3;
                  ?>

<div>
	<input id="tab1" type="radio" name="tabs" checked> <!--디폴트 메뉴-->
    <label for="tab1">개발</label>

    <input id="tab2" type="radio" name="tabs">
    <label for="tab2">디자인</label>

    <input id="tab3" type="radio" name="tabs">
    <label for="tab3">기타</label>

    <section id="content1">
<form action="list_del.php" method="post" name="f1">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;">
     <input type="hidden" name="gb"> 
    <thead>
      <tr>
        <th width="5%">선택</th>
        <th width="20%">주제</th>
        <th width="20%">제목</th>
        <th width="55%">내용</th>
      </tr>
    </thead>
        <button type="button" onClick="list_delete()" class="form-control btn btn-primary">선택 삭제</button> 
    <tbody>
    <?php
      for($i = $start; $i < $start+$scale && $i < $total_record; $i++){
        mysqli_data_seek($result_list, $i); //가져올 레코드로 위치(포인터) 이동
        $study_develop = mysqli_fetch_array($result_list); //하나의 레코드 가져오기
        $s_dev_topic = $study_develop['topic'];
        $s_dev_title = $study_develop['title'];
        $s_dev_content = $study_develop['content'];
    ?>
    <tr>
      <td><input type="checkbox" name="mnum[]" value="<?= $study_develop['num']?>"></td>
      <td><?php echo $s_dev_topic ?></td>
      <td><?php echo $s_dev_title ?></td>
      <td><?php echo $s_dev_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>   
</form>     
    </section>

    <section id="content2">
<form action="list_del.php" method="post" name="f2">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;">
     <input type="hidden" name="gb2"> 
    <thead>
      <tr>
        <th width="5%">선택</th>
        <th width="20%">주제</th>
        <th width="20%">제목</th>
        <th width="55%">내용</th>

      </tr>

    </thead>
        <button type="button" onClick="list_delete2()" class="form-control btn btn-primary">선택 삭제</button> 
    <tbody>
    <?php
      for($i2 = $start2; $i2 < $start2+$scale2 && $i2 < $total_record2; $i2++){
        mysqli_data_seek($result_list2, $i2); //가져올 레코드로 위치(포인터) 이동
        $study_design = mysqli_fetch_array($result_list2); //하나의 레코드 가져오기
        $s_des_topic = $study_design['topic'];
        $s_des_title = $study_design['title'];
        $s_des_content = $study_design['content'];
    ?>
    <tr>
      <td><input type="checkbox" name="mnum2[]" value="<?= $study_design['num']?>" ></td>
      <td><?php echo $s_des_topic ?></td>
      <td><?php echo $s_des_title ?></td>
      <td><?php echo $s_des_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>  
</form>
    </section>

    <section id="content3">
<form action="list_del.php" method="post" name="f3">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;"> 
      <input type="hidden" name="gb3">
    <thead>
      <tr>
        <th width="5%">선택</th>
        <th width="20%">주제</th>
        <th width="20%">제목</th>
        <th width="55%">내용</th>

      </tr>
    </thead>
        <button type="button" onClick="list_delete3()" class="form-control btn btn-primary">선택 삭제</button> 
    <tbody>
    <?php
      for($i3 = $start3; $i3 < $start3+$scale3 && $i3 < $total_record3; $i3++){
        mysqli_data_seek($result_list3, $i3); //가져올 레코드로 위치(포인터) 이동
        $study_etc = mysqli_fetch_array($result_list3); //하나의 레코드 가져오기
        $s_etc_topic = $study_etc['topic'];
        $s_etc_title = $study_etc['title'];
        $s_etc_content = $study_etc['content'];
    ?>
    <tr>
        <td><input type="checkbox" name="mnum3[]" value="<?=$study_etc['num']?>" ></td>
      <td><?php echo $s_etc_topic ?></td>
      <td><?php echo $s_etc_title ?></td>
      <td><?php echo $s_etc_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>
</form>
    </section>

</div>
</body>

</html>
