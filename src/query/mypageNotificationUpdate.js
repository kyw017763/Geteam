export default () => {
  const noti1Query = `UPDATE member SET noti_ap='${chk1}' WHERE id='${userid}'`;
  const noti2Query = `UPDATE member SET noti_recvap='${chk2}' WHERE id='${userid}'`;
  const noti3Query = `UPDATE member SET noti_vol='${chk3}' WHERE id='${userid}'`;
}
