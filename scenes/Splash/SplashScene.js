import React, { PureComponent } from 'react'
import { View, StyleSheet, Animated, StatusBar } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import images from '../../assets/images/images'
import dimensions from '../../utils/dimensions'
import User from '../../store/User'
import { COLORS } from '../../utils/styles';
import AuthService from '../../api/auth';
import  { SessionManager }  from '../../api/sessionManager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.APP_BACKGROUND,
  },
  logo: {
    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT,
  },
  appText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'blue',
  }
})

export default class SplashScene extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.oauthToken()

    this.openScreenAfter(1000)
    this.setState({isLoading: false})
    Animated.timing(this.state.opacity, {
      duration: 10000,
      toValue: 1,
    }).start()
    StatusBar.setHidden(false, 'slide')
  }
  

  componentWillUnmount() {
    this._isMounted = false;
  }

oauthToken() {
  this.setState({ isLoading: true}, () => {
    AuthService.oauthToken().then((response) => {
      console.log('======>>>>> SPLASH', response)
      if (response.data && response.data.status === 'error' && response.data.message) {
        // Alert.alert('PERHATIAN!!', Respon data ,PERHATIAN!!)
        return
      }
      if (response.data) {
        SessionManager.setUserToken(response.data.access_token);
      }
    }).catch((error) => {
      console.log('!!!!!!!!! ', error)
    }).finally(() => this.setState({ isLoading: false }))
  })
}

  openScreenAfter(seconds) {
    setTimeout(() => {
      let resetScreen = 'Login'
      if (User.isAvailable) {
       resetScreen = 'Home'
      }
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: resetScreen,
          params: { loogInUserType: ''  },
           }),
        ],
        key: null,
      })
      this.props.navigation.dispatch(resetAction)
    }, seconds)
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image style={[styles.logo, { opacity: this.state.opacity }]} source={images.splash} resizeMode="cover" />
      </View>
    )
  }
}
