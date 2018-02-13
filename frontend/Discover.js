import axios from 'axios';

var request=axios({
  url : 'http://127.0.0.1:4040/api/tunnels',
  method: 'get'
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // }
  }
);

request
.then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error);
});
