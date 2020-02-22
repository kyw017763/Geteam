export default () => {
  const query = `UPDATE member SET name='${name}', s_num='${s_num}', interest1='${interest1}', interest2='${interest2}', interest3='${interest3}', profile='${profile}' WHERE id='${userid}'`;
}