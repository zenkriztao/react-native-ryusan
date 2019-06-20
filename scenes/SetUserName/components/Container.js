import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AuthService from '../../../api/auth'
import images from '../../../assets/images/images'
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import BackNew from '../../../components/BackNew';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 80,
    marginLeft: 20,
  },
  backView: {
    width: dimensions.SCREEN_WIDTH,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    top: 12,
    left: 0
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 8,
    fontFamily: "GoogleSans-Regular",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: COLORS.APP_BORDER,
  },
  buttonText: {
    color: COLORS.APP_BORDER,
    fontSize: 18,
    marginHorizontal: 20,
    fontFamily: "GoogleSans-Regular",
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: "GoogleSans-Regular",
    marginTop: 5,
  },
  inputView: {
    width: dimensions.SCREEN_WIDTH * 0.7 + 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 20,
  },
  inputCover: {
    flex: 1,
    backgroundColor: '#eeeeee',
    padding: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  inputStyle: {
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 15,
    textAlign: 'left',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "GoogleSans-Regular",
  },
  statusImage: {
    width: 35,
    height: 35,
    marginLeft: 8,
  },
  messageText: {
    color: '#cccccc',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 25,
    fontFamily: "GoogleSans-Regular",
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userName: '',
      userNameAvailable: false,
      referalCode: '',
    }
  }

  checkUserName(userName) {
    AuthService.checkUserName(userName).then((response) => {
      if (response.data && response.data.status === 'success') {
        if (this.state.userName.length <= 4) {
          this.setState({ userNameAvailable: false })
          return
        }
        this.setState({ userNameAvailable: true })
      }
      if (response.data && response.data.status === 'error') {
        this.setState({ userNameAvailable: false })
      }
    }).catch((error) => {
    })
  }

  userNameVerified() {
    if (this.state.userName === '' || !this.state.userNameAvailable) {
      Alert.alert('PERHATIAN', '\nMohon Masukkan \n\nNama Pengguna Dengan Benar')
      return
    }
    this.props.updateUserName(this.state.userName, this.state.referalCode)
  }

  render() {
    const { userName, isLoading, userNameAvailable, referalCode } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.signUpBg} style={styles.container} resizeMode="cover">
          <Text style={styles.headerText}>Isi Data Lengkap</Text>
          <View style={styles.inputView}>
            <View style={styles.inputCover}>
              <TextInput
                keyboardType="default"
                placeholder="Masukkan Nama Pengguna"
                placeholderTextColor="lightgrey"
                style={styles.inputStyle}
                value={userName}
                onChangeText={text => {
                  this.setState({ userName: text })
                  if (text === '') return
                  this.checkUserName(text)
                }}
                autoCorrect={false}
                autoCapitalize="none"
                selectionColor="lightgrey"
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
            {userName !== '' && !isLoading &&<Image source={userNameAvailable ? images.ok : images.cancel} style={styles.statusImage} resizeMode="contain" />}
          </View>
          <Text
            style={[styles.detailText, { color: userNameAvailable ? 'white' : 'red' }]}
          >
          {userName !== '' && !isLoading ?
            userNameAvailable ? 'Nama Ini Bisa Digunakan' : 'Maaf Nama Ini Sudah Ada' : ' '}</Text>
          <View style={[styles.inputCover, { flex: null, marginTop: 15 }]}>
              <TextInput
                keyboardType="default"
                placeholder="Kata Sandi"
                placeholderTextColor="lightgrey"
                style={[styles.inputStyle, { flex: null, width: dimensions.SCREEN_WIDTH * 0.7 }]}
                value={referalCode}
                onChangeText={text => this.setState({ referalCode: text })}
                autoCorrect={false}
                autoCapitalize="none"
                selectionColor="lightgrey"
                returnKeyType="done"
                underlineColorAndroid="transparent"
              />
            </View>
            <Text style={styles.messageText}>{'Dengan Ini Kamu Setuju Dengan Ketentuan dan Peraturan yang Berlaku'}</Text>
        </ImageBackground>
        <View style={styles.backView}>
          <BackNew action={() => this.props.navigation.goBack()} />
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!userNameAvailable}
            style={styles.button}
            onPress={() => this.userNameVerified()}>
            <Text style={styles.buttonText}>Berikutnya</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
