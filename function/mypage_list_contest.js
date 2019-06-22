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

        #tab4:checked ~ #content4,
        #tab5:checked ~ #content5,
        #tab6:checked ~ #content6,
        #tab7:checked ~ #content7{
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
            var f4 = document.f4;
            //alert(form);
            var b = 0;
            //alert(form.elements);
            for(i=0; i<f4.elements.length;i++){
              if(f4.elements[i].name=="mnum4[]"){
                if(f4.elements[i].checked == true){
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
            f4.gb4.value="1";
            f4.submit();
          }

          function list_delete2(){
            var f5 = document.f5;
            //alert(form);
            var b2 = 0;
            //alert(form.elements);
            for(i=0; i<f5.elements.length;i++){
              if(f5.elements[i].name=="mnum5[]"){
                if(f5.elements[i].checked == true){
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
            f5.gb5.value="1";
            f5.submit();
          }

          function list_delete3(){
            var f6 = document.f6;
            //alert(form);
            var b3 = 0;
            //alert(form.elements);
            for(i=0; i<f6.elements.length;i++){
              if(f6.elements[i].name=="mnum6[]"){
                if(f6.elements[i].checked == true){
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
            f6.gb6.value="1";
            f6.submit();
          }

          function list_delete4(){
            var f7 = document.f7;
            //alert(form);
            var b4 = 0;
            //alert(form.elements);
            for(i=0; i<f7.elements.length;i++){
              if(f7.elements[i].name=="mnum7[]"){
                if(f7.elements[i].checked == true){
                  b4++;
                } 
              }
            }
            
            if (!confirm("정말 삭제하시겠습니까?")) {
              return;
            }

            if(b4==0){
              alert("하나 이상의 게시글을 선택해주세요!");
              return;
            }
            f7.gb7.value="1";
            f7.submit();
          }
    </script>
</head>

<body>
	<?php
                    $result_list = mysqli_query($conn, "SELECT * FROM contest_develop WHERE id='$userid' ORDER BY num DESC");       
                    $scale = 10;
                    $total_record = mysqli_num_rows($result_list); //전체 글 수

                    $result_list2 = mysqli_query($conn, "SELECT * FROM contest_design WHERE id='$userid' ORDER BY num DESC");       
                    $scale2 = 10;
                    $total_record2 = mysqli_num_rows($result_list2); //전체 글 수

                    $result_list3 = mysqli_query($conn, "SELECT * FROM contest_etc WHERE id='$userid' ORDER BY num DESC");       
                    $scale3 = 10;
                    $total_record3 = mysqli_num_rows($result_list3); //전체 글 수

                    $result_list4 = mysqli_query($conn, "SELECT * FROM contest_idea WHERE id='$userid' ORDER BY num DESC");       
                    $scale4 = 10;
                    $total_record4 = mysqli_num_rows($result_list4); //전체 글 수



                      if($total_record % $scale==0)
                      $total_page = $total_record/$scale;
                      else
                      $total_page = floor($total_record/$scale)+1;
                      
                      if(!$page) $page = 1;

                      $start = ($page-1) * $scale;


                      if($total_record2 % $scale2==0)
                      $total_page2 = $total_record2/$scale2;
                      else
                      $total_page2 = floor($total_record2/$scale2)+1;
                      
                      if(!$page2) $page2 = 1;

                      $start2 = ($page2-1) * $scale2;


                      if($total_record3 % $scale3==0)
                      $total_page3 = $total_record3/$scale3;
                      else
                      $total_page3 = floor($total_record3/$scale3)+1;
                      
                      if(!$page3) $page3 = 1;

                      $start3 = ($page3-1) * $scale3;


                      if($total_record4 % $scale4==0)
                      $total_page4 = $total_record4/$scale4;
                      else
                      $total_page4 = floor($total_record4/$scale4)+1;
                      
                      if(!$page4) $page4 = 1;

                      $start4 = ($page4-1) * $scale4;


                  ?>

<div>
	<input id="tab4" type="radio" name="tabs" checked> <!--디폴트 메뉴-->
    <label for="tab4">개발</label>

    <input id="tab5" type="radio" name="tabs">
    <label for="tab5">디자인</label>

    <input id="tab6" type="radio" name="tabs">
    <label for="tab6">기타</label>

    <input id="tab7" type="radio" name="tabs">
    <label for="tab7">아이디어</label>

    <section id="content4">
<form action="list_del.php" method="post" name="f4">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;">
     <input type="hidden" name="gb4"> 
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
      $contest_develop = mysqli_fetch_array($result_list); //하나의 레코드 가져오기
      $c_dev_topic = $contest_develop['topic'];
      $c_dev_title = $contest_develop['title'];
      $c_dev_content = $contest_develop['content']
    ?>
    <tr>
      <td><input type="checkbox" name="mnum4[]" value="<?= $contest_develop['num']?>"></td>
      <td><?php echo $c_dev_topic ?></td>
      <td><?php echo $c_dev_title ?></td>
      <td><?php echo $c_dev_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>   
</form>     
    </section>

    <section id="content5">
<form action="list_del.php" method="post" name="f5">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;">
     <input type="hidden" name="gb5"> 
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
      $contest_design = mysqli_fetch_array($result_list2); //하나의 레코드 가져오기
      $c_des_topic = $contest_design['topic'];
      $c_des_title = $contest_design['title'];
      $c_des_content = $contest_design['content'];

    ?>
    <tr>
      <td><input type="checkbox" name="mnum5[]" value="<?= $contest_design['num']?>" ></td>
      <td><?php echo $c_des_topic ?></td>
      <td><?php echo $c_des_title ?></td>
      <td><?php echo $c_des_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>  
</form>
    </section>

    <section id="content6">
<form action="list_del.php" method="post" name="f6">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;"> 
      <input type="hidden" name="gb6">
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
        $contest_etc = mysqli_fetch_array($result_list3); //하나의 레코드 가져오기
        $c_etc_topic = $contest_etc['topic'];
        $c_etc_title = $contest_etc['title'];
        $c_etc_content = $contest_etc['content'];
    ?>
    <tr>
        <td><input type="checkbox" name="mnum6[]" value="<?=$contest_etc['num']?>" ></td>
      <td><?php echo $c_etc_topic ?></td>
      <td><?php echo $c_etc_title ?></td>
      <td><?php echo $c_etc_content ?></td>
    </tr>

    <?php
        } //for문
    ?>
    </tbody>
    </table>
</div>
</form>
    </section>

    <section id="content7">
<form action="list_del.php" method="post" name="f7">
<div class="col-sm-12 m-top-50">
    <table  class="type09" style="width: 100%; font-size: 13px;"> 
      <input type="hidden" name="gb7">
    <thead>
      <tr>
        <th width="5%">선택</th>
        <th width="20%">주제</th>
        <th width="20%">제목</th>
        <th width="55%">내용</th>

      </tr>
    </thead>
        <button type="button" onClick="list_delete4()" class="form-control btn btn-primary">선택 삭제</button> 
    <tbody>
    <?php
      for($i4 = $start4; $i4 < $start4+$scale4 && $i4 < $total_record4; $i4++){
        mysqli_data_seek($result_list4, $i4); //가져올 레코드로 위치(포인터) 이동
        $study_etc = mysqli_fetch_array($result_list4); //하나의 레코드 가져오기
        $c_idea_topic = $study_idea['topic'];
        $c_idea_title = $study_idea['title'];
        $c_idea_content = $study_idea['content'];
    ?>
    <tr>
        <td><input type="checkbox" name="mnum7[]" value="<?=$contest_idea['num']?>" ></td>
      <td><?php echo $c_idea_topic ?></td>
      <td><?php echo $c_idea_title ?></td>
      <td><?php echo $c_idea_content ?></td>
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
