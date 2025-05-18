// import React, { useEffect, useState } from "react";

// const WalletConnect = () => {
//   const [account, setAccount] = useState(null);

//   // Connect wallet when button is clicked
//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("🦊 MetaMask not found! Install it first.");
//       return;
//     }

//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts"
//       });
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error("User rejected connection:", error);
//     }
//   };

//   // Auto-detect connection
//   useEffect(() => {
//     const checkConnection = async () => {
//       if (window.ethereum) {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts"
//         });
//         if (accounts.length > 0) {
//           setAccount(accounts[0]);
//         }
//       }
//     };

//     checkConnection();

//     // Listen for account changes
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setAccount(accounts[0] || null);
//       });
//     }
//   }, []);

//   return (
//     <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//       {account ? (
//         <p>
//           ✅ Connected:{" "}
//           <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong>
//         </p>
//       ) : (
//         <button onClick={connectWallet}>🔗 Connect MetaMask</button>
//       )}
//     </div>
//   );
// };

// export default WalletConnect;


// src/components/WalletConnect.js
import React, { useEffect } from "react";

const WalletConnect = ({ account, setAccount }) => {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("🦊 MetaMask not found! Install it first.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("User rejected connection:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts"
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, [setAccount]);

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {account ? (
        <p>
          ✅ Connected:{" "}
          <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong>
        </p>
      ) : (
        <button onClick={connectWallet}>🔗 Connect MetaMask</button>
      )}
    </div>
  );
};

export default WalletConnect;
