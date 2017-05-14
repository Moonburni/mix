function State(State) {
    state = {
        ZBUTTON:function () {
            var children = document.querySelectorAll(State);
            children.forEach(function (item) {
                var value = {
                    father:item.parentNode.nodeName.toLowerCase(),
                    text:item.getAttribute('text'),
                    style:eval('('+ item.getAttribute('styles') +')'),
                    id:item.getAttribute('id'),
                    className:item.getAttribute('className')
                };
                item.parentNode.replaceChild(Button(value).create(),item);
            })
        },
        ZINPUT:function () {
            var children = document.querySelectorAll(State);
            children.forEach(function (item) {
                var value = {
                    father:item.parentNode.nodeName.toLowerCase(),
                    text:item.getAttribute('text'),
                    style:eval('('+ item.getAttribute('styles') +')'),
                    id:item.getAttribute('id'),
                    className:item.getAttribute('className')
                };
                console.log(value);
                item.parentNode.replaceChild(Input(value).create(),item);
            })
        }
    };
    if(state[State]){
        return state[State]()
    }
}


function Components(id) {
    this.id = id||'';
}

Components.prototype = {
  create:function () {
       throw new Error('请定义create方法')
  },
  delete:function () {
       throw new Error('请定义delete方法')
  },
  action:function () {
      throw new Error('请定义action方法')
  }
};

function Input(value) {
    if(this instanceof Input){
        Components.call(this,value.id);
        this.father =value.father;
        this.style = value.style;
        this.className = value.className || 'input'
    }else{
        return new Input(value)
    }
}
Input.prototype = new Components();
Input.constructor = Input;
Input.prototype.create = function () {
    var input = document.createElement('input');
    input.id = this.id ||'';
    input.className = this.className;
    if (this.style) for (var property in this.style) {
        input.style[property] = this.style[property]
    }
    return input;
};

function Button(value) {
    if(this instanceof Button){
        Components.call(this,value.id);
        this.style = value.style;
        this.father = value.father;
        this.className = value.className||'btn';
        this.text = value.text;
    }else{
        return new Button(value)
    }
}

Button.prototype = new Components();
Button.constructor = Button;

Button.prototype.create = function () {
    var button = document.createElement('button');
    button.id = this.id||'';
    button.className = this.className;
    button.innerText = this.text;
    if(this.style) for(var property in this.style){
        button.style[property] = this.style[property]
    }
    return button
};





window.onload = function () {
  var root = document.getElementById('root');
    // console.log(root.childNodes);
    var arr = [];
    var json = {};
    root.childNodes.forEach(function (item) {
        if(item.nodeType === 1){

                if(!json[item.nodeName]){
                    arr.push(item.nodeName);
                    json[item.nodeName] = 1;

            }
        }
    });
    arr.forEach(function (item) {
        State(item)
    })
};