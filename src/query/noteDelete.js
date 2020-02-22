export default () => {
  const noteRecvQuery = `DELETE FROM recv_note WHERE idx=${idx}`;
  const noteSendQuery = `DELETE FROM send_note WHERE idx=${idx}`;
}
