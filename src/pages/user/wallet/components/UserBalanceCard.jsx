/* eslint-disable react/prop-types */
// src/MoneyBalanceCard.js

import styled from 'styled-components';
import Currency from "react-currency-formatter";
import CargBg from '../../../../assets/images/cardbg.png'
// background: url('https://source.unsplash.com/featured/?cute') no-repeat center center;
const Card = styled.div`
  width: 350px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #2d2f31;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: #fff;
  position:relative;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const Balance = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const BgImage = styled.img`
  position: absolute;
  width: 50%
  height: 50%
  top: 0;
  right: 0;
`;

const MoneyBalanceCard = ({ balance, fromAdmin }) => {
  return (
    <Card>
      <Header>
        <Title>Balance</Title>
      </Header>
      <BgImage src={CargBg} alt='bg' className=' -rotate-90 z-1 blur-3xl'/>
      <BgImage src={CargBg} alt='bg' className=' -rotate-90 opacity-20 -top-24 '/>
      <Balance className=' z-10'>
         <Currency
              quantity={Number(balance) || 0}
              currency="NGN"
            />
        </Balance>
        {
          fromAdmin ?
      <Footer className=' z-10'>
    
      </Footer> : 
      <Footer className=' z-10'>
        <Button>Deposit</Button>
        <Button>Withdraw</Button>
      </Footer>
        }
    </Card>
  );
};

export default MoneyBalanceCard;
