import React, { useState } from 'react';
import { Box, Drawer, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { MyConnectButton } from '@/components/Button/Button';
import more from '@/assets/q/more.png';
import home from '@/assets/q/home.png';
import mainnet from '@/assets/q/mainnet.png';
import app from '@/assets/q/app.png';
import browser from '@/assets/q/browser.png';
import transfer from '@/assets/q/transfer.png';
import get from '@/assets/q/get.png';
import team from '@/assets/q/team.png';
import role from '@/assets/q/role.png';
import problem from '@/assets/q/problem.png';
import node from '@/assets/q/node.png';
import white from '@/assets/q/white.png';
import wiki from '@/assets/q/wiki.png';
import he from '@/assets/q/he.png';
import chat from '@/assets/q/chat.png';
import info from '@/assets/q/info.png';
import lang from '@/assets/q/lang.png';

import { RowBetween } from '../Row';
import { useHistory } from 'react-router-dom';
import { formatAmount, toFixed } from '@/utils/formatBalance';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

const menuList = [
  { name: '首页', url: '/', icon: home },
  { name: 'Mainnet', url: '/', icon: mainnet },
  { name: 'Pi Browser', url: '/', icon: browser },
  { name: 'Pi 实用程序', url: '/', icon: app },
  { name: 'Pi 转账', url: '/', icon: transfer },
  { name: '获取 Pi', url: '/', icon: get },
  { name: '推广团队', url: '/', icon: team },
  { name: '角色', url: '/', icon: role },
  { name: '聊天', url: '/', icon: chat },
  { name: '节点', url: '/', icon: node },
  { name: '常见问题解答', url: '/', icon: problem },
  { name: '白皮书', url: '/', icon: white },
  { name: 'Pi 社区维基（Wiki）', url: '/', icon: wiki },
  { name: '核心团队', url: '/', icon: he },
  { name: '个人资料', url: '/', icon: info },
];

export default function Header({ balance }) {
  const _language = localStorage.getItem('language');
  const list = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'zh' },
    { label: 'Korean', value: 'ko' },
  ];
  const findIndex = list.findIndex((item) => {
    return item.value == _language;
  });

  const [active, setActive] = useState(findIndex == -1 ? 0 : findIndex);
  const { address } = useAccount();
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    setActive(value);
    localStorage.setItem('language', list[value].value);
    i18n.changeLanguage(list[value].value);
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        background: '#000',
        padding: '6px 8px',
        position: 'fixed',
        left: '0',
        top: 0,
        width: '100%',
        zIndex: 999,
      }}
    >
      <RowBetween>
        <Box
          onClick={(e) => {
            handleClick(e);
          }}
          sx={{ fontWeight: 'bold', fontSize: '17px', display: 'flex', alignItems: 'center' }}
        >
          <img src={lang} style={{ marginRight: '5px', width: '22px' }} alt="" />
          <Box sx={{}}>{list[active].label}</Box>
        </Box>

        <Box sx={{ fontSize: '18px' }}>{toFixed(formatAmount(balance), 5)}</Box>
        <MyConnectButton sx={{ height: '100%' }}></MyConnectButton>
      </RowBetween>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleSelect(0);
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(1);
          }}
        >
          中文
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect(2);
          }}
        >
          Korean
        </MenuItem>
      </Menu>
    </Box>
  );
}
