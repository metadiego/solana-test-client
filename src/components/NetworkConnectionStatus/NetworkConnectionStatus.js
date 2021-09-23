import './NetworkConnectionStatus.css';

const NetworkConnectionStatus = ({connection}) => {
  return (
    <div className='status-container'>
      <p>Devenet Connection Status: {connection ? 'SUCCESS' : 'ERROR'}</p>
      <span className={connection ? 'green-circle' : 'red-circle'}></span>
    </div>
  );
}

export default NetworkConnectionStatus;
