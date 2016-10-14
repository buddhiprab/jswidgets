if (!Array.prototype.remove) {
    Array.prototype.remove = function(a) {
        var i=0;
        var removedItems=[];
        if (a instanceof Array) {
            for(i = this.length; i--;){
                if (a.indexOf(this[i])>-1) removedItems.push(this.splice(i, 1));
            }
        }else {
            i = this.indexOf(a);
            if(i>-1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
}
var radio1=false;
var radio2=false;
(function(){
    radio1=new CustomRadio("radio_wrap1","price_option","normal",true);
    radio2=new CustomRadio("radio_wrap2","price_option","vip");
    var r=[radio1,radio2];
    var selected_radio_val=false;
    for(var j=0;j< r.length;j++){
        if(r[j].active){
            selected_radio_val=r[j].value;
            break;
        }
    }
    console.log(selected_radio_val);
    radio1.onClick(function(e){
        console.dir(e);
    })
})();