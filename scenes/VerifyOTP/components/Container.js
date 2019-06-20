import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import images from '../../../assets/images/images'
import LinearGradient from 'react-native-linear-gradient';
import dimensions from '../../../utils/dimensions'
import { COLORS } from '../../../utils/styles';
import BackNew from '../../../components/BackNew';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backView: {
    width: dimensions.SCREEN_WIDTH,
    height: 64,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    top: 5,
    left: 0
  },
  headerText: {
    color: COLORS.APP_BORDER,
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: "GoogleSans-Regular"
    // marginBottom: 10
  },
  button: {
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_RED,
    borderWidth: 1,
    borderColor: COLORS.APP_BORDERNEXT
  },
  buttonText: {
    color: COLORS.APP_BORDER,
    fontSize: 18,
    marginHorizontal: 20,
    fontFamily: "GoogleSans-Regular"
    
  },
  detailText: {
    color: COLORS.APP_WHITE,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 30,
    fontFamily: "GoogleSans-Regular",
    marginBottom: 20,
    marginTop: 120
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
    top: 10
  },
  inputStyle: {
    width: dimensions.SCREEN_WIDTH * 0.7,
    height: Platform.select({ ios: 40, android: 45 }),
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.APP_BACKGROUND,
    fontFamily: "GoogleSans-Regular",
  },  
  messageText: {
    color: '#cccccc',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 30,
    fontFamily: "GoogleSans-Regular",
    color: COLORS.APP_WHITE
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_BORDER,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: COLORS.APP_BORDER,
  },
})

export default class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      otp: '',
    }
  }

  checkValidations(otp) {
    // TO DO Change
    if (otp.length !== 4 || isNaN(Number(otp))) {
      Alert.alert('PERHATIAN', '\nMasukkan 4 Kode Angka \n\nYang Telah Dikirim')
      return
    }
    this.props.verifyOTP(otp)
  }

  render() {
    const { otp } = this.state
    const { phone, countryCode } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={images.loginBG} style={styles.container} resizeMode="cover">
        <Text style={styles.detailText}>{ `Mohon Masukkan Kode Verifikasi Yang Dikirim Ke Nomor \n${countryCode}${phone}`}</Text>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Kode Verifikasi 4 Digit"
              placeholderTextColor="lightgrey"
              style={styles.inputStyle}
              value={otp}
              maxLength={4}
              onChangeText={text => this.setState({ otp: text })}
              autoCorrect={false}
              autoCapitalize="none"
              selectionColor="lightgrey"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.messageText}>{'Dengan Ini Anda Setuju Dengan Syarat Dan Ketentuan Kami'}</Text>
        </ImageBackground>
        <View style={styles.backView}>
          <BackNew action={() => this.props.navigation.goBack()} />
          <Text style={styles.headerText}>Kode Verifikasi</Text>
          
          <TouchableOpacity activeOpacity={0.7} style={styles.gradient} onPress={() => this.checkValidations(otp)}>
            <Text style={styles.buttonText}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
