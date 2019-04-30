import Mock from 'mockjs'
let Random = Mock.Random
let hotData = () => {
    let hotDataList = []
    for (let i = 0; i < 10; i++) {
        let hotproduct = {
            title:Random.ctitle(5,20),
            img:Random.dataImage('300x250','农机'+Random.integer(1,100)),
            price:Random.integer(1000,10000),
            name:Random.cname()
        }
        hotDataList.push(hotproduct)
    }
    return hotDataList
}
let  recommendData = () => {
    let  recommendDataList = []
    for (let i = 0; i < 20; i++) {
        let  recommendproduct = {
            title:Random.ctitle(5,20),
            img:Random.dataImage('180x150','你好'+Random.integer(1,100)),
            price:Random.integer(1000,10000),
            name:Random.cname()
        }
        recommendDataList.push( recommendproduct)
    }
    return  recommendDataList
}
Mock.mock('http://www.mt.com/getHotItem', hotData)
Mock.mock('http://www.mt.com/getRecommendItem', recommendData)