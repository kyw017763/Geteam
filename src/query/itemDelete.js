export default (big, kind, num) => {
  // 게시글이 삭제되었다는 메시지
  // TODO: num, page, kind 가진 URL로 redirect

  let tableName = '';

  if (big == 'study') {
    if (kind == 'develop') {
      tableName = 'study_develop';
    } else if ($kind == 'design') {
      tableName = 'study_design';
    } else if ($kind == 'etc') {
      tableName = 'study_etc';
    }
    const deleteQuery = `DELETE FROM ${tableName} WHERE num=${num}`;
    const listQuery = "SELECT * FROM member WHERE id='$userid'";
    const listNumQueyr = "UPDATE member SET list_num='$list_num' WHERE id='$userid'";
  }

  if (big == 'contest') {
    if (kind == 'develop') {
      tableName = 'contest_develop';
    } else if (kind == 'design') {
      tableName = 'contest_design';
    } else if ($kind == 'etc') {
      tableName = 'contest_etc';
    } else if ($kind == 'idea') {
      tableName = 'contest_idea';
    }
    const deleteQuery = `DELETE FROM ${tableName} WHERE num=${num}`;
    const listQuery = "SELECT * FROM member WHERE id='$userid'";
    const listNumQueyr = "UPDATE member SET list_num='$list_num' WHERE id='$userid'";
  }
}
