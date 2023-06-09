import router from "@/router";
import { useUserStore } from "@/stores/user"

export function goToLoginIfNotLoggedIn() {
    const userStore = useUserStore();
    if ((userStore.getUser()).value?.id == undefined) {
        router.push('/login')
    }
}

export function goToRoute(route: string){
    router.push(route);
}

export function goToRouteIfLoggedIn(route: string){
    const userStore = useUserStore();
    if ((userStore.getUser()).value?.id != undefined) {
        router.push(route)
    }
}