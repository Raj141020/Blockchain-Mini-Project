let axios = require("axios")
let model = require("../model/model")

const getcoin = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://api.coincap.io/v2/assets',
            headers: {
                Authorization: "Bearer 0c1b3579-0f88-431b-9f4f-9002774aa7d7",
              }
        
        }
        let result = await axios(options);
        let coinData = result.data
        let sortedData = coinData.data
        console.log(coinData.data[0])
        let len = (coinData.data).length
        console.log(len)

            const deletedbData = await model.deleteMany()
            const createData = await model.create(coinData.data)

        let a = (sortedData).sort((a,b)=>a.changePercent24Hr - b.changePercent24Hr)
        // console.log(a.length)
        res.status(200).send({ status: true,msg: coinData })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getcoin = getcoin
