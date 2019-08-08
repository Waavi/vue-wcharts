import Vue from 'vue'
import Register from './register'

const install = Register

// Install  library if the user use script src
if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue) {
    install(window.Vue)
}

export * from './loader'

export default install
