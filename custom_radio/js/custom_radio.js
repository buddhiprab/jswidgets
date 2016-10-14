/**
 *
 * @param {String} h - html wrapper
 * @param {String} n - radio name
 * @param {String} v - value
 * @param {Boolean} s - status
 * @constructor
 */
function CustomRadio(h,n,v,s){
    s=s||false;
    this.holder = h;
    this.radio_span = false;
    this.active=false;
    this.name=n;
    this.value=v;
    this.onclick=false;
    //init
    var radio_span = document.createElement("span");
    this.radio_span=radio_span;
    radio_span.setAttribute('class', '__rdo__');
    radio_span.setAttribute('name', n);
    radio_span.radio=this;
    radio_span.onclick = this.update_radios;
    var wrp = document.getElementById(this.holder);
    wrp.appendChild(radio_span);
    this.set_status(s)
}
CustomRadio.prototype={
    update_radios:function(){
        var es = document.getElementsByName(this.radio.name);
        for(var i=0;i<es.length;i++){
            es[i].radio.set_status(false);
        }
        this.radio.set_status(true);
    },
    set_status:function(s){
        this.active=s;
        var a=s?'active':'inactive';
        var cl = this.radio_span.className.split(' ');
        cl.remove(['active', 'inactive']);
        cl.push(a);
        this.radio_span.className = cl.join(' ');
        if(s){
            if(this.onclick){
                var e={
                    target:this,
                    active:this.active,
                    value:this.value
                };
                this.onclick(e);
            }
        }
    },
    click:function(){
        this.radio_span.click();
    },
    onClick:function(f){
        this.onclick=f;
    }
};