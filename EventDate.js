module.exports = {
    get: function(timezone, receive){
        try{
            var date = new Date().toLocaleString("en-US", {timeZone: timezone});
            date = new Date(date);
            
            var HOUR = date.getHours();
            var MINUTE = date.getMinutes();
            var SECOND = date.getSeconds();
            var DATE = date.getDate();
            var MONTH = date.getMonth()+1;
            var YEAR = date.getFullYear();

            function setZeroChar(number){
                var received = number.toString();
                if(received.length== 1){
                    received = "0"+number;
                }
                return received;
            }

            var resultVal = "00";

            if(receive.toLowerCase() == "hour") {
                resultVal = setZeroChar(HOUR);
            }
            else if(receive.toLowerCase() == "minute") {
                resultVal = setZeroChar(MINUTE);
            }
            else if(receive.toLowerCase() == "second") {
                resultVal = setZeroChar(SECOND);
            }
            else if(receive.toLowerCase() == "day") {
                resultVal = setZeroChar(DATE);
            }
            else if(receive.toLowerCase() == "month") {
                resultVal = setZeroChar(MONTH);
            }
            else if(receive.toLowerCase() == "year"){
                resultVal = setZeroChar(YEAR);
            }
            
            return resultVal;
        }catch(e){
            return;
        }
    }
}