import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuthStatus = () => {
  const user = useSelector((state) => state.auth.user); 

  const [isLogin, setIsLogin] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setCheckStatus(false);
  }, [user]);

  return { isLogin, checkStatus };
};

export default useAuthStatus;
