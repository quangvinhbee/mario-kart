import { ethers } from 'ethers'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import socketClient from 'socket.io-client'
import { useAccount, useBalance } from 'wagmi'
import Web3 from 'web3'
// import Web3 from 'web3'
// import Web3 from 'web3'

// ================== CONFIG NEED CHANGE ================== //
const poolAddress = '0x3Bf94dc672FD09Ed167A955f03Bd70A78E802e5D'
const tokenAddress = '0x7FC09A4F6182E835A97c42980F7235E8C0cBfa56' // mCarrot
const chain = 'bsc testnet'

const apiURL = 'http://localhost:7007'
const socketServer = 'http://localhost:7008'
// const apiURL = 'https://api.xwizard.io'
// const socketServer = 'https://ws.xwizard.io'
const digit = 9

const toastOption: any = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}

export const MarioContext = createContext<{
  depositHandler?: any
  withdrawHandler?: any
  betHandler?: any
  gameLogout?: any
  typeDialog?: any
  setTypeDialog?: any
  rollCountDown?: any
  currentRate?: any
  bigB?: any
  userBalance?: any
  bankRoll?: any
  bettingValue?: any
  setBettingValue?: any
  currentGameJoiners?: any
  autoCash?: any
  setAutoCash?: any
  activeType?: any
  setActiveType?: any
  playing?: any
  depositLoad?: any
  withdrawLoad?: any
  refreshBalance?: any
  recentGame?: any
  liveChat?: any
  onChat?: any
  userCashout?: any
  balanceXWizard?: any
}>({})

export function MarioProvider(props: any) {
  let currentG: any[] = []
  let uCashout: any[] = []
  const [currentRate, setCurrentRate] = useState<any>(0)
  const [connectedUser, setCuser] = useState<any>()
  const [sSocketServer, setSocket] = useState<any>()
  const [bigB, setBigb] = useState('Play')
  const [playing, setPlaying] = useState(true)
  const [isSigned, setIsSigned] = useState(false)
  const [balanceXWizard, setBalanceXWizard] = useState(0)

  // const [mainProvider, setProvider] = useState();
  const [secretKey, setSecretKey] = useState('')
  const [bigBdisable, setbigBdisable] = useState(false)
  const [balanceLoad, setBalanceLoad] = useState(false)
  const [balancePre, setBalancePre] = useState(0)
  const [depositLoad, setDepositLoad] = useState(false)
  const [withdrawLoad, setWithdrawLoad] = useState(false)
  const [currentGameJoiners, setJoiners] = useState<any>()
  const [activeType, setActiveType] = useState('manual')
  const [userBalance, setUserBalance] = useState(0)
  const [bankRoll, setBankRoll] = useState<any>()
  const [rollCountDown, setRollCountdown] = useState<any>()

  const [bettingValue, setBettingValue] = useState(0)
  const [autoCash, setAutoCash] = useState(0)
  const [recentGame, setRecentGame] = useState([])
  const [liveChat, setLiveChat] = useState([])
  const [userCashout, setUserCashout] = useState<any>([])

  const [typeDialog, setTypeDialog] = useState<'DEPOSIT' | 'WITHDRAW'>(null)
  const { address, isConnected } = useAccount()

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('xwizard-crash')) {
      const currentUser = JSON.parse(localStorage.getItem('xwizard-crash'))
      setCuser(currentUser)
    }
  }, [])

  useEffect(() => {
    // if (activeType === 'auto') {
    //   document.querySelectorAll('.play-button')[0].click()
    // }
  }, [rollCountDown])

  useEffect(() => {
    refreshBalance()
  }, [connectedUser])

  // SOCKET
  useEffect(() => {
    const socket = socketClient(socketServer)
    setSocket(socket)
    socket.emit('join')
    socket.on('chatting', (data: any) => {
      try {
        if (data) setLiveChat([...data])
      } catch (e) {
        console.log(e)
      }
    })
    socket.on('currentx', (data: any) => {
      // if (autoCash > 1 && autoCash <= data) {
      //   if (autoCash == data) {
      //     document.querySelectorAll('.play-button')[0].click()
      //   }
      // }

      if (data.toString().includes('mCarrot')) {
        setCurrentRate(data?.replace('mCarrot', 'Win at '))

        // document.querySelectorAll('.current-x-text')[0].classList.add('color-red')
        // document.querySelectorAll('.current-x-text')[1].classList.add('color-red')
      } else {
        setCurrentRate(data)
        if (bigB === 'Play') {
          setBigb('Cashout')
        }
      }
    })

    socket.on('recent-game', (data: any) => {
      setRecentGame(data)
    })

    socket.on('user-cashout', (data: any) => {
      console.log('user-cashout', data)
    })

    socket.on('game-status', (data: any) => {
      console.log(data)
      if (data === 'waiting') {
        currentG = []
        setJoiners(currentG)
        uCashout = []
        setUserCashout(uCashout)
        setbigBdisable(false)
        setBigb('Play')
        setPlaying(false)
      } else if (data === 'started') {
        setbigBdisable(false)
        setBigb('Cashout')
        setPlaying(true)
      }
    })

    socket.on('user-placed', (data: any) => {
      let existingBool = false
      let existingIndex = 0
      currentG.map((v, i) => {
        if (v.wallet === data.wallet && data.bet) {
          existingBool = true
          existingIndex = i
        }
      })

      if (existingBool && data?.bet) {
        currentG[existingIndex] = {
          ...currentG[existingIndex],
          type: 'cash-out',
          currentX: data.currentX,
        }
      } else {
        currentG.push(data)
      }
      // currentG.push(data)
      setJoiners(currentG)
      existingIndex = 0
      if (data.win) {
        uCashout.forEach((v, i) => {
          if (v.wallet === data.wallet && data.bet) {
            existingIndex = i
          }
        })
        if (!existingIndex) {
          uCashout.push(data)
          //   setUserCashout([...new Set(uCashout)])
        }
      }
    })

    socket.on('count-down', (data: any) => {
      setRollCountdown(data)
    })
  }, [])

  const depositHandler = async (value: any) => {
    setDepositLoad(true)
    try {
      //   const amount = value
      //   const provider = new ethers.providers.Web3Provider(window.ethereum)
      //   await window.ethereum.enable()
      //   const signer = provider.getSigner()
      //   const contract = new ethers.Contract(tokenAddress, ABI_ERC20, signer)
      //   console.log('contract', contract)
      //   const result = await contract.transfer(poolAddress, Moralis.Units.Token(amount, digit)).send({
      //     from: address,
      //     // gasLimit: '100000',
      //   })
      //   if (result) {
      //     setDepositLoad(false)
      //     // $('.close-button').trigger('click')
      //     toast.success('Waiting for confirmation...', toastOption)
      //   }
    } catch (err) {
      setDepositLoad(false)
      console.log(err)
      if (err.code) {
        toast.error(err.message, toastOption)
      } else {
        toast.success('Waiting for confirmation...', toastOption)
      }
    }
    setTypeDialog(null)
    // dispatch(handleUpdateSetting('' as any))
  }

  const withdrawHandler = async (value: any) => {
    const userAddress = address
    setWithdrawLoad(true)

    const req = await fetch(`${apiURL}/cashOut`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cashoutAmount: value,
        sign: secretKey,
        wallet: userAddress,
      }),
    })
    toast.success('Waiting for confirmation...', toastOption)
    const data2 = await req.json()

    if (data2 && data2.result.hash) {
      toast.success(`Withdraw success.`, toastOption)
      refreshBalance()
    } else if (data2 && data2.result) {
      toast.success('Waiting Transaction', toastOption)
    }
    // $('.close-button').trigger('click')
    setWithdrawLoad(false)
    setTypeDialog(null)
    // dispatch(handleUpdateSetting('' as any))
  }

  const refreshBalance = async () => {
    if (!connectedUser?.secret) return
    setBalanceLoad(true)
    const req2 = await fetch(`${apiURL}/getBalance`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sign: connectedUser?.secret,
      }),
    })
    const data2 = await req2.json()

    console.log('data2', data2)
    if (data2?.error) {
      localStorage.removeItem('xwizard-crash')
      // window.location.reload()
    } else {
      let bal = data2?.balance
      let temp = Number(bal - Number(userBalance))
      console.log(`+ ${temp.toLocaleString('en')}`, bal, userBalance)
      if (temp > 1) {
        toast(`+ ${temp.toLocaleString('en')}`, {
          duration: 4000,
          position: 'top-center',
          // Styling
          className: 'text-current-rate text-[32px] z-[10000]',
          style: {
            color: '#ed7b24',
            backgroundColor: 'none',
          },
          // Custom Icon
          icon: '👏',
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        })
      } else if (Number(temp) < -1) {
        toast(`Betting ${temp.toLocaleString('en')}`, {
          duration: 4000,
          position: 'top-center',
          className: 'text-current-rate text-[32px] z-[10000]',
          // Styling
          style: {
            color: '#ff0303',
            backgroundColor: 'none',
          },
          // Custom Icon
        })
      }
      console.log(Number(data2?.balance).toFixed(2))
      // setUserBalance(Number(Number(data2?.balance).toLocaleString('en')))
      setUserBalance(Number(Number(data2?.balance).toFixed(2)))
    }
    setBalanceLoad(false)
  }

  const betHandler = async (bettingValue: any) => {
    if (bigB === 'Play') {
      setbigBdisable(true)
      sSocketServer.emit('placeBet', {
        secret: connectedUser?.secret,
        betAmount: bettingValue,
      })

      setTimeout(() => {
        refreshBalance()
      }, 1000)
      setBigb('Cashout')
    } else if (bigB === 'Cashout') {
      setbigBdisable(true)
      sSocketServer.emit('cashOut', {
        secret: connectedUser?.secret,
      })
      console.log('Cashout')
      setTimeout(() => {
        refreshBalance()
      }, 1000)
      setBigb('Play')
    }
  }

  const onChat = async (body: any) => {
    if (body == '') toast.error('Chat not empty')
    const userAddress = address
    sSocketServer.emit('chatting', {
      wallet: userAddress,
      body,
    })
  }

  const gameLogout = () => {
    localStorage.removeItem('xwizard-crash')
    // logout()
  }

  const getData = async () => {
    const userAddress = address
    console.log(address)
    const req = await fetch(`${apiURL}/nonce`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet: userAddress?.toLowerCase(),
      }),
    })
    const nonce_data = await req.json()
    console.log('nonce_data', nonce_data)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const signature = await signer.signMessage(nonce_data.nonce)
    // const web3 = new Web3(Web3.givenProvider)
    // const signature = await web3.eth.personal.sign(nonce_data.nonce, userAddress, '')
    const req2 = await fetch(`${apiURL}/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sign: signature,
        wallet: userAddress,
      }),
    })
    setSecretKey(signature)
    const data2 = await req2.json()
    if (data2?.secret) {
      setCuser(data2)
      localStorage.setItem('xwizard-crash', JSON.stringify(data2))
    }
  }

  async function getBalanceXWizard() {
    try {
      //   const web3 = new Web3('https://ethereum.publicnode.com')
      //   console.log(ABI_ERC20)
      //   const contractToken = new web3.eth.Contract(ABI_ERC20 as any, tokenAddress)
      //   let balanceWei = await contractToken.methods.balanceOf(address).call()
      //   let balance = web3.utils.fromWei(`${balanceWei}`, 'gwei')
      //   console.log('balance', balance)
      //   setBalanceXWizard(Number(balance))
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    // getData()
    // if (isConnected) {
    //   getData()
    //   getBalanceXWizard()
    //   refreshBalance()
    // }
  }, [isConnected, address])
  return (
    <MarioContext.Provider
      value={{
        depositLoad,
        withdrawLoad,
        depositHandler,
        withdrawHandler,
        betHandler,
        gameLogout,
        liveChat,
        typeDialog,
        setTypeDialog,
        rollCountDown,
        currentRate,
        refreshBalance,
        bigB,
        userBalance,
        bankRoll,
        bettingValue,
        setBettingValue,
        currentGameJoiners,
        autoCash,
        setAutoCash,
        activeType,
        setActiveType,
        playing,
        recentGame,
        onChat,
        userCashout,
        balanceXWizard,
      }}
    >
      {props.children}
    </MarioContext.Provider>
  )
}

export const useCrash = () => useContext(MarioContext)
