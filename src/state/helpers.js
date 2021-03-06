import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader,
    themeDarkMode: (state) => state.themeDarkMode,
  })
}
export const loading = {
  ...mapState('loading', {
    loading: (state) => state.loading
  })
}
export const blockchain = {
  ...mapState('blockchain', {
    blockchain: (state) => state.blockchain,
    currentNet: (state) => state.currentNet,
  })
}
export const account = {
  ...mapState('account', {
    currentAccount: (state) => state.currentAccount,
    currentAccountChainName: (state) => state.currentAccountChainName,
    allSelectedAccount: (state) => state.allSelectedAccount,
  })
}
export const globalReload = {
  ...mapState('globalReload', {
    globalReload: (state) => state.globalReload,
  })
}
export const currentPageTitle = {
  ...mapState('currentPageTitle', {
    currentPageTitle: (state) => state.currentPageTitle,
    currentPageItems: (state) => state.currentPageItems,
  })
}
export const avatar = {
  ...mapState('avatar', {
    avatar: (state) => state.avatar,
  })
}



export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword'])

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 'changeLoaderValue'])

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout'])

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])

export const todoComputed = {
  ...mapState('todo', {
    todos: (state) => state.todos
  })
}
export const todoMethods = mapActions('todo', ['fetchTodos'])