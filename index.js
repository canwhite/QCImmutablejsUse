const { Map,List,fromJS,toJS,is,getIn} = require('immutable');

/*
----------原生的mutable,也是为了节省内存------------
*/

var a = {a:1,b:2,c:3};

var b = a;

b.b = 50;

var pr0 = a.b + " vs. " + b.b;

console.log("----mutable----",pr0);


/*
------------mimutablejs中的Map的使用------------
*/

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50); //set之后生成新的map
var pr1 = map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
console.log('----immutable----',pr1);



/*
-------没有变化的节点，前后共享，节省内存---------
*/
let x = Map({
    select:'users',
    filter:Map({name:'Cam'})
})
let y = x.set("select","people");
console.log('x===y',x===y)
console.log('x.filter===y.filter', x.get('filter')===y.get('filter'))



/*
-----缺点:容易和原生混，取值主要是get-----
*/
//Immutable，可以通过js初始化
const map = Map({a:1,b:2})
const list = List([1,2])

//PS：map和list长度获取用的是size()
//这里区别于length
console.log("map.size",map.size);
console.log("map.size",list.size);

//获取值
console.log('map.get',map.get('a'))
console.log('list.get',list.get(0))




/*
-------------fromJS & toJS------------
*/

/*
const obj1 = fromJS({a:'123',b:'234'},function (key, value, path) {
    console.log(key, value, path);
    
})
*/

const obj1 = fromJS({a:'123',b:'234'});
console.log('fromJS:',obj1.get('a'))

const obj2 = map.toJS()
console.log('toJS:',obj2.a)


/*
-------------删除可以看一下:delete=------------
*/
// List
List([ 0, 1, 2, 3, 4 ]).delete(0);// List [ 1, 2, 3, 4 ]

// Map
const originalMap = Map({
  key: 'value',
  otherKey: 'other value'
})
// Map { "key": "value", "otherKey": "other value" }
originalMap.delete('otherKey')


//PS:deleteAll() (Map独有，List没有)


/*
-------------比较两个对象、数组，主要是valueOf值得比较---------
*/


const map11 = Map({ a: 1, b: 1, c: 1 })
const map22 = Map({ a: 1, b: 1, c: 1 })

const list1 = List([1,2]);
const list2 = List([1,2]);

// map1 === map2   //false
// Object.is(map1, map2) // false
console.log("map.is",is(map11, map22))  // true
console.log("list.is",is(list1,list2));


/*
------------深度取值getIn------------
*/

const deep = {a:{b:{c:"666"}}};
console.log("getIn",Map(deep).getIn(["a","b","c"]))


/*
------------和JSON.stringify的对比
*/

const obj = {
  a:undefined,
  b:()=>{console.log("123")}
}
console.log(JSON.stringify(obj)); //{}
console.log(Map(obj).toJS()); //{ a: undefined, b: [Function: b] }





























