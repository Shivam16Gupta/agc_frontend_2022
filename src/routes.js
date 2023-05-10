import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import { ROLES_KEY } from './constants/Constants'
import asyncComponent from './layouts/AsyncComponent'

const MakePayment = asyncComponent(() =>
  import('./views/StudentSrc/MakePayment')
)
const Summary = asyncComponent(() => import('./views/StudentSrc/Summary'))
const PaymentHistory = asyncComponent(() =>
  import('./views/StudentSrc/PaymentHistory')
)
const Form = asyncComponent(() => import('./views/StudentSrc/Form/Form'))
const FormSubmitted = asyncComponent(() =>
  import('./views/StudentSrc/FormSubmitted')
)

const dashboardRoutes = [
  {
    path: '/payment',
    name: 'Make Payment',
    id: 'sPayment',
    icon: DynamicFeedIcon,
    component: MakePayment,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
  },
  {
    path: '/summary',
    name: 'Summary',
    id: 'sSummary',
    icon: DynamicFeedIcon,
    component: Summary,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
  },
  {
    path: '/paymenthistory',
    name: 'Payment History',
    id: 'sPaymentHistory',
    icon: DynamicFeedIcon,
    component: PaymentHistory,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
  },
  {
    path: '/form',
    name: 'Form',
    id: 'sForm',
    icon: DynamicFeedIcon,
    component: Form,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
  },
  {
    path: '/formsubmitted',
    name: 'Form Submitted',
    id: 'sFormSubmit',
    icon: DynamicFeedIcon,
    component: FormSubmitted,
    layout: '/student',
    role: [ROLES_KEY.STUDENT],
  },
]

export default dashboardRoutes
