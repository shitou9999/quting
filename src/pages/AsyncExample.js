/**
 * Created by PVer on 2018/9/23.
 */


// async修饰函数会自动转为Promise对象
function pm() {
    return new Promise((resolve,reject)=>{
        resolve('我是promise返回值')
    })
}

async function test() {
    let a = await pm()
    let b = await '等待一个字符串，我是立即返回的'
    return a+b
}

//示例函数
function timeOut(ms) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('error')
        },ms)
    })
}

// 错误处理01
async function asyncPrint(ms) {
    try {
        await timeOut(ms)
    } catch (err) {
        //能够捕捉到Promise对象rejected的数据或者抛出的异常
    }
}
// 错误处理02
async function asyncPrint2() {
    await timeOut(100)
    //如果有错误发生下面的都不被执行
}

asyncPrint2().catch(err=>{
    //async函数执行后返回一个promise
})

//错误处理03

async function asyncPrint3() {
    console.log('start')
    await timeOut(100).catch(err=>{
        console.log(err)
    })
    console.log('这句代码会被执行')
}

//多个await命令的异步操作，如果不存在依赖关系（后面的await不依赖前一个await返回的结果），用Promise.all()让它们同时触发
function test01() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('test01')
        },100)
    })
}

function test02() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('test02')
        },100)
    })
}

async function exc1() {
    let res1 = await test01()
    let res2 = await test02() //不依赖res1的值
}

async function exc2() {
    let [res1,res2] = await Promise.all([test01(),test02()])

}




















