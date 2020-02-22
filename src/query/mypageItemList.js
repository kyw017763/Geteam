export default () => {
  const studyListQuery = `SELECT * FROM study WHERE id='${userid}' ORDER BY num DESC`;
  const contestListQuery = `SELECT * FROM contest WHERE id='${userid}' ORDER BY num DESC`;
}