const api = require('../utils/api')
const dates = require('../utils/dates')

var prices,
    supplies,
    spents,
    dateInitial,
    priceDateInitial,
    suppliesDateInitial,
    spentsDateInitial,
    priceDateFinal,
    suppliesDateFinal,
    spentsDateFinal,
    initDate,
    finalDate,
    pricesData,
    suppliesData,
    spentsData

module.exports = {
  consumeDay() {
     api.get('prices').then( response => {
        prices = JSON.parse(response);
        priceDateInitial = dates.dateTranslate(prices[0].date)
        priceDateFinal = dates.dateTranslate(prices.slice(-1)[0].date)
        pricesData = dates.arrayConvert(prices)
        
        api.get('supplies').then( response => {
            supplies = JSON.parse(response)
            suppliesDateInitial = dates.dateTranslate(supplies[0].date)
            suppliesDateFinal = dates.dateTranslate(supplies.slice(-1)[0].date)
            suppliesData = dates.arrayConvert(supplies)
            
            api.get('spents').then( response => {
                spents = JSON.parse(response)
                spentsDateInitial = dates.dateTranslate(spents[0].date)
                spentsDateFinal = dates.dateTranslate(spents.slice(-1)[0].date)
                spentsData = dates.arrayConvert(spents)
                
                this.getDates(priceDateInitial, suppliesDateInitial, spentsDateInitial, priceDateFinal, suppliesDateFinal, spentsDateFinal ).then( response => {
                     api.post(response).then( res => {
                        return `${res.body}%`
                    }).catch( error => {
                        console.log(error)
                    })
                }).catch( e => {
                    console.log("Erro ", e)
                })
            })
            .catch( e => {
                console.log("Erro ", e)
            })
        })
        .catch( e => {
            console.log("Erro ", e)
        })
        })
        .catch( e => {
        console.log("Erro ", e)
        })
    },
            
    getDates(priceDateInitial, suppliesDateInitial, spentsDateInitial, priceDateFinal, suppliesDateFinal, spentsDateFinal){
        console.log("-----------------------------------")
        return new Promise((resolve, reject)=>{
            if(!priceDateInitial || !suppliesDateInitial || !spentsDateInitial){
                reject('Init date error')
            } else{
                dateInitial = [priceDateInitial, suppliesDateInitial, spentsDateInitial]
                    dateInitial.sort()
                    initDate = dateInitial[0]
                }
            if(!priceDateFinal || !suppliesDateFinal || !spentsDateFinal){
                reject('Final date error')
            } else{
                lastDates = [priceDateFinal, suppliesDateFinal, spentsDateFinal]
                lastDates.sort()
                finalDate = lastDates[2]
            }
            if(initDate && finalDate){
                resolve(this.calcConsume(initDate,finalDate))
            }
       })
    },

    calcConsume(initDate, finalDate) {
        let listData = []
        let consume = 10
        let finalOver = 0

        return new Promise((resolve, reject)=>{

        if( !initDate || !finalDate ) {
            reject('Init and final date error')
        } else {
            i = 0
            currentDate = new Date(dates.dateTranslate(initDate))
            stopDate = new Date(dates.dateTranslate(finalDate))

            while(currentDate <= stopDate) {
                currentDateFormatted = dates.dateFormat(new Date(currentDate))

                if( pricesData[currentDateFormatted] ) {
                currentPrice = Number(Number.parseFloat(pricesData[currentDateFormatted]).toFixed(2))
                }
                if( suppliesData[currentDateFormatted] ) {
                hasSupplies = Number(Number.parseFloat(suppliesData[currentDateFormatted]).toFixed(2)) / currentPrice
                }else {
                hasSupplies = 0
                }
                if( spentsData[currentDateFormatted] ) {
                gasSpent = Number(Number.parseFloat(spentsData[currentDateFormatted]).toFixed(3)) / Number(Number.parseFloat(consume).toFixed(2))
                }else {
                gasSpent = 0
                }
                finalOver = Number(Number.parseFloat(finalOver).toFixed(2)) + Number(Number.parseFloat(hasSupplies).toFixed(2)) - Number(Number.parseFloat(gasSpent).toFixed(2))
                
                listData[i] = {
                "date": currentDateFormatted,
                "value": Number(Number.parseFloat(finalOver).toFixed(2))
                }
                        
                currentDate = dates.addDay(currentDate);
                i++
            }
    
        }
        console.log("listData")
        resolve(listData)
        })
    }
}