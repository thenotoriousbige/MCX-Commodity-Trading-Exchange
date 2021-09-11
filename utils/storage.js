import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      return {status : true , token : value}
    } else {
      return {status : false , token : null}
    }
  } catch (e) {
    return {status : false , token : null}
    // error reading value
  }
}


export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('token', value)
  } catch (e) {
    // saving error
  }
}

export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (e) {
    // remove error
  }

  console.log('Done.')
}