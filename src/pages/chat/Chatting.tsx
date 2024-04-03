// import SockJs from 'sockjs-client';
// import StompJs, { Client } from 'stompjs';
//
// function Chatting() {
//   const sock: SockJs = new SockJs('https://api.openmpy.com/api/v1/chats');
//   const stomp: Client = StompJs.over(sock);
//
//   const stompConnect = () => {
//     try {
//       stomp.debug = null;
//       stomp.connect(token, () => {
//         stomp.subscribe(
//           `https://api.openmpy.com/api/v1/chats`,
//           (data) => {
//             const newMessage = JSON.parse(data.body);
//           },
//           token,
//         );
//       });
//     } catch (err) {}
//   };
//
// export default Chatting;
