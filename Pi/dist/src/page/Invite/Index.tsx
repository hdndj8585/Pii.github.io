import React, { useEffect, useState } from 'react';

import { useAccount, useNetwork } from 'wagmi';
import defaultChainId from '@/config/constants/defaultChainId';
import { Box, Paper } from '@mui/material';
import inviteBg from '@/assets/q/inviteBg.png';
import myInvite from '@/assets/q/myInvite.png';
import pai from '@/assets/q/pai.png';
import back from '@/assets/q/back.png';

import { PrimaryButton } from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGuangTouContract } from '@/hooks/useContract';
import dayjs from 'dayjs';
import { shortAccount } from '@/utils/address';

export default function Invite() {
  const { address } = useAccount();
  const { t } = useTranslation();
  const { chain = { id: defaultChainId } } = useNetwork();

  const history = useHistory();
  const [inviterList, setInviterList] = useState([]);
  const guangTouContract = useGuangTouContract();
  const handleGetMintTime = async () => {
    if (!address) {
      return;
    }

    const inviterList = await guangTouContract.getInviterList(address);
    setInviterList(inviterList);
  };

  useEffect(() => {
    handleGetMintTime();
  }, [address]);

  const time = new Date().getTime();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          background: `url(${inviteBg})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          paddingTop: '15px',
        }}
      >
        <Box
          sx={{ width: '347px', margin: '00px auto 0' }}
          onClick={() => {
            history.push('/');
          }}
        >
          <img style={{ cursor: 'pointer', width: '10px' }} src={back}></img>
        </Box>
        <Box
          sx={{
            background: `url(${myInvite})`,
            backgroundSize: '100% 100%',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
            height: '491px',
            width: '347px',
            margin: '40px auto 0',
            color: '#AD5D27',
            fontWeight: 600,
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              alignItems: 'center',
              width: '308px',
              margin: '0px auto 0',
              padding: '73px 0 9px 0',
            }}
          >
            <Box sx={{ width: '80px' }}>NO.</Box>
            <Box sx={{ width: '80px' }}>Address</Box>
            <Box sx={{ flex: '1' }}>Time</Box>
          </Box>
          <Box sx={{ height: '330px', overflow: 'auto' }}>
            {inviterList.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    alignItems: 'center',
                    width: '308px',
                    margin: '0 auto',
                    borderTop: '1px solid #d98953',
                    padding: '6px 0',
                    position: 'relative',
                  }}
                >
                  {time <= item.mintTime.toString() * 1000 && <img src={pai} style={{ position: 'absolute', left: '5px', width: '20px' }} alt="" />}
                  <Box sx={{ width: '80px' }}>{index + 1}</Box>
                  <Box sx={{ width: '80px' }}>{shortAccount(item.account, 4, 4)}</Box>
                  <Box sx={{ flex: '1' }}>{dayjs(item.mintTime.toString() * 1000).format('YYYY.MM.DD')}</Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
