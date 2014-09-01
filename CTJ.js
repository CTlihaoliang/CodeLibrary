
/*
*name: CTJ
*data:2014-08-26
autor:lihaoliang
version:1.0.1
*/

(function(window,undefined){

var core_slile = [].slice,
  core_indexOf = [].indexOf,
   core_filter = [].filter,
      core_map = [].map,
    class2type = {},
 core_toString = class2type.toString,
 hasOwnProperty = Object.prototype.hasOwnProperty,
           CTJ = {};


CTJ.extend = function(type,object) {
	
   if (CTJ[type] === undefined) {
   	  CTJ[type] = {};
   }

   if (object == null || typeof object == null || core_toString.call(object).toLowerCase() !=='[object object]') return;

   for (var obj in object) {
   	CTJ[type][obj] = object[obj];
   }

}

CTJ.extend("string",{
	/**
     * 计算字符串的长度 (中文算两个)
     * 
     * 脚本举例
     * [code]
     *   // CTJ.string.getLength(str)
     * [/code]

     * @param  {String}  待编码串
     * @return {Number}  编码后的串
     */
	getLength: function(_content) {
        var _reg = /[^\x00-\xfff]/g;
        return (''+(_content||'')).replace(_reg,'**').length;
	},

	trim: function(str){
		return String(str).replace(/^\s+|\s+$/g, '');
	},
    /**
     * 字符串转换驼峰
     * 
     * 脚本举例
     * [code]
     *   // CTJ.string.camelCase(str)
     * "jsdkLKJLKF-2K9889" -> "jsdkLKJLKFSK9889"
     * [/code]

     * @param  {String}  待转换的字符串
     * @return {Number}  转换后的字符串
     */
    camelCase: function(str) {  // \D 和 [^0-9]等价
		return String(str).replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	}
})

CTJ.extend("number",{
	random: function (min,max) {
       return Math.floor(Math.random() * (max - min + 1) + min);
	}
})


CTJ.extend("array",{
    /**
     * 数组中产生随机数<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组和要产生的随机个数
     *   CTJ.array.randomArray(arr,num)
     * [/code]
     * 
     * @param  {Array}               数组源
     * @param  {Number}              个数，不传就默认1个
     * @return {Array}               数组结果
     */
	randomArray: function(_arr,_num) {
       var arr = _arr;
       var len = arr.length;
       var num = Math.min(_num || 1,arr.length) ;
       var index  ;

       if (!CTJ.fx.isArray(arr)) return;

       if (num === 1) {
       	 index =  Math.floor(Math.random() * len) ;
         return arr[index];
       } else {
       	   var temp = [];
           for(var i = 0 ; i < num ; i++) {
           	  index =  Math.floor(Math.random() * arr.length);
              temp.push(arr.splice(index,1)[0]);
           }
           return temp;
       }
       
	},
    /**
     * 判断是否在数组中<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组和要检测的数
     *   CTJ.array.inArray(arr,num)
     * [/code]
     * 
     * @param  {Array}               数组
     * @param  {Number}              要检测的元素
     * @return {Number}              存在就返回元素所在的索引，否则返回-1
     */
	inArray: function (_arr,_elem) {
		var arr = _arr;
		var elem = _elem;
		
		if (arr) {
            if (core_indexOf) {
            	return core_indexOf.call(arr,elem);
            } 

            var len = arr.length;
            for (var i = 0 ; i < len ; i++){
         	   if(arr[i] == elem) {
         		return i;
         	}
         }

		}   

       return -1;
	},

    forEach: function () {
         //。。。
    },
     /**
     * 数组遍历操作<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组和方法
     *   CTJ.array.map(arr,fn)
     * [/code]
     * 
     * @param  {Array}               数组
     * @param  {Function}            要操作的方法
     * @return {Array}               操作结果
     */
    map: function (_arr,_fn) {
       var arr = _arr ;
       var fn = _fn;
       var length = arr.length;
       var result = Array(length);

       if (core_map) {
       	 return core_map.call(arr,fn);
       } 

       for (var i = 0 ; i < length ; i++){
       	 result[i] = fn.call(null,arr[i]);
       }

       return result;
    },
     /**
     * 数组过滤操作<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组和方法
     *   CTJ.array.filter(arr,fn)
     * [/code]
     * 
     * @param  {Array}               数组
     * @param  {Function}            要过滤的方法
     * @return {Array}               过滤后的结果
     */
	filter: function (_arr,_fn) {
	   var arr = _arr ;
	   var fn = _fn;
       var length = arr.length;
       var result = [];

       if(core_filter) {
       	 return core_filter.call(arr,fn);
       } 

       for(var i = 0 ; i < length ; i++) {
           result.push(fn.call(null,arr[i]));
       }

       return resut;
	},
    /**
     * 去除数组重复元素<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组
     *   CTJ.array.uniqueArray(arr,fn)
     * [/code]
     * 
     * @param  {Array}               数组
     * @return {Array}               操作结果
     */
	uniqueArray: function (_arr) {
        var arr = _arr && _arr.sort();
        var result = [];
        var length = arr.length;
        var i = 1;

        for(; i < length ; i++) {
        	if (arr[i] !== arr[i-1]) {
        		result.push(arr[i]);
        	}	
        }

       return result;
	},
    /**
     * 去除数组某元素<br/>
     * 
     * 脚本举例
     * [code]
     *   // 传入数组和待删元素
     *   CTJ.array.erase(arr,elem)
     * [/code]
     * 
     * @param  {Array}               数组
     * @param  {object}              数组元素
     * @return {Array}               操作结果
     */
	erase: function(_arr,_item){
        var arr = _arr;
        var item = _item;
        var len = arr.length;
		for (var i = len; i--;){
			if (arr[i] === item) arr.splice(i, 1);
		}
		return arr;
	}
});

CTJ.extend("date",{
	  /**
     * 格式化时间，yyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s<br/>
     * 
     * 脚本举例
     * [code]
     *   // 根据格式输出时间，比如:2012-01-11,连接符可自定义
     *   CTJ.date.dateFormat(new Date(),'yyyy-MM-dd');
     * [/code]
     * 
     * @param  {Number|String|Date}  时间
     * @param  {String}              格式
     * @return {String}              指定格式的时间串
     */
     dateFormat: (function(){
        var _map = {i:!0,r:/\byyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s\b/g};
        var _fmtnmb = function(_number){
            _number = parseInt(_number)||0;
            return (_number<10?'0':'')+_number;
        };
        return function(_time,_format){
            if (!_time||!_format) 
                return '';
            _time = CTJ.date.toDate(_time);
            _map['yyyy'] = _time.getFullYear();
            _map['yy']   = (''+_map['yyyy']).substr(2);
            _map['M']    = _time.getMonth()+1;
            _map['MM']   = _fmtnmb(_map['M']);
            _map['d']    = _time.getDate();
            _map['dd']   = _fmtnmb(_map['d']);
            _map['H']    = _time.getHours();
            _map['HH']   = _fmtnmb(_map['H']);
            _map['m']    = _time.getMinutes();
            _map['mm']   = _fmtnmb(_map['m']);
            _map['s']    = _time.getSeconds();
            _map['ss']   = _fmtnmb(_map['s']);
            _map['ms']   = _time.getMilliseconds();
            return CTJ.encode(_map,_format);
        }
    })(),
    /**
     * 转日期对象<br/>
     * 字符串日期格式同ECMA规范定义：YYYY-MM-DDTHH:mm:ss.sssZ
     * 
     * 脚本举例
     * [code]
     *   // 输入字符串，数字或日期，生成日期对象
     *   CTJ.date.toDate(new Date());
     * [/code]
     * @param  {Number|String|Date}  时间
     * @return {Date}                日期
     */
   toDate: function(_time){
        var _date = _time;
        if (CTJ.fx.isString(_time))
            _date = new Date(Date.parse(_time));
        if (!CTJ.fx.isDate(_time))
            _date = new Date(_time);
        return _date;
    }

});

CTJ.extend("object",{
	keys: function(object){
		var keys = [];
		for (var key in object){
			if (hasOwnProperty.call(object, key)) keys.push(key);
		}
		return keys;
	},

	values: function(object){
		var values = [];
		for (var key in object){
			if (hasOwnProperty.call(object, key)) values.push(object[key]);
		}
		return values;
	},

	keyOf: function(object, value){
		for (var key in object){
			if (hasOwnProperty.call(object, key) && object[key] === value) return key;
		}
		return null;
	},

	contains: function(object, value){
		return Object.keyOf(object, value) != null;
	}
})


CTJ.extend("brower",{

    /**
     * 获取浏览器的信息<br/>
     * 
     * 脚本举例
     * [code]
     *   CTJ.parse(navigator.userAgent, navigator.platform);
     * [/code]
     * @param  {String}  navigator.userAgent 非必须
     * @param  {String}  navigator.platform  非必须
     * @return {object}  浏览器对象信息 名称、版本号、平台
     */
    parse: function(ua, platform){
    	var ua = ua || navigator.userAgent;
    	var platform = platform || navigator.platform;
	    ua = ua.toLowerCase();
	    platform = (platform ? platform.toLowerCase() : '');

	    var UA = ua.match(/(opera|ie|firefox|chrome|trident|crios|version)[\s\/:]([\w\d\.]+)?.*?(safari|(?:rv[\s\/:]|version[\s\/:])([\w\d\.]+)|$)/) || [null, 'unknown', 0];

	    if (UA[1] == 'trident'){
	    	UA[1] = 'ie';
		    if (UA[4]) UA[2] = UA[4];
	    } else if (UA[1] == 'crios') {
		    UA[1] = 'chrome';
        }

	    var platform = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0];
	    if (platform == 'win') platform = 'windows';

	    return {
	    	name: (UA[1] == 'version') ? UA[3] : UA[1],
	    	version: parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
		    platform: platform
	    }
    }
})

CTJ.extend("event",{
	stopPropagation: function(event){
		var event = event || window.event;
		if (event.stopPropagation) event.stopPropagation();
		else event.cancelBubble = true;
	},

	preventDefault: function(){
		var event = event || window.event;
		if (event.preventDefault) this.event.preventDefault();
		else event.returnValue = false;
	}
})

CTJ.extend("cookie",{

    setCookie: function (_name, _value, _days) {
        var expires = "";

        if (_days) {
           var date = new Date();
               date.setTime(date.getTime() + (_days * 86400000));
           expires = "; expires=" + date.toGMTString();
        }

        document.cookie = _name + "=" + escape(_value) + expires + ";path=/";
    },

    getCookie: function (_name) {
       var m = null;

       if (window.RegExp) {
           var re = new RegExp(";\\s*" + _name + "=([^;]*)", "i");
                m = re.exec(';' + document.cookie);
       }

        return (m ? unescape(m[1]) : null);
    }

});


CTJ.extend("fx",{

	isTypeOf: function(_data,_type){
        try{
            _type = _type.toLowerCase();
            if (_data === null) return _type == 'null';
            if (_data === undefined) return _type == 'undefined';
            return core_toString.call(_data).toLowerCase()=='[object '+_type+']';
        }catch(e){
            return !1;
        }
    },

    isFunction: function( _data ) {
		return this.isTypeOf(_data,'function');
	},
    
    isString: function (_data) {
        return this.isTypeOf(_data,'string')
    },

    isNumber: function (_data) {
        return this.isTypeOf(_data,'number')
    },

    isBoolean: function (_data) {
        return this.isTypeOf(_data,'boolean')
    },

    isDate: function (_data) {
        return this.isTypeOf(_data,'date')
    },

	isArray: function (_data) {
		return this.isTypeOf(_data,'array')
	},

	isObject: function (_data) {
        return this.isTypeOf(_data,'object')
	},

	isWindow: function( _data ) {
		return _data != null && _data == _data.window;
	}
  });

   /**
     * 编码字符串
     * 
     * 脚本举例
     * [code]
     *   // 把字符串99999根据规则9替换成t，结果：ttttt
     *   CTJ.encode({r:/\d/g,'9':'t'},'99999');
     * [/code]
     * @param  {Object}  编码规则
     * @param  {String}  待编码的字串
     * @return {String}  编码后的字串
     */
 CTJ.encode = function(_map,_content){
        if (!_map||!_content||!_content.replace) 
            return _content||'';
        return _content.replace(_map.r,function($1){
                   var _result = _map[!_map.i?$1.toLowerCase():$1];
                   return _result!=null?_result:$1;
               });
  };
    /**
     * 编码html代码，'<' -> '&lt;'
     * 
     * 脚本举例
     * [code]
     *   // 编码，结果：&lt;a&gt;util&lt;/a&gt;&amp;
     *   CTJ.escape('<a>util</a>&');
     * [/code]
     * 
     * @param  {String}  待编码串
     * @return {String}  编码后的串
     */
  CTJ.escape = (function(){
        var _map = {r:/\<|\>|\&|\r|\n|\s|\'|\"/g,
                   '<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;','"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''};
        return function(_content){
            return CTJ.encode(_map,_content);
        };
  })();
    /**
     * 反编码html代码，'&lt;' -> '<'
     * 
     * 脚本举例
     * [code]
     *   // 反编码，结果：<&a>util</a>
     *   CTJ.unescape('&lt;&amp;a&gt;util&lt;/a&gt;');
     * [/code]

     * @param  {String}  待编码串
     * @return {String}  编码后的串
     */
  CTJ.unescape = (function(){
        var _map = {r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,
                   '&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'};
        return function(_content){
            return CTJ.encode(_map,_content);
        };
   })();

   /**
     * 浮点数值保留指定位数小数点<br/>
     * 
     * 脚本举例
     * [code]
     *   // 保留2位小数
     *   Ctj.fixed(3.14159,2);
     * [/code]
     * 
     * @param  {Float}  浮点数
     * @param  {Number} 小数位
     * @return {Number} 浮点数
     */
    CTJ.fixed = function(_float,_fraction){
        return new Number(_float).toFixed(_fraction);
    };

     /**
     * 从URL地址中提取源信息<br/>
     * http://a.b.com:8080/a/b/ -> http://a.b.com:8080
     * 脚本举例
     * [code]
     *   //  提取url地址的源信息，返回http://a.b.com:8080
     *   CTJ.url2origin("http://a.b.com:8080/a/b/");
     * [/code]
     * 
     * @param  {String} URL地址
     * @return {String} 源信息
     */
    CTJ.url2origin = (function(){
        var _reg = /^([\w]+?:\/\/.*?(?=\/|$))/i;
        return function(_url){
            if (_reg.test(_url||''))
                return RegExp.$1.toLowerCase();
            return '';
        };
    })();


 /**
     * 缓存模块<br/>
     * 脚本举例
     * [code]
     *  new CTJ.Cache() 一个实例 ;
     * [/code]
     * 
     * @param  {Number} 最大缓存数
     * @return {Number} 缓冲个数
     */
var Cache = function(max, buffer) {
    this.cache = [];
    this.max = max || 20;
    this.buffer = buffer || 5;
};

Cache.prototype.set = function(key, cacheItem) {
    var _cache = this.cache;
    key = 'cache_' + key;
    var temp = _cache[key];

    if (!_cache.hasOwnProperty(key)) {
        if (_cache.length >= this.max + this.buffer) { //缓存列表和缓冲区都满了
            _cache.sort(function(a, b) {
                return b.fre == a.fre ? b.time - a.time : b.fre - a.fre;
            });
            var counter = this.buffer;
            while (counter--) { //缓冲区有多少，我们就一次性删除多少
                var item = _cache.pop();
                delete _cache[item.key];
            }
        }
        temp = {};
        _cache.push(temp);
        _cache[key] = temp;
    }

    temp.item = cacheItem;
    temp.fre = 1;
    temp.key = key;
    temp.time = new Date().getTime();

    return temp;
};

Cache.prototype.get = function(key) {
    key = 'cache_' + key;
    var _cache = this.cache;
    var result;

    if (_cache.hasOwnProperty(key)) {
        result = _cache[key];
        if (result.fre >= 1) {
            result.fre++;
            result.time = new Date().getTime();
            result = result.item;
        }
    }

    return result;
};

Cache.prototype.has = function(key) {
    key = 'cache_' + key;
    return this.cache.hasOwnProperty(key);
};

Cache.prototype.del = function(key) {
    key = 'cache_' + key;
    var _cache = this.cache;
    var result = _cache[key];

    if (result) {
        result.fre = -1;
        delete result.item;
        delete _cache[key];
    }
};

CTJ.Cache = Cache;

window.CTJ = CTJ;

})(window)

