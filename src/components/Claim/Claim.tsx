import React, { useState, useEffect } from 'react';
import './ClaimStyles.css';
import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers';
declare let window: any;
const { ethereum } = window;

const Claim = () => {
  const [metamaskInstalled, setMetamaskedInstalled] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [noClaim, setNoClaim] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        setMetamaskedInstalled(false);
      } else {
        setMetamaskedInstalled(true);
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
          setUserAddress(accounts[0]);
        } else {
          console.log('No accounts found!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask!');
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setUserAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  };

  const getReimbursementBalance = async () => {
    const contract = getContract();
    if (userAddress) {
      const balance = await contract._dues[userAddress];
      return await balance;
    }
  };

  getReimbursementBalance();

  return (
    <main>
      <section className='claim__container'>
        {userAddress === null ? (
          <div className='claim_message-container'>
            <div>
              <div className='claim_message'>
                <div>
                  <p>
                    Connect your wallet in order to claim your $PING rewards
                  </p>
                </div>
                <div className='connect_button'>
                  <button onClick={connectWallet}>Connect your wallet</button>
                </div>
                {!metamaskInstalled && (
                  <div>
                    <p>Note: Install metamask to claim</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='claim_card-container'>
            <div>
              <div className='claim_card'>
                <div>
                  <p>{claimed ? 'You claimed' : 'Available to claim'}</p>
                </div>
                <div>
                  <p className='claim_balance'>1,000,000.00</p>
                  <p className='claim_token'>$PING</p>
                </div>
                <div>
                  <p className={'address'}>{`${userAddress.slice(
                    0,
                    8
                  )}...${userAddress.slice(
                    userAddress.length - 4,
                    userAddress.length
                  )}`}</p>
                </div>
                <div>
                  <>
                    {!claimLoading && !claimed && !noClaim && (
                      <button>Claim</button>
                    )}
                  </>
                  <>{claimLoading && <button>Claiming...</button>}</>
                  <>{claimed && <button>Transactions</button>}</>
                  <>{noClaim && <button>Not Correct?</button>}</>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Claim;
