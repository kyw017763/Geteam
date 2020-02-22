export default (big, kind, num) => {
  // TODO: SQL 실행 ($apply_sql, $apply_delete_sql)
  // TODO: 신청 취소 메시지 전달
  // TODO: num, page, kind 가진 URL로 redirect

  if (big == 'study') {
    const applyQuery = `DELETE FROM `;
    if (kind == 'develop') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_idea WHERE num='${num}'`;
      const applyDeleteQuery = `UPDATE study_develop SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'design') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_idea WHERE num='${num}'`;
      const applyDeleteQuery = `UPDATE study_design SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'etc') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_idea WHERE num='${num}'`;
      const applyDeleteQuery = `UPDATE study_etc SET apply_num='${a_num}' WHERE num='${num}'`;
    }
  }

  if (big == 'contest') {
    const applyQuery = `DELETE FROM `;
    if (kind == 'develop') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_develop WHERE num='$num''`;
      const applyDeleteQuery = `UPDATE contest_develop SET apply_num='$a_num' WHERE num='$num'`;
    } else if (kind == 'design') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_design WHERE num='${num}''`;
      const applyDeleteQuery = `UPDATE contest_design SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'etc') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_etc WHERE num='${num}''`;
      const applyDeleteQuery = `UPDATE contest_etc SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'idea') {
      applyQuery += `apply WHERE num_recv=${num} AND id_apply='${userid}'`;
      const applyNumQuery = `SELECT apply_num FROM contest_idea WHERE num='${num}''`;
      const applyDeleteQuery = `UPDATE contest_idea SET apply_num='${a_num}' WHERE num='${num}'`;
    }
  }
}
