/**
 * 全局唯一的Loading显示隐藏工具类。
 * import LoadingUtil from "./LoadingUtil";
 *       <LoadingModal ref={ref => global.loading = ref}/>
 * @type {{showLoading(*=): void, dismissLoading(): void}}
 */

let Loading = {
    showLoading(timeOut = 30000) {
        global.loading && global.loading.onShow()
        this.timerLoading = setTimeout(() => {
            this.disLoading();
        }, timeOut)
    },
    disLoading() {
        global.loading && global.loading.onClose()
        this.timerLoading && clearTimeout(this.timerLoading)
    },
}

export default Loading
