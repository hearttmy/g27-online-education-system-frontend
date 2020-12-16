import { StudentProvider } from './src/student'
import { TeacherProvider } from './src/teacher'

const UserProvider = {
  login: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.login(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.login(payload)
    }
  },

  register: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.register(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.register(payload)
    }
  },

  logout: (userType) => {
    if (userType === 'STU') {
      return StudentProvider.logout()
    } else if (userType === 'TCH') {
      return TeacherProvider.logout()
    }
  },

  changeAvatar: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.changeAvatar(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.changeAvatar(payload)
    }
  },

  changePW: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.changePW(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.changePW(payload)
    }
  },

  getMyCourses: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.getMyCourses(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.getMyCourses(payload)
    }
  },

  getMyArticles: (userType, payload) => {
    if (userType === 'STU') {
      return StudentProvider.getMyArticles(payload)
    } else if (userType === 'TCH') {
      return TeacherProvider.getMyArticles(payload)
    }
  }
}

export {
  UserProvider,
  StudentProvider,
  TeacherProvider
}