import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { CheckBox, Icon } from 'react-native-elements';

const Register = ({ navigation }) => {
  const [status, setAccountStatus] = useState("")
  const [check1, setCheck1] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
    phone_number: ''
  })
  const [loading, setLoading] = useState(false)

  const registerTheUser = () => {
    setLoading(true)
    axios.post('https://bst-mcx1.herokuapp.com/users', {
      name: user.username,
      mobile: user.phone_number,
      password: user.password
    }).then(function (res) {
      setLoading(false)
      navigation.navigate("Login")
    }).catch(function (error) {
      setLoading(false)
      alert('You are already registered')
    })
  }

  const log_in = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            <TextInput
              placeholder='Your Username'
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={value => setUser({ ...user, username: value })}
            />
          </View>
          <Text type={Number} style={[styles.text_footer, { marginTop: 35 }]}>
            Phone Number
          </Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            <TextInput
              placeholder='Your Phone Number'
              style={styles.textInput}
              autoCapitalize='none'
              type={Number}
              onChangeText={value => setUser({ ...user, phone_number: value })}
            />
          </View>
          <Text type={Number} style={[styles.text_footer, { marginTop: 35 }]}>
            Choose an Account
          </Text>
          <View style={styles.action}>
            <CheckBox
              center
              title="Demo Account"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />
            <CheckBox
              center
              title="Main Account"
              checked={check1}
              onPress={() => setCheck1(!check1)}
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
              onChangeText={value => setUser({ ...user, password: value })}
            />
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={registerTheUser}
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
                {loading ? <Text>Registering..</Text> : <Text>Sign in</Text>}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>If already registered</Text>
          </View>
          <TouchableOpacity onPress={log_in}>
            <Text>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  )
}

export default Register

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
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  }
})
