import { SwitchNavigator } from 'react-navigation';
import { OnBoardingStack } from './stackNavigator';
import {AssessmentSuccessStack} from './stackNavigator';
// import {EventAddedStack} from './stackNavigator';
import { Drawer } from './drawerNavigator';
import MemberEvent from '../screens/MemberEvent';
import ListAssessment from '../screens/ListAssessment';
import GiveAssessment from '../screens/GiveAssessment';
import CreateEvent from '../screens/CreateEvent';
import ReviewPlanning from '../screens/ReviewPlanning';
import Details from '../screens/Details';
import Verification from '../screens/Verification';
import Find from '../screens/Find';
import SignUp from '../screens/SignUp';
import Exam from '../screens/Exam';
import UploadCV from '../screens/UploadCV'

export default SwitchNavigator(
  {
    OnBoarding: OnBoardingStack,
    App: Drawer,
    MemberEvent: MemberEvent,
    CreateEvent: CreateEvent,
    ListAssessment: ListAssessment,
    GiveAssessment: GiveAssessment,
    AssessmentSuccess: AssessmentSuccessStack,
    ReviewPlanning : ReviewPlanning,
    Details : Details,
    Verification : Verification,
    Find : Find,
    SignUp : SignUp,
    Exam : Exam,
    UploadCV : UploadCV
  },
  {
    initialRouteName: 'OnBoarding'
  }
);
