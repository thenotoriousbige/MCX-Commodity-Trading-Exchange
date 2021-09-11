import * as React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData, removeValue } from "../utils/storage"
import axios from "axios"

const defaultState = {
     userdata: 0,
}


export const portfolioContext = React.createContext(defaultState)

export const PortfolioProvider = ({ children }) => {
     const [cred, setCred] = React.useState({
          token: "",
          name: "",
          permanent_balance: 0,
          mobile: "",
          balance: null,
          Active_pl: 10,
          Ledger_balance: 0,
          user: null,
          M2m: 0,
          ids: [],
          Margin_available: 0,
          Active: [],
          Closed: [],
     })
     const [buy_price, setBuy_price] = React.useState(0)
     const [refresh, setRefresh] = React.useState(false)
     const [socketid, setSocketId] = React.useState([]);

     const handleRefresh = () => {
          console.log("Fetched New Data ✅")
          setRefresh(!refresh)
     }
     const checkStorage = async () => {
          const { token, status } = await getData()
          if (status) {
               setCred({ ...cred, token: token })
               fetchData(token)
          } else {
               setCred({ ...cred, user: false })
          }
     }
     const handleLogout = async () => {
          await removeValue().then(() => {
               setCred({
                    ...cred, user: false
               })
               console.log("✅ User Logged out Successfully")
          })
     }

     const handleLogin = () => {
          setCred({
               ...cred, user: true
          })
          handleRefresh()
          console.log("🚀 Welcome to Home")
     }

     const fetchData = async (token) => {
          if (token !== "") {
               axios('https://bst-mcx1.herokuapp.com/users/me', {
                    method: 'GET',
                    headers: {
                         "Authorization": `Bearer ${token}`,
                         'Accept': 'application/json',
                         'Content-Type': 'application/json'
                    }
               }).then(result => {
                    if (result.status === 200) {
                         setSocketId(result.data.ids)
                         setCred(
                              {
                                   ...cred,
                                   token: token,
                                   permanent_balance: result.data.data.permanent_balance,
                                   name: result.data.data.name,
                                   ids: result.data.ids,
                                   mobile: result.data.data.mobile,
                                   balance: result.data.data.balance,
                                   Active_pl: result.data.data.Active_pl,
                                   Ledger_balance: result.data.data.Ledger_balance,
                                   M2m: result.data.data.M2m,
                                   Margin_available: result.data.data.Margin_available,
                                   Active: result.data.data.trades.Active,
                                   Closed: result.data.data.trades.Closed,
                                   user: true
                              })
                    } else {
                         console.log("I am cll")
                         handleLogout()
                    }
               })
                    .catch((err) => {
                         handleLogout()
                    })
          } else {
          }
     }
     React.useEffect(() => {
          checkStorage()
     }, [refresh])

     const deleteToken = async () => {
          setCred({
               token: ""
          })
          await removeValue()
     }

     const addToken = async (token) => {
          setCred({ ...cred, token: token })
          await storeData(token)
     }
     return (
          <portfolioContext.Provider value={{ cred, handleLogout, handleLogin, socketid, buy_price, addToken, deleteToken, handleRefresh }}>
               {children}
          </portfolioContext.Provider>
     )
}

export const useportfolioContext = () => {
     const data = React.useContext(portfolioContext)
     return data
}