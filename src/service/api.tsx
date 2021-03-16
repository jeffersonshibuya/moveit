import axios from 'axios';

// const token = process.env.NEXT_PUBLIC_AUTH0_TOKEN


// export default function API(): AxiosInstance {
//   const api = axios.create({
//     baseURL: 'https://dev-3u-20hx6.us.auth0.com/api/v2/'
//   })
//   return api;
// }

const api = axios.create({
  baseURL: 'https://moveit.haruo.dev/'
})

export default api;