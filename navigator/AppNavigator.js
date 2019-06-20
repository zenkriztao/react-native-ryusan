import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import {MultiBar, MultiBarToggle} from 'react-native-multibar';
import { Image } from 'react-native';
import dimensions from "../utils/dimensions";
import Splash from "../scenes/Splash/SplashScene";
//import {Routes} from "./Routes";
// Auth
import Login from "../scenes/Login/LoginScene";
import VerifyOTP from "../scenes/VerifyOTP/VerifyOTPScene";
import SetUserName from "../scenes/SetUserName/SetUserNameScene";
import NotificationVerification from "../scenes/NotificationVerification/NotificationVerification";

// Home
import Home from "../scenes/Home/HomeScene";
import Webview from "../webview";
// List
import List from "../scenes/List/List";
//Cash Out
import CashOut from "../scenes/CashOut/CashOut";
import About from "../scenes/About/About";

// Leaderboard
import Leaderboard from "../scenes/Leaderboard/LeaderboardScene";

// Settings
import Settings from "../scenes/Settings/SettingsScene";

// Game On
import GameOn from "../scenes/GameOn/GameOnScene";

// HowToPlay
import HowTOPlay from "../scenes/HowTOPlay/HowTOPlay";

// Submit Trivia
import SumbitTrivia from "../scenes/SumbitTrivia/SumbitTrivia";

import Winners from "../scenes/Winners/WinnersScene";

const appNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="bookmark"
                color={tintColor}
                size={26}
            />
        )
    })
},
Webview:  {
    screen: Webview,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="heart"
                color={tintColor}
                size={26}
            />
        )
    })
},
MultiBar: {
    screen: () => null,
    navigationOptions: ({navigation}) => ({
        tabBarIcon: () => (
            <MultiBarToggle
                navigation={navigation}
                actionSize={26}
                routes={[
                    {
                        
                        color: '#FF8360',
                        icon: (
                            <Icon
                                name="rocket"
                                color="#333333"
                                size={20}
                            />
                        )
                    },
                    {
                        color: '#E8E288',
                        icon: (
                            <Icon
                                name="dashboard"
                                color="#333333"
                                size={20}
                            />
                        )
                    },
                    {
                        color: '#7DCE82',
                        icon: (
                            <Icon
                                name="gears"
                                color="#333333"
                                size={20}
                            />
                        )
                    },
                ]}
                icon={(
                    <Icon
                        name="plus"
                        color="#FFFFFF"
                        size={26}
                    />
                )}
            />
        )
    }),
    params: {
        navigationDisabled: true
    }
},
Settings:  {
    screen: Settings,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="lock"
                color={tintColor}
                size={26}
            />
        )
    })
},
GameOn:  {
    screen: GameOn,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="user"
                color={tintColor}
                size={26}
            />
        )
    })
}
}, {
tabBarComponent: MultiBar,
tabBarOptions: {
    showLabel: false,
    activeTintColor: '#F8F8F8',
    inactiveTintColor: '#586589',
    style: {
        backgroundColor: '#171F37'
    },
    tabStyle: {}
}
});

const autNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    key: 'Splash',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Login,
    key: 'Login',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  VerifyOTP: {
    screen: VerifyOTP,
    key: 'VerifyOTP',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SetUserName: {
    screen: SetUserName,
    key: 'SetUserName',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  NotificationVerification: {
    screen: NotificationVerification,
    key: 'NotificationVerification',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

  CashOut: {
    screen: CashOut,
    key: 'CashOut',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  About: {
    screen: About,
    key: 'About',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Leaderboard: {
    screen: Leaderboard,
    key: 'Leaderboard',
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  Settings: {
    screen: Settings,
    key: 'Settings',
    navigationOptions: {
      header: null,
      gesturesEnabled: true,
    },
  },
  
  GameOn: {
    screen: GameOn,
    key: 'GameOn',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  HowTOPlay: {
    screen: HowTOPlay,
    key: 'HowTOPlay',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SumbitTrivia: {
    screen: SumbitTrivia,
    key: 'SumbitTrivia',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Winners: {
    screen: Winners,
    key: 'Winners',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
})

const rootNavigator = createSwitchNavigator(
  {
    autNavigator: {
      screen: autNavigator,
      key: null,
      navigationOptions: {
        header: null
      }
    },
    appNavigator: {
      screen: appNavigator,
      key: null,
      navigationOptions: {
        header: null
      }
    }
  },
 
);



export default createAppContainer(rootNavigator);
