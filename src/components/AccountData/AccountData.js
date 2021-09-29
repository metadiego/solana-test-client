import './AccountData.css';

const AccountData = ({publicKey, privateKey, balance, parent}) => {

  const copyToClipBoard = (evt) => {
    let copiedText = evt.target.innerText;
    navigator.clipboard.writeText(copiedText);
  }

  return (
    <div className="account-container">
      <div className="account-element">Public Key (click on value to copy):<br/>
        <div className="account-element-value" onClick={(evt) => copyToClipBoard(evt)}>
            {publicKey?.toString()}
        </div>
      </div>
      <div className="account-element">Private Key (click on value to copy):<br/>
        <div className="account-element-value" onClick={(evt) => copyToClipBoard(evt)}>
            {!!privateKey ? JSON.stringify(Array.from(privateKey)).replace(']','').replace('[','') : ''}
        </div>
      </div>
      <div className="account-element">Balance (click on value to copy):<br/>
        <div className="account-element-value" onClick={(evt) => copyToClipBoard(evt)}>
          {balance}
        </div>
      </div>
    </div>
  )
}

export default AccountData;
