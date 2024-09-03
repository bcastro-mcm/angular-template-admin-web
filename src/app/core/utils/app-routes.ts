export class AppRoutes {
    static readonly auth = "auth"
    static readonly recovery_password = "/auth/recovery-password"
    static readonly home = "home"
    static readonly dashboard = "dashboard"
    static readonly dashboard_analytical = "dashboard/analytical"
    static readonly dashboard_analytical_home= "home/dashboard/analytical"
    static readonly users ="users"

    static readonly notifications = "notifications"

    static readonly points = "points"
    static readonly list_levels = "home/points"
    static readonly add_level = "home/points/add-level"
    static readonly edit_level = (id:string) => `home/points/edit-level/${id}`

    static readonly about_app = "about-app"

    static readonly store = "stores"
    static readonly list_stores = "home/stores"
    static readonly add_store = "home/stores/add-store"
    static readonly edit_store = (id:string) => `home/stores/edit-store/${id}`


    static readonly onboarding = "onboarding"
    static readonly list_onboarding = "home/onboarding"
    static readonly add_onboarding = "home/onboarding/add-onboarding"
    static readonly edit_onboarding = (id:string) => `home/onboarding/edit-onboarding/${id}`
}

export class RouterComponents {
    static readonly login = "login"
    static readonly recovery_password = "recovery-password"
    static readonly dashboard_analytical = "analytical"
    static readonly users_add = "add"
    static readonly user_admin = "admin"
    static readonly add_level = "add-level"
    static readonly edit_level = "edit-level/:id"

    static readonly add_onboarding = "add-onboarding"
    static readonly edit_onboarding = "edit-onboarding/:id"

    static readonly add_store = "add-store"
    static readonly edit_store = "edit-store/:id"

}
