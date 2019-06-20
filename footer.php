<script>
//footer mesasge 유효성검사
function footer_note_write_chk() {
    var footer_set = document.footer_note_write;
    var footer_result = document.getElementById("footer_note_write_result");
    var footer_content = document.getElementById("footerInput");
    if(footer_content.value=="") {
        footer_result.innerHTML = "쪽지 내용을 입력해주세요";
        footer_set.footer_write_content.focus();
    } else {
        footer_set.submit();
    }
}
</script>

<!--Subscribe section-->
<section id="subscribe" class="subscribe roomy-100 fix">
    <div class="overlay_footer"></div>
    <div class="container">
        <div class="row">
            <div class="main_subscribe text-center">
                
            <div class="col-sm-10 col-sm-offset-1">
                <div class="subscribe_btns m-top-40">
                    <p class="text_footer m-top-30 text-white">
                            문의할 사항이 있으실 때,
                            추가됐으면 하는 기능이 있으실 때 <br />
                            
                            메일이나 즐팀 관리자 계정으로 쪽지를 주세요!
                    </p>

                    <form name="footer_note_write" class="form_write" method="post" action="note_write_process.php">
                        <div class="form-group col-sm-4 col-sm-offset-1">
                            <select class="form-control" name="write_recv">
                                <option value="s2017s04@e-mirim.hs.kr">s2017s04@e-mirim.hs.kr(뉴미디어 솔루션과 3학년)</option>
                                <option value="s2017i09@e-mirim.hs.kr">s2017i09@e-mirim.hs.kr(인터랙티브 미디어과 3학년)</option>
                            </select>
                            <input type="text" class="form-control" name="write_content" id="footerInput" placeholder="Your Message">
                            <span id="footer_note_write_result" class="fail_yellow" style="color: #efdc05;"></span>
                        </div>
                        <div class="col-sm-2">
                        <button type="button" onClick="footer_note_write_chk()" class="btn btn-default">보내기</button>
                        </div>
                    </form>
                </div>
            </div>
                
            </div>
        </div><!--End off row -->
    </div><!--End off container -->
</section><!-- End off Impress section-->

<!-- scroll up-->
<div class="scrollup">
    <a href="#"><i class="fa fa-chevron-up"></i></a>
</div><!-- End off scroll up -->


<footer id="footer" class="footer bg-black text-white">
    <div class="container">
        <div class="row">
            <div class="main_footer text-center p-top-30 p-bottom-20">
                <p class="wow fadeInRight text_footer" data-wow-duration="1s">
                    <small>
                    Made by
                    <a href="https://github.com/kyw017763"><i class="fa fa-github" style="color: #efdc05;"></i></a>
                    and
                    <a href="https://github.com/nayeonkyoung"><i class="fa fa-github" style="color: #efdc05;"></i></a>
                    </small>
                </p>
            </div>
        </div>
    </div>
</footer>