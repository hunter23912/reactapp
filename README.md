# React 学习过程（通过 vite 构建）

## ES6 语法补充

### 使用`bind()`函数绑定`this`取值

`this`指定的是执行时的调用者，而非定义时所在的对象

```js
const person = {
  name: "yxc",
  talk: function () {
    console.log(this);
  },
};

person.talk();

const talk = person.talk;
talk();
```

`bind()`函数可以绑定`this`的取值，例如

```js
const talk = person.talk.bind(person);
```

### 箭头函数简写方式

```js
const f = (x) => {
  return x * x;
};
```

当函数只有一行时，可简写为：

```js
const f = (x) => x * x;
```

### 箭头函数不重新绑定`this`的取值

例如

```js
const person = {
  talk: function () {
    setTimeout(function () {
      console.log(this);
    }, 1000);
  },
};

person.talk(); // 输出window

const person = {
  talk: function () {
    setTimeout(() => {
      console.log(this);
    }, 1000);
  },
};

person.talk(); // 输出{talk:f}
```

### 对象的解构

```js
const person = {
  name: "Alice",
  age: 30,
  height: 165,
};

const { name: new_name, age } = person;

// 等价于 let new_name = person.name, age = person.age

console.log(new_name, age);
```

### 数组和对象的展开

```js
let a = [1, 2, 3];
let b = [4, 5, 6];

let c = [-1, 0, ...a, 3.5, ...b, 7, 8, 9];
```

对象的展开也是可以的：

```js
const a = { name: "Alice", age: 30 };
const b = { height: 165, grade: 60 };

const c = { ...a, ...b, where: "shanghai" };

console.log(c);
```

### epxort 用法

`export default`则`import`时候不能加{}，可以改名
`export`则`import`时要加{}

## 组件

### 创建 Component

- 对象思想创建一个组件，集成基类 Component
- 渲染列表使用 map 函数，需要对每个元素具有唯一的`key`，key 在 value 后，用来帮助 React 找到被修改的 DOM 元素。

  ```jsx
  {
    this.state.color.map((color, idx) => <div key={idx}>{color}</div>);
  }
  ```

- 逻辑表达式表示简单函数

  ```jsx
  {
    this.state.color.length === 0 && <p>no colors</p>;
  }
  ```

- 绑定事件

  - 事件绑定函数不要加()，()表示执行函数

  ```jsx
  <button onClick={this.handleClickLeft} className="btn btn-success m-2">
    right
  </button>
  ```

  为了能让函数对象传入参数，可采用箭头函数封装一下：

  ```jsx
  <button onClick={() => this.handleClickLeft(10)} className="btn btn-primary m-2">
    left
  </button>
  ```

  - 如何让`this`绑定对应的类，而不是`undefined`：采取箭头函数，让`this`向上传递

  ```jsx
  handleClickLeft() {
    console.log("click left", this);
  }

  handleClickLeft = () => {
    console.log("click left", this);
  }
  ```

  或者使用`bind`绑定当前对象

  ```jsx
  <button onClick={this.handleClickLeft.bind(this)} className="btn btn-primary m-2">
    left
  </button>
  ```

- 动态修改变量值
  由于 react 提高性能和响应速度的特性，无法实时捕捉 js 变量值变化，所以要用 setState()方法，状态变量必须叫 state，其余变量存入 state 中:
