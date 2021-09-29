import './NetworkConnectionStatus.css';

const NetworkConnectionStatus = ({connection, version}) => {
  return (
    <div className='status-container'>
      <p>Connection Status: {connection ? 'SUCCESS' : 'ERROR'}</p>
      <span className={connection ? 'green-circle' : 'red-circle'}></span>
      <p>{version ? `(Version: ${version['solana-core']})`: ''}</p>
    </div>
  );
}

export default NetworkConnectionStatus;
