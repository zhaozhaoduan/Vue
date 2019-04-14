import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tokenStr: '',

  userName: '',
  userPhone: '',
  userUuid: '',
  userHeadPath: '',
  userBirthday: '',
  userIdNum: '',//身份证号码
  userSex: '',//1男，2女

  companyId: '',
  companyName: '',
  companyType: '',

  userRole: ''
}
export const mutations = {
  setTokenStr(state, tokenStr) {//设置tokenStr的值
    state.tokenStr = tokenStr
  },
  setUserUuid(state, userUuid) {
    state.userUuid = userUuid
  },
  setUserInfo(state, userInfo) {
    state.userName = userInfo.userName;
    state.userBirthday = userInfo.dayOfBirth;
    state.userPhone = userInfo.phoneNumber;
    state.userHeadPath = userInfo.headerPath;
    state.userSex = userInfo.sex;
    state.userIdNum = userinfo.idNumber;
    state.companyId = userInfo.companyId;
  },
  setUserRole(state, userRoleStr) {
    state.userRole = userRoleStr;
  },
  setUserCompanyInfo(state, companyInfo) {
    state.companyName = companyInfo.name;
    state.companyType = companyInfo.conpanyType;
  }
}

export default new Vuex.Store({
  state,
  mutations
})