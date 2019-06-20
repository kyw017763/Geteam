<?php
header('Content-Type: text/html; charset=UTF-8');
session_start();
session_destroy();
?>

<script>
	location.href = "index.php";
</script>