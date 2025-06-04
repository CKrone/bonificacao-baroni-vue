import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators'
import {AuthData, ShowMessageMutation, SnackbarMessage} from '@/store/common/types'
import store from '@/store'

@Module({
    name: 'commonModule',
    namespaced: true,
    store,
    dynamic: true
})
class Common extends VuexModule {
    auth: AuthData | null = null
    loadingApp = false
    interval: any = []
    message: SnackbarMessage | null = null

    @Mutation
    showMessage(showMessageMutation: ShowMessageMutation) {
        this.message = {
            ... {
                timeout: 5000,
                type: 'default',
                show: true
            }, ...showMessageMutation,
        }
    }

    @Mutation
    closeMessage() {
        this.message = null
    }

    @Mutation
    clearIntervals() {
        for (const interval in this.interval) {
            window.clearInterval(this.interval[interval])
        }
    }

    @Mutation
    setLoadingApp(status: boolean) {
        this.loadingApp = status
    }
}

export const CommonModule = getModule(Common)
