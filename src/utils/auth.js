/**
 * @description auth guard
 */
export const checkAuth = {
    isAuthenticated: localStorage.getItem('hcbAdminToken') !== null ? true : false,
    authenticate(cb) {
        this.isAuthenticated = true
        console.log(this.isAuthenticated);
        setTimeout(cb, 100)
    },
    signout(cb) {
        localStorage.removeItem('hcbAdminToken');
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}