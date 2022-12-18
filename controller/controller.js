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
        let unsortedData = coinData.data
        console.log(coinData.data[0])

        for(let i=0;i<unsortedData.length;i++){
            let coin = {
                symbol:unsortedData[i].symbol,
                name:unsortedData[i].name,
                marketCapUsd:unsortedData[i].marketCapUsd,
                priceUsd:unsortedData[i].priceUsd
            }
           await model.findOneAndUpdate({symbol:unsortedData[i].symbol},coin,{upsert:true,new:true})

        }
       

        let sortedData = (unsortedData).sort((a,b)=>a.changePercent24Hr - b.changePercent24Hr)
        console.log(sortedData[0])
        console.log(sortedData.length)
        res.status(200).send({ status: true,msg: coinData })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getcoin = getcoin
