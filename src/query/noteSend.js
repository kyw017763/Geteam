export default () => {
  const noteSendQuery = `INSERT INTO note_send VALUES(null, '${write_recv}', '${write_send}', '${write_content}', '${regist_day}')`;
  const noteRecvQuery = `INSERT INTO note_recv VALUES(null, '${write_recv}', '${write_send}', '${write_content}', 0, '${regist_day}')`;
}
