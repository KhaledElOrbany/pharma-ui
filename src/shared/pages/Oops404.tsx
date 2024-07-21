import { Link } from 'react-router-dom';

export default function Oops404() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src='/illustrations/404.svg'
        alt='404'
        style={{
          height: 260,
        }}
      />

      <Link to='/'>Home Page</Link>
    </div>
  );
}
