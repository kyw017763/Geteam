export default (big, kind, num, mode = 'insert') => {
  // TODO: 신청 마감일은 '오늘' 이후로 설정해야 한다 (작성, 수정 시 확인)
  // TODO: Item Counting + 1
  // TODO: num, page, kind 가진 URL로 redirect

  let query = '';
  let tableName = '';
  if (big == 'study') {
    if (kind == 'develop') {
      tableName = 'study_develop';
    } else if ($kind == 'design') {
      tableName = 'study_design';
    } else if ($kind == 'etc') {
      tableName = 'study_etc';
    }
    if (mode === 'modify') {
      query = `UPDATE ${tableName} SET topic='${modify_topic}', title='${modify_title}', content='${modify_content}', want_num='${modify_want_num}', end_day='${modify_end_day}' WHERE num='${num}'`;
    } else {
      query = `INSERT INTO ${tableName} (id, name, topic, title, content, want_num, apply_num, start_day, end_day, hit) `;
      query += `VALUES('${userid}', '${username}', '${write_topic}', '${write_title}', '${write_content}', '${write_want_num}', 0, '${regist_day}', '${write_end_day}', 0)`;
      
      const recentNumQuery = `SELECT num FROM ${tableName} ORDER BY num DESC LIMIT 1`;
      const listReadQuery = `SELECT * FROM member WHERE id='${userid}'`;
      const listUpdateQuery = `UPDATE member SET list_num='$list_num' WHERE id='${userid}'`;
    }
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

    if (mode === 'modify') {
      query = `UPDATE ${tableName} SET topic='${modify_topic}', part='${modify_part}', title='${modify_title}', content='${modify_content}', want_num='${modify_want_num}', end_day='${modify_end_day}' WHERE num='${num}'`;
    } else {
      query = `INSERT INTO ${tableName} (id, name, topic, part, title, content, want_num, apply_num, start_day, end_day, hit) `;
      query += `VALUES('${userid}', '${username}', '${write_topic}', '${write_part}', '${write_title}', '${write_content}', '${write_want_num}', 0, '${regist_day}', '${write_end_day}', 0)`;
      
      const recentNumQuery = `SELECT num FROM ${tableName} ORDER BY num DESC LIMIT 1`;
      const listReadQuery = `SELECT * FROM member WHERE id='${userid}'`;
      const listUpdateQuery = `UPDATE member SET list_num='$list_num' WHERE id='${userid}'`;
    }
  }
}
