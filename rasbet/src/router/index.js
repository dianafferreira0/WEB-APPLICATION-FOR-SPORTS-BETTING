import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Settings from '../views/Settings.vue'
import Transactions from '../views/Transactions.vue'
import BetHistory from '../views/BetHistory.vue'
import Deposit from '../views/Deposit.vue'
import Withdrawal from '../views/Withdrawal.vue'
import Admin from '../views/Admin.vue'
import PayBet from '../views/PayBet.vue'
Vue.use(VueRouter)

/*    
    beforeEnter: (to, from, next) => { 
      var expirationDate = this.$store.getters.expirationDate
      if(!expirationDate) next()
      else if(new Date(expirationDate) > new Date())
      next({ name: 'Home' })
          else
          next()
    }
    }*/
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,

    
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/bethistory',
    name: 'BetHistory',
    component: BetHistory
  }, 
  {
    path: '/deposit',
    name: 'Deposit',
    component: Deposit
  }, 
  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: Withdrawal
  },
  {
    path: '/paybet',
    name: 'PayBet',
    component: PayBet
  }
  
]

const router = new VueRouter({
  routes
})

export default router
