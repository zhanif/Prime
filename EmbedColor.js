require('dotenv')

module.exports = {
    set: function(target_Color){
        if(typeof(target_Color) == undefined) return;
        try{
            var value = "#FFFFFF";
            if(target_Color.toUpperCase() == "RED"){
                value = process.env.CRED;
            }
            else if(target_Color.toUpperCase() == "ORANGE"){
                value = process.env.CORANGE;
            }
            else if(target_Color.toUpperCase() == "YELLOW"){
                value = process.env.CYELLOW;
            }
            else if(target_Color.toUpperCase() == "GREEN"){
                value = process.env.CGREEN;
            }
            else if(target_Color.toUpperCase() == "CYAN"){
                value = process.env.CCYAN;
            }
            else if(target_Color.toUpperCase() == "LTBLUE"){
                value = process.env.CLBLUE;
            }
            else if(target_Color.toUpperCase() == "BLUE"){
                value = process.env.CBLUE;
            }
            else if(target_Color.toUpperCase() == "PURPLE"){
                value = process.env.CPURPLE;
            }
            else if(target_Color.toUpperCase() == "MAGENTA"){
                value = process.env.CMAGENTA;
            }
            else if(target_Color.toUpperCase() == "BLACK"){
                value = process.env.CBLACK;
            }
            else if(target_Color.toUpperCase() == "WHITE"){
                value = process.env.CWHITE;
            }

            return value;
        }catch(e){
            return;
        }
    }
}