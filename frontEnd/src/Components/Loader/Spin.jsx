import ReactLoading from 'react-loading';

const Spin = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={25} width={25} />
);

export default Spin;