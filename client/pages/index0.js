// // export default () => {
// //     return <h1>Landing Page</h1>
// // }
// import axios from 'axios';
// const LandingPage = ({ currentUser }) => {
//   console.log('We are on browser');
//   //  axios.get('/api/users/currentuser');
//   console.log(currentUser);
//   return <h1>Landing Page</h1>;
// };

// LandingPage.getInitialProps = async ({ req }) => {
//   try {
//     if (typeof window === 'undefined') {
//       // we are on the server
//       // const { data } = axios.get('http://SERVICENAME.NAMESPACE.svc.cluster.local');
//       const { data } = await axios.get(
//         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//         {
//           headers: req.headers,
//         },
//       );
//       return data;
//     } else {
//       // we are on the browser!
//       // requests can be made to a base url of ''
//       const { data } = await axios.get('/api/users/currentuser');
//       return data;
//     }
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export default LandingPage;
