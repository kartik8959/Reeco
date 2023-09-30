import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // 100% of the viewport height
    }}
  >
    <Spinner animation='border' role='status' style={{ width: '50px', height: '50px' }} />
  </div>
  );
};

export default Loader;