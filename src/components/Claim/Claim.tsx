import React, { useState } from 'react';
import './ClaimStyles.css';
import { contractABI, contractAddress } from '../utils/constants';
import { ethers } from 'ethers';

const Claim = () => {
  //set to true if wallet is connected
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  //set to true if the balance is claimed
  const [claimed, setClaimed] = useState(false);

  // set to true when the claim() function is called and yet to be fulfilled
  const [claimLoading, setClaimLoading] = useState(false);

  // set to true of balance is Zero
  const [noClaim, setNoClaim] = useState(true);

  // push the user's wallet address to this state
  const [userAddress, setUserAddress] = useState<string>('');

  return (
    <main>
      <section className='claim__container'>
        {!isWalletConnected ? (
          <div className='claim_message-container'>
            <div>
              <div className='claim_message'>
                <div>
                  <p>
                    Connect your wallet in order to claim your $PING rewards
                  </p>
                </div>
                <div className='connect_button'>
                  <button>Connect your wallet</button>
                </div>
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
