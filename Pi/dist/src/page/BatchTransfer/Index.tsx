import React, { useEffect, useState } from 'react';
import { NATIVE } from '@/config/constants/native';
import { useAccount, useNetwork } from 'wagmi';
import defaultChainId from '@/config/constants/defaultChainId';
import { Box, keyframes, Paper } from '@mui/material';
import bg from '@/assets/q/bg.png';
import news from '@/assets/q/news.png';
import invite from '@/assets/q/invite.png';
import lightC from '@/assets/q/lightC.png';
import lightN from '@/assets/q/lightN.png';
import white from '@/assets/q/white.png';
import txSvg from '@/assets/tx.png';

import bnb from '@/assets/q/bnb.png';
import usdt from '@/assets/q/usdt.png';

import loadingIcon from '@/assets/q/loadingIcon.png';
import Countdown from 'react-countdown';

import { PrimaryButton } from '@/components/Button/Button';
import { useGuangTouContract, useUsdtContract } from '@/hooks/useContract';
import queryToStr from 'query-string';
import toast from 'react-hot-toast';
import { handleError } from '@/utils/error';
import copyFc from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Index';
import { accAdd, accDiv, accGt, accGte, accMul, accSub, formatAmount, toFixed } from '@/utils/formatBalance';
import { getGuangTouAddress } from '@/utils/addressHelpers';
import { MaxUint256 } from '@ethersproject/constants';
const mymove = keyframes`
  from {
    transform:rotate(0deg)
  }
  to {
    transform:rotate(360deg)
  }
`;

const Completionist = () => {
  const { t, i18n } = useTranslation();

  return <span style={{ marginTop: '6px' }}>{t('Mint')}</span>;
};

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span style={{ marginTop: '6px', fontSize: '14px' }}>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
export default function BatchTransfer() {
  const { address } = useAccount();
  const { t, i18n } = useTranslation();
  const { chain = { id: defaultChainId } } = useNetwork();
  const [ethAmount, setEthAmount] = useState('0');
  const [tokenAmount, setTokenAmount] = useState('0');
  const [canMint, setCanMint] = useState(false);
  const [inviterList, setInviterList] = useState([]);
  const [balance, setBalance] = useState('0');
  const [tokenType, setTokenType] = useState(true);
  const [loading, setLoading] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [ttttime, setTtttime] = useState('0');
  const [miningTotal, setMiningTotal] = useState(0);

  const history = useHistory();
  const location = useLocation();

  const guangTouContract = useGuangTouContract();
  const usdtContract = useUsdtContract();

  const handleGetInfo = async () => {
    const ethAmount = await guangTouContract._ethAmount();
    setEthAmount(ethAmount.toString());
    const tokenAmount = await guangTouContract._tokenAmount();
    setTokenAmount(tokenAmount.toString());
  };

  const handleInviteList = async () => {
    if (!address) {
      return;
    }

    const inviterList = await guangTouContract.getInviterList(address);
    setInviterList(inviterList);

    const time = new Date().getTime();
    let total = 0;
    for (let i = 0; i < inviterList.length; i++) {
      if (time <= inviterList[i].mintTime.toString() * 1000) {
        total++;
      }
    }
    setMiningTotal(total);
  };

  const handleGetBalance = async () => {
    if (!address) {
      setBalance('0');
      setTtttime('0');

      return;
    }
    const mintTime = await guangTouContract.mintTime(address);
    const time = new Date().getTime();
    setCanMint(time > mintTime.toString() * 1000);
    if (accGt(mintTime.toString() * 1000, time)) {
      const r = accSub(mintTime.toString() * 1000, time);
      setTtttime(accAdd(Date.now(), r));
    } else {
      setTtttime(Date.now() + '');
    }
    const balance = await guangTouContract.balanceOf(address);
    setBalance(balance.toString());
  };

  const handleGetAllowance = async () => {
    if (!address) {
      return;
    }
    if (chain.id === 8989) {
      return;
    }
    const guangTou = getGuangTouAddress(chain.id);
    const status = await usdtContract.allowance(address, guangTou);
    setApproveStatus(accGt(status.toString(), '0'));
  };

  const handleMint = async () => {
    const result: any = queryToStr.parse(location.search);
    const params = result.params;
    let newReferrer = '0x0000000000000000000000000000000000000000';
    if (params?.length == 42) {
      newReferrer = params;
    }
    try {
      setLoading(true);
      const result1 = await guangTouContract.lightningMintETH(newReferrer, {
        value: ethAmount,
      });
      await result1.wait();
      toast.success(t('Mint success'));
      handleGetBalance();
      setLoading(false);
    } catch (e) {
      toast.error(handleError(e));
      setLoading(false);
    }
  };

  const handleMintU = async () => {
    const result: any = queryToStr.parse(location.search);
    const params = result.params;
    let newReferrer = '0x0000000000000000000000000000000000000000';
    if (params?.length == 42) {
      newReferrer = params;
    }

    try {
      setLoading(true);
      const result1 = await guangTouContract.lightningMintU(newReferrer);
      await result1.wait();
      toast.success(t('Mint success'));
      handleGetBalance();
      setLoading(false);
    } catch (e) {
      toast.error(handleError(e));
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!address) {
      return;
    }

    try {
      const guangTou = getGuangTouAddress(chain.id);
      setLoading(true);
      const result = await usdtContract.approve(guangTou, MaxUint256.toString());
      await result.wait();
      toast.success(t('Approve success'));
      setLoading(false);
      handleGetAllowance();
    } catch (e) {
      toast.error(handleError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetInfo();
  }, []);

  useEffect(() => {
    handleInviteList();
    handleGetAllowance();
  }, [address]);

  useEffect(() => {
    handleGetBalance();
  }, [address]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '48px', height: '100%', overflow: 'auto', minHeight: '100%' }}>
      <Header balance={balance}></Header>
      <Box
        sx={{
          background: `url(${bg})`,
          backgroundSize: '375px 431px',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          height: '431px',
          backgroundColor: 'rgb(72,66,132)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '10px',
        }}
      >
        <Box>
          {/* <Box sx={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '17px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img src={white} style={{ width: '22px' }} alt="" />
            <Box sx={{ marginTop: '6px' }}>{t('Paper')}</Box>
          </Box> */}

          <Box
            onClick={() => {
              history.push('/invite');
            }}
            sx={{
              cursor: 'pointer',
              marginTop: '24px',
              fontWeight: 'bold',
              fontSize: '17px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <img src={invite} style={{ width: '22px' }} alt="" />
            <Box sx={{ marginTop: '6px' }}>
              {miningTotal}/{inviterList.length}
            </Box>
          </Box>
          <Box
            onClick={() => {
              if (!canMint) {
                return;
              }

              if (tokenType) {
                handleMint();
              } else {
                if (approveStatus) {
                  handleMintU();
                } else {
                  handleApprove();
                }
              }
            }}
            sx={{
              width: '70px',
              cursor: 'pointer',
              marginTop: '24px',
              fontWeight: 'bold',
              fontSize: '17px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {loading ? (
              <Box
                component="img"
                src={loadingIcon}
                sx={{
                  width: '22px',
                  transform: 'rotate(360deg)',
                  animation: `${mymove} linear 2s infinite`,
                }}
              ></Box>
            ) : (
              <img src={canMint ? lightN : lightC} style={{ width: '22px' }} alt="" />
            )}

            <Countdown date={Number(ttttime)} key={ttttime} renderer={renderer} intervalDelay={1} />
          </Box>
          {chain.id === 8989 && (
            <Box
              onClick={() => {}}
              sx={{
                cursor: 'pointer',
                marginTop: '24px',
                fontWeight: 'bold',
                fontSize: '17px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <img src={txSvg} style={{ width: '22px' }} alt="" />
              <Box sx={{ marginTop: '6px' }}>tx</Box>
            </Box>
          )}
          {chain.id !== 8989 &&
            (tokenType ? (
              <Box
                onClick={() => {
                  setTokenType(!tokenType);
                }}
                sx={{
                  cursor: 'pointer',
                  marginTop: '24px',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img src={bnb} style={{ width: '22px' }} alt="" />
                <Box sx={{ marginTop: '6px' }}>bnb</Box>
              </Box>
            ) : (
              <Box
                onClick={() => {
                  setTokenType(!tokenType);
                }}
                sx={{
                  cursor: 'pointer',
                  marginTop: '24px',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img src={usdt} style={{ width: '22px' }} alt="" />
                <Box sx={{ marginTop: '6px' }}>usdt</Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box
        sx={{
          cursor: 'pointer',
          flex: 1,
          background: '#262440',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              lineHeight: '30px',
            }}
          >
            @PiCoreTeam
          </Box>
          <Box
            sx={{
              fontSize: '13px',
              color: '#E7E7E7',
              lineHeight: '24px',
            }}
          >
            {t(
              'Coin An has launched Web3 mining for Nicolas for many times, and now officially launched bsc chain mining (pi) mine, which is completely decentralized without KYC certification, creating a consensus of 1 π 310000. One 24-hour mining can obtain 0.01 π of air dropped tokens. If you invite the pioneer to participate, you can get 10% of the tokens! The transfer function is expected to be open on Christmas! 1.5 times of mining income can be obtained. 10000 Pioneers will reduce the mining rate'
            )}
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', borderTop: '1px solid #fff', paddingTop: '6px' }}>
          <PrimaryButton
            sx={{ flex: 1, marginRight: '6px' }}
            onClick={() => {
              const result = copyFc(`${window.location.origin}/#/?params=${address}`);
              if (result) {
                toast.success(t('Copy success'));
              } else {
                toast.error(t('Copy error'));
              }
            }}
          >
            <Box>{t('Invite')}</Box>
          </PrimaryButton>
          <PrimaryButton
            sx={{ flex: 1 }}
            onClick={() => {
              const address = getGuangTouAddress(chain.id); //代币地址
              const symbol = 'Pi'; //代币名称(一般都是英文大写)
              const decimals = 18; //写死18
              const image = '';
              window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address,
                    symbol,
                    decimals,
                    image,
                  },
                },
              });
            }}
          >
            <Box>{t('Token wallet')}</Box>
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}
