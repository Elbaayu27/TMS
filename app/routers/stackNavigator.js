import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import UploadPhoto from '../screens/UploadPhoto';
import History from '../screens/History';
import Account from '../screens/Account';
import OnBoarding from '../screens/OnBoarding';
import MemberEvent from '../screens/MemberEvent';
import CreateEvent from '../screens/CreateEvent';
import ListAssessment from '../screens/ListAssessment';
import GiveAssessment from '../screens/GiveAssessment';
import Verification from '../screens/Verification';
import Find from "../screens/Find";
import AssessmentSuccess from '../screens/AssessmentSuccess';
import SignUp from '../screens/SignUp';
import Exam from '../screens/Exam';

export const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const FindStack = StackNavigator(
  {
    Find: {
      screen: Find,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const ExamStack = StackNavigator(
  {
    Exam: {
      screen: Exam,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const SignUpStack = StackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const UploadPhotoStack = StackNavigator(
  {
    UploadPhoto: {
      screen: UploadPhoto,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const HistoryStack = StackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const AccountStack = StackNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const OnBoardingStack = StackNavigator(
  {
    OnBoarding: {
      screen: OnBoarding,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);
//Tambahan
// export const MemberEventStack = StackNavigator(
//   {
//     MemberEvent: {
//       screen: MemberEvent,
//       navigationOptions: {
//         tabBarVisible: false
//       }
//     }
//   },
//   { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
// );
// export const CreateEventStack = StackNavigator(
//   {
//     CreateEvent: {
//       screen: CreateEvent,
//       navigationOptions: {
//         tabBarVisible: false
//       }
//     }
//   },
//   { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
// );

// export const ListAssessmentStack = StackNavigator(
//   {
//     ListAssessment:{
//       screen: ListAssessment,
//       navigationOptions:{
//         tabBarVisible: false
//       }
//     }
//   },
//   {headerMode:'none', navigationOptions: {tabBarVisible:false} }
// );

// export const GiveAssessmentStack = StackNavigator(
//   {
//     GiveAssessment:{
//       screen: GiveAssessment,
//       navigationOptions:{
//         tabBarVisible: false
//       }
//     }
//   },
//   {headerMode:'none', navigationOptions: {tabBarVisible:false} }
// );

export const AssessmentSuccessStack = StackNavigator(
  {
    AssessmentSuccess:{
      screen: AssessmentSuccess,
      navigationOptions:{
        tabBarVisible: false
      }
    }
  },
  {headerMode:'none', navigationOptions: {tabBarVisible:false} }
);

export const VerificationStack = StackNavigator(
  {
    Verification:{
      screen: Verification,
      navigationOptions:{
        tabBarVisible: false
      }
    }
  },
  {headerMode: 'none', navigationOptions: {tabBarVisible:false} }
);
