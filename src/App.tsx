import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { useEffect } from "react";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();
  console.log(network);
  console.log(CHAIN.TESTNET);

  useEffect(() => {
    // Initialize Telegram Web Apps SDK
    if (window.Telegram) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleHelloButtonClick = () => {
    if (window.Telegram) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user) {
        console.log("Telegram User Contact: ", user);
        alert(`Telegram User: ${user.first_name} ${user.last_name}, Username: ${user.username}`);
      } else {
        alert("Unable to fetch Telegram user contact information.");
      }
    } else {
      alert("Mainnet is not connected.");
    }
  };
  

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
            <Button onClick={handleHelloButtonClick}>PEllo</Button>
          </FlexBoxRow>
          <Counter />
          <TransferTon />
          <Jetton />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
