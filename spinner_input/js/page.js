if (!Array.prototype.remove) {
    Array.prototype.remove = function(a) {
        var i=0;
        var removedItems=[];
        if (a instanceof Array) {
            for(i = this.length; i--;){
                if (a.indexOf(this[i])>-1) removedItems.push(this.splice(i, 1));
            }
        }else {  //same as before...
            i = this.indexOf(a);
            if(i>-1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
}
var spinner1=false;
var spinner2=false;
(function(){
    var data=[{id:23,label:"black"},{id:21,label:"white"},{id:24,label:"pink"}];
    var data2={id_23:[{id:45,label:"x-large"},{id:46,label:"x-small"}],id_21:[{id:45,label:"xx-large"},{id:46,label:"x-small"}],id_24:[{id:45,label:"xxx-large"},{id:46,label:"x-small"}]};
    spinner1=new SpinnerInput('wrap1',data,'select_option1');
    spinner1.onChange(function(e){
        console.dir(e);
        var id= e.current_op.id;
        spinner2.setData(data2["id_"+id]);
    });
    var data1=[{id:344,option:"small",label:"small"},{id:544,option:"large",label:"large"}];
    spinner2=new SpinnerInput('wrap2',data1,'select_option2');
})();