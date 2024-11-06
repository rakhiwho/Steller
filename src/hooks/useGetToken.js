import { useCookies } from 'react-cookie';

export function UseGetToken() {
  const [cookies , ] = useCookies(['access_token']);

 
  const token = cookies.access_token ? ` ${cookies.access_token}` : '';
      
    
  return { headers: { Authorization: token } };
}