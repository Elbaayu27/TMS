import React from 'react';
import { TabNavigator } from 'react-navigation';
import { HomeStack, UploadPhotoStack, HistoryStack, AccountStack } from './stackNavigator';
import TabBarBottom from '../components/elements/TabBarBottom';
import TabBarIcon from '../components/elements/TabBarIcon';
import Home from '../../assets/svgs/Home';
import Add from '../../assets/svgs/Add';
import Love from '../../assets/svgs/Love';
import Account from '../../assets/svgs/Account';

const COLOR_DARK_GREY = '#797979';
const COLOR_GREEN = '#1ea54f';
const COLOR_GREY = '#bdbdbd';
const COLOR_WHITE = '#ffffff';

//Custom Icon
const home = require('../../assets/images/home.png');
const service = require('../../assets/images/pencil.png');
const guarantee = require('../../assets/images/handshake.png');
const account = require('../../assets/images/account.png');

const createTab = ({ stack, label, image, iconStyle, badge }) => ({
  screen: stack,
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: label,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        isActive={tintColor === COLOR_GREEN}
        label={label}
        icon={tintColor === COLOR_GREEN ? image.active : image.inactive}
        iconStyle={[iconStyle, { height: 30, width: 30, tintColor }]}
        badge={badge}
        navigation={navigation}
      />
    )
  })
});

const navigatorConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  backBehavior: true,
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: COLOR_GREEN,
    inactiveTintColor: COLOR_GREY,
    style: {
      borderTopWidth: 0,
      justifyContent: 'space-between',
      backgroundColor:  '#175873',
      height: 60
    },
    labelStyle: {
      color: COLOR_DARK_GREY
    },
    tabStyle: {},
    indicatorStyle: {
      backgroundColor: '#175873'
    }
  }
};

const createTabNavigator = (tabDefinations = []) => {
  const tabs = tabDefinations.map(createTab);
  return new TabNavigator(tabs, navigatorConfig);
};

export const AppStack = createTabNavigator([
  {
    label: 'Home',
    stack: HomeStack,
    image: {
      // active: <Home active />,
      // inactive: <Home />
      active : home,
      inactive : home
    }
  },
  {
    label: 'Exam',
    stack: UploadPhotoStack,
    image: {
      // active: <Add active />,
      // inactive: <Add />
      active : service,
      inactive: service
    }
  },
  {
    label: 'Hired',
    stack: HistoryStack,
    image: {
      // active: <Love height={40} width={40} active />,
      // inactive: <Love height={40} width={40} />
      active : guarantee,
      inactive: guarantee
    },
    badge: 'none'
  },
  {
    label: 'Account',
    stack: AccountStack,
    image: {
      // active: <Account active />,
      // inactive: <Account />
      active : account,
      inactive: account
    }
  }
]);

export default { AppStack };
