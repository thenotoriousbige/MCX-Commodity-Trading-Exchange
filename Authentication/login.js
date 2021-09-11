import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
  Button,
  ScrollView,
  AsyncStorage
} from 'react-native'
import * as Animatable from 'react-native-animatable'
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { useportfolioContext } from "../context/Portfolio"

const Login = ({ navigation }) => {
  const { handleLogin
  } = useportfolioContext()
  const [error, setError] = useState(false)
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)

  const Login_user = () => {
    setLoading(true)
    axios
      .post('https://bst-mcx1.herokuapp.com/users/login', {
        mobile: mobile,
        password: password

      })
      .then(async function (res) {
        setLoading(false)
        if (res.data.status === 400) {
          setError(true)
        } else {
          //   alert('logged in successfully!!!')
          await AsyncStorage.setItem('token', res.data.token);
          // Actions.home({token:res.data.token});
          // console.log(navigation.navigate(""));
          console.log("LoggeIN")
          handleLogin()
        }
      })
      .catch(function (error) {
        setLoading(false)
      })
  }

  React.useEffect(() => {
    setTimeout(() => setError(false), 3000)
  }, [error])

  const RegisterPage = () => {
    navigation.navigate("Register")
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>login!</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        {error &&
          <View >
            <Text style={{ textAlign: "center", fontSize: 20, color: "red" }}>*Phonenumber or password is incorrect</Text>
          </View>
        }
        <ScrollView>
          <Text type={Number} style={[styles.text_footer, { marginTop: 35 }]}>
            Phone Number
          </Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            <TextInput
              placeholder='Your Phone Number'
              style={styles.textInput}
              autoCapitalize='none'
              keyboardType="numeric"
              type={Number}
              onChangeText={value => setMobile(value)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35
              }
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name='lock' color='#05375a' size={20} />
            <TextInput
              placeholder='Your Password'
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={value => setPassword(value)}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={Login_user}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 5
                }
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387'
                  }
                ]}
              >
                {loading ? "Wait..." : "SignIn"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('whatsapp://send?phone=+918818881814')
                  .then((data) => {
                  })
                  .catch(() => {
                    alert('Make sure Whatsapp installed on your device');
                  });
              }}
              style={[
                styles.signIn,
                {
                  backgroundColor: "#075E54",
                  borderColor: "#075E54",
                  borderWidth: 1,
                  marginTop: 5
                }
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: 'white',
                    fontWeight: "bold"
                  }
                ]}
              >
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={RegisterPage}>
            <Text style={{ color: '#009387', marginTop: 15 }}>
              Not registered yet?
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </Animatable.View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  // actionError: {
  //     flexDirection: 'row',
  //     marginTop: 10,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#FF0000',
  //     paddingBottom: 5
  // },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
  // button: {
  //     alignItems: 'center',
  //     marginTop: 50
  // },
  // signIn: {
  //     width: '100%',
  //     height: 50,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderRadius: 10
  // },
  // textSign: {
  //     fontSize: 18,
  //     fontWeight: 'bold'
  // }
});
