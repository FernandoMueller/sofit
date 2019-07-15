module.exports = { 
    dateFormat(date) {    
      let mes = date.getMonth()+1
      let dia = date.getDate()
    
      if ( ( date.getMonth()+1 ) < 10 ) {
        mes = '0'+mes;
      }
      if ( date.getDate() < 10 ) {
        dia = '0'+dia;
      }
      return `${dia}/${mes}/${date.getFullYear()}`;
    },

    dateTranslate(date) {    
      date = date.split('/');
      return `${date[2]}-${date[1]}-${date[0]}`
    },

    addDay(newDate) {
      var date = new Date(newDate.valueOf());
      date.setDate(date.getDate() + 1);
      return date;
    },
    
    arrayConvert(value) {
      let arrayDates = []
      i = 0
      while( i < value.length ) {
        arrayDates[value[i].date.toString()] = value[i].value
        i++
      }
      return arrayDates
    }
  }