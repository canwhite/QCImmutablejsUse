var R = require('ramda');
const { Map,List,fromJS,toJS } = require('immutable');

/*
==================原生的mutable,也是为了节省内存================
*/

var a = {a:1,b:2,c:3};

var b = a;

b.b = 50;

var pr0 = a.b + " vs. " + b.b;

console.log("----mutable----",pr0);


/*
=================mimutablejs中的Map的使用======================
*/

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
var pr1 = map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
console.log('----immutable----',pr1);



/*
=================没有变化的节点，前后共享，节省内存==============
*/
let x = Map({
    select:'users',
    filter:Map({name:'Cam'})
})
let y = x.set("select","people");
console.log('x===y',x===y)
console.log('x.filter===y.filter', x.get('filter')===y.get('filter'))



/*
==========缺点:容易和原生混，这里可以大致看下取值的区别=======
*/
//Immutable
const map = Map({a:1,b:2})
const list = List([1,2])

//PS：map和list长度获取用的是size()

//原生js
const obj = {a:1,b:2}
const array = [1,2]

//取值方式对比

console.log('map.get',map.get('a'),'obj.',obj.a)
console.log('list.get',list.get(0),'array[]',array[0])




/*
==========fromJS & toJS===========
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
============删除可以看一下:delete==================
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
//ramda的使用，用pipe取代if else

//流水线：第一个的函数的返回值交给第二个，第二个的交给第三个，依次类推
var negative = x => -1 * x;
var increaseOne = x => x + 1;
//pow第一个求3的4次方，返回值给后边方法，以此类推
var f = R.pipe(Math.pow, negative, increaseOne);

console.log('R.pipe:',f(3,4));
//PS：compose从右边向左执行


*/


























