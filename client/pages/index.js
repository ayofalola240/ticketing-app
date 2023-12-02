// export default () => {
//     return <h1>Landing Page</h1>
// }
import axios from 'axios';
const LandingPage = ({ currentUser }) => {
  console.log('We are on browser');
  //  axios.get('/api/users/currentuser');
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  try {
    if (typeof window === 'undefined') {
      console.log('We are on server');
      // we are on the server
      //  requests should be made to http://ingress-nginx.ingress-nginx

      // const { data } = axios.get('http://SERVICENAME.NAMESPACE.svc.cluster.local');
      const { data } = await axios.get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
        {
          headers: {
            Host: 'ticketing.dev',
          },
        },
      );
      console.log(data);
      return data;
    } else {
      // we are on the browser!
      // requests can be made to a base url of ''
      const { data } = await axios.get('/api/users/currentuser');
      return data;
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export default LandingPage;
