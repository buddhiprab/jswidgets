/**
 * widget spinner
 * @param {String} h - html holder/wrapper
 * @param {Object} d - data object
 * @param {String} n - input name
 * @constructor
 */
function SpinnerInput(h,d,n) {
    // properties
    this.holder = h;
    this.data = d;
    this.input_name = n;
    this.current_op=false;
    this.txt_div=false;
    this.input=false;
    this.spinner_up=false;
    this.spinner_down=false;
    this.onchange=false;
    this.op_div_wrp=false;

    //create widget wrapper div
    var widget_wrapper = document.createElement("div");
    var input = document.createElement("input");
    this.input = input;
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', this.input_name);
    widget_wrapper.appendChild(input);
    widget_wrapper.className += "si fc";
    //create text div
    var txt_div = document.createElement("div");
    this.txt_div = txt_div;
    txt_div.setAttribute('class', 'st');
    txt_div.onclick = this.toggle_options;
    document.onclick = this.hide_options;
    widget_wrapper.appendChild(txt_div);
    //create options wrapper div
    var op_div_wrp = document.createElement("div");
    this.op_div_wrp = op_div_wrp;
    txt_div.options_wrp = op_div_wrp;
    op_div_wrp.setAttribute('class', 'ow');
    widget_wrapper.appendChild(op_div_wrp);
    var spinner_wrp_div = document.createElement("div");
    spinner_wrp_div.className += "sw";
    var spinner_up = document.createElement("div");
    this.spinner_up = spinner_up;
    spinner_up.className += "os_ud os_up active";
    spinner_up.spinner = this;
    spinner_up.onclick = this.spin_op;
    var spinner_down = document.createElement("div");
    this.spinner_down = spinner_down;
    spinner_down.className += "os_ud os_down active";
    spinner_down.spinner = this;
    spinner_down.onclick = this.spin_op;
    spinner_wrp_div.appendChild(spinner_up);
    spinner_wrp_div.appendChild(spinner_down);
    widget_wrapper.appendChild(spinner_wrp_div);
    var wrp = document.getElementById(this.holder);
    wrp.appendChild(widget_wrapper);
    this.load_ops();
    this.set_current_op(this.data[0]);
}
//prototype is the blue print to create the lookup chain of the object
//__proto__ is created as described in prototype
SpinnerInput.prototype= {
    select_option: function (e) {
        this.spinner.set_current_op(this.spinner_op);
    },
    spin_op: function (e) {
        var idx = false;
        var op = false;
        if (e.target.className.indexOf('os_down') > -1) {
            idx = this.spinner.data.indexOf(this.spinner.current_op);
            idx += 1;
            op = this.spinner.data[idx];
            this.spinner.set_current_op(op);
        } else if (e.target.className.indexOf('os_up') > -1) {
            idx = this.spinner.data.indexOf(this.spinner.current_op);
            idx -= 1;
            op = this.spinner.data[idx];
            this.spinner.set_current_op(op);
        }
    },
    set_current_op: function (d) {
        if (d) {
            this.txt_div.innerHTML = d.label;
            this.current_op = d;
            this.input.value = d.id;
            this.update_spinners();
            if(this.onchange){
                var e={
                    current_op:this.current_op,
                    label: d.label
                };
                this.onchange(e);
            }
        }
    },
    update_spinners: function () {
        var len = this.data.length;
        this.set_spinner_status(this.spinner_up, 'active');
        this.set_spinner_status(this.spinner_down, 'active');
        if (this.data.indexOf(this.current_op) == 0) {
            this.set_spinner_status(this.spinner_up, 'inactive');
        } else if (this.data.indexOf(this.current_op) == (len - 1)) {
            this.set_spinner_status(this.spinner_down, 'inactive');
        }
    },
    set_spinner_status: function (s, a) {
        var cl = s.className.split(' ');
        cl.remove(['active', 'inactive']);
        cl.push(a);
        s.className = cl.join(' ');
    },
    toggle_options: function (e) {
        if (this.options_wrp.style.display == 'block') {
            this.options_wrp.style.display = 'none';
        } else {
            this.options_wrp.style.display = 'block';
            this.options_wrp.style.zIndex = "1000000";
        }
    },
    hide_options: function (e) {
        if (e.target.className !== 'st') {
            var es = document.getElementsByClassName('ow');
            var es_len = es.length;
            for (var i = 0; i < es_len; i++) {
                var ele = es[i];
                ele.style.display = 'none';
            }
        }
        if (e.target.className == 'st') {
            var st = document.getElementsByClassName('st');
            var es_len = st.length;
            for (var i = 0; i < es_len; i++) {
                var ele = st[i];
                if (ele !== e.target) {
                    ele.options_wrp.style.display = 'none';
                }
            }
        }
    },
    load_ops:function(){
        var n=this.op_div_wrp;
        while (n.firstChild) {
            n.removeChild(n.firstChild);
        }
        var data = this.data;
        var data_len = data.length;
        for (var i = 0; i < data_len; i++) {
            //create option div
            var op_div = document.createElement("div");
            op_div.setAttribute('class', 'op');
            op_div.innerHTML = data[i].label;
            op_div.onclick = this.select_option;
            op_div.spinner_op = data[i];
            op_div.spinner = this;
            this.op_div_wrp.appendChild(op_div);
        }
    },
    onChange: function (f) {
        this.onchange=f;
    },
    change_options:function(d){
        this.data=d;
        this.load_ops();
        this.set_current_op(this.data[0]);
    }
};