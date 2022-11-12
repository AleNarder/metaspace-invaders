export const pipeAsync = <Fn extends (...args: any[]) => any>(...fns: Fn[]) => async (param: any) => {
    let res = param
    for (const fn of fns) {
        res = await fn(res)
    }
}