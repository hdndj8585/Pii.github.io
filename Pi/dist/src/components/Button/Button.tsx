import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, BoxProps } from '@mui/material';
import btnLoading from '@/assets/img/btnLoading.png';
import { Loading } from './Loading/Loading';
import { shortAccount } from '@/utils/address';
import down from '@/assets/q/down.png';

const ButtonStyle = styled(Button)<ButtonProps>({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '4px 6px',
  lineHeight: 1.5,
  background: `#564527`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  height: '36px',
  color: '#221307',
  borderRadius: '5px',
  fontWeight: 'bold',
  '&.Mui-disabled': {
    cursor: 'pointer',
    color: '#221307',
  },
  '&:hover': {
    opacity: 1,
    background: `#13110D`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
  '> *': {
    userSelect: 'none',
  },
});

const PrimaryStyle = styled(ButtonStyle)<ButtonProps>({
  background: `#E1E1E1`,
  '&:hover': {
    background: `#E1E1E1`,
  },
});

export const PrimaryButton = ({ loading, children, ...rest }: { loading?: boolean; altDisabledStyle?: boolean } & ButtonProps) => {
  if (loading) {
    return (
      <PrimaryStyle {...rest} disabled={true}>
        <Loading icon={btnLoading} width="25px"></Loading>
      </PrimaryStyle>
    );
  } else {
    return <PrimaryStyle {...rest}>{children}</PrimaryStyle>;
  }
};

const DangerButtonStyle = styled(ButtonStyle)<ButtonProps>({
  background: `#ff5349`,
  '&:hover': {
    background: `#ff5349`,
  },
});

export const DangerButton = ({ loading, children, ...rest }: { loading?: boolean; altDisabledStyle?: boolean } & ButtonProps) => {
  if (loading) {
    return (
      <DangerButtonStyle {...rest} disabled={true}>
        <Loading icon={btnLoading} width="25px"></Loading>
      </DangerButtonStyle>
    );
  } else {
    return <DangerButtonStyle {...rest}>{children}</DangerButtonStyle>;
  }
};

const InfoButtonStyle = styled(ButtonStyle)<ButtonProps>({
  background: `#fff`,
  color: '#333',
  '&:hover': {
    background: `#fff`,
  },
});

export const InfoButton = ({ loading, children, ...rest }: { loading?: boolean; altDisabledStyle?: boolean } & ButtonProps) => {
  if (loading) {
    return (
      <InfoButtonStyle {...rest} disabled={true}>
        <Loading icon={btnLoading} width="25px"></Loading>
      </InfoButtonStyle>
    );
  } else {
    return <InfoButtonStyle {...rest}>{children}</InfoButtonStyle>;
  }
};

export const MyConnectButton = ({ ...rest }: BoxProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        return (
          <Box
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            {...rest}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return <PrimaryButton onClick={openConnectModal}>Connect</PrimaryButton>;
              }

              if (chain.unsupported) {
                return <DangerButton onClick={openChainModal}>Wrong network</DangerButton>;
              }

              return (
                <div style={{ display: 'flex' }}>
                  <InfoButton onClick={openChainModal} sx={{ marginRight: '4px', display: 'flex', width: '10px !important' }}>
                    {chain.hasIcon && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        {chain.iconUrl && <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 24, height: 24 }} />}
                        <img src={down} style={{ marginLeft: '10px', width: 12, height: '12px' }} />
                      </div>
                    )}
                  </InfoButton>
                  <InfoButton onClick={openAccountModal}>{shortAccount(account.address, 4, 2)}</InfoButton>
                </div>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
