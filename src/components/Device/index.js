import { useEffect } from "react";
import { gql, useMutation } from '@apollo/client';
import {
  browserName,
  isBrowser,
  isMobile,
  isTablet,
  deviceDetect,
  mobileModel
} from "react-device-detect";
import { format } from "date-fns";

export function Device() {

  const CREATE_SESSION = gql`
  mutation createAcesso($data: AcessoCreateInput!) {
    createAcesso(data: $data) {
      id
    }
  }
`
  const [addSession, { loading }] = useMutation(CREATE_SESSION, {
    onCompleted: response => {
      localStorage.setItem('request', JSON.stringify(format(new Date(), 'dd/MM/yyyy')));
    }
  });

  useEffect(() => {
    if (localStorage.getItem('request') !==  JSON.stringify(format(new Date(), 'dd/MM/yyyy'))) {
      let device;
      if (!loading) {
        switch (true) {
          case isBrowser:
            device = 'Browser ' + browserName;
            break;
          case isMobile:
            device = 'Mobile ' + mobileModel;
            break;
          case isTablet:
            device = 'Tablet ';
            break;
          default:
            device = 'no detected';
        }

        addSession({
          variables: {
            data: {
              device: device,
              data: new Date(new Date().valueOf() - new Date().getTimezoneOffset() * 60000)
            }
          }
        })
      }
    }
  }, []);


  return <div />;
}

export default Device;




