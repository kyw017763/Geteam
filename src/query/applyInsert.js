export default (big, kind, num) => {
  // TODO: Apply Counting + 1
  // TODO: num, page, kind 가진 URL로 redirect

  if (big == 'study') {
    let applyQuery;
    if (kind == 'develop') {
      applyQuery = "INSERT INTO `apply_study_develop`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
      const applyNumQuery = `SELECT apply_num FROM study_develop WHERE num='${num}'`;
      const applyAddQuery = `UPDATE study_develop SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'design') {
      applyQuery = "INSERT INTO `apply_study_design`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
      const applyNumQuery = `SELECT apply_num FROM study_design WHERE num='${num}'`;
      const applyAddQuery = `UPDATE study_design SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if ($kind == 'etc') {
      applyQuery = "INSERT INTO `apply_study_etc`(`num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `portfolio`, `want`, `apply_chk`) "; 
      const applyNumQuery = `SELECT apply_num FROM study_etc WHERE num='${num}'`;
      const applyAddQuery = `UPDATE study_etc SET apply_num='${a_num}' WHERE num='${num}'`;
    }
    applyQuery += ` VALUES ('${num_recv}', '${id_apply}', '${id_recv}', '${name_apply}', '${name_recv}', '${topic}', '${title}', '${regist_day}', '${portfolio}', '${want}', '0')`;
  }

  if (big == 'contest') {
    let applyQuery;
    if (kind == 'develop') {
      applyQuery = "INSERT INTO `apply_contest_develop`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
      const applyNumQuery = `SELECT apply_num FROM contest_develop WHERE num='${num}'`;
      const applyAddQuery = `UPDATE contest_develop SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if (kind == 'design') {
      applyQuery = "INSERT INTO `apply_contest_design`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
      const applyNumQuery = `SELECT apply_num FROM contest_design WHERE num='${num}'`;
      const applyAddQuery = `UPDATE contest_design SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if (kind == 'etc') {
      applyQuery = "INSERT INTO `apply_contest_etc`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
      const applyNumQuery = `SELECT apply_num FROM contest_etc WHERE num='${num}'`;
      const applyAddQuery = `UPDATE contest_etc SET apply_num='${a_num}' WHERE num='${num}'`;
    } else if (kind == 'idea') {
      applyQuery = "INSERT INTO `apply_contest_idea`(`num`, `num_recv`, `id_apply`, `id_recv`, `name_apply`, `name_recv`, `topic`, `title`, `apply_day`, `part`, `portfolio`, `want`, `apply_chk`) ";
      const applyNumQuery = `SELECT apply_num FROM contest_idea WHERE num='${num}'`;
      const applyAddQuery = `UPDATE contest_idea SET apply_num='${a_num}' WHERE num='${num}'`;
    }
    apply_sql += " VALUES ('const num_recv', 'const id_apply', 'const id_recv', 'const name_apply', 'const name_recv', 'const topic', 'const title', 'const regist_day', 'const part', 'const portfolio', 'const want', '0')";
  }
}
