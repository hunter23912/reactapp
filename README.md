# React 学习过程（通过 vite 构建）

## 一些前置知识

### vscode 一些知识

#### 变量批量操作

- 选中变量按`F2`批量重命名
- 选中变量按`ctrl+F2`快速全选
- 选中变量按`ctrl+d`逐个选上

#### 前端插件辅助

- Auto Import - ES6, TS, JSX, TSX
  自动为前端代码添加 import
- Simple React Snippets
  提供 react 相关代码片段的快速插入

### 构建工具

通常使用 npm 的 vite 脚手架来搭建 react 项目是最快捷的

```shell
npm create vite@latest app-name -- --template react
# 通常@latest可省略
```

建议使用 pnpm 替代 npm，pnpm 通过硬链接管理多个项目的包，更加节省磁盘空间。

```shell
npm run dev
pnpm dev

npm install pkg
pnpm add pkg

npm uninstall pkg
pnpm rm/remove pkg

npm install
pnpm install

```

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
  由于 react 提高性能和响应速度的特性，无法实时捕捉 js 变量值变化，所以要用 setState()方法，状态变量必须叫 state，其余变量存入 state 中

### 组件间的变量传递

- react 通过`this.props`属性可以从上到下传递数据：

  ```jsx
  <Box key={index} x={box.x} name="wjh" />
  ```

- 通过`this.props.children`属性传递子节点，获得了 h1 和 p 标签：
  ```jsx
  <Box key={index} x={box.x}>
    <h1>从父节点传入的标题</h1>
    <p>box.x的平方：{box.x ** 2}</p>
  </Box>
  ```
- `state`是组件内部私有变量，外部无法修改，只能通过 `rpops` 访问。

  > 要将多个组件的公用数据放入最近公共祖先的`this.state`中。

- 无状态函数组件：创建方法 sfc(stateless function component)

  - 只负责展示 UI，不维护自己的 state 状态
  - 通过 props（还可以解构参数） 接收数据和回调，不做逻辑处理
  - 结构简单，易于复用和测试

- 组件的生命周期
  - `Mount`周期，执行顺序：`contructor() -> render() -> componentDidMount()`
  - `Update`周期，执行顺序：`render() -> componentDidUpdate()`
    - `componentDidUpdate()`默认接收两个参数：`prevProps`和`prevState`：
      通常用来监听变化，发送给后端更新数据库
  - `Unmount`周期，执行顺序：`componentWillUnmount()`

## web 分类

- 静态页面：页面数据写死的
- 动态页面：页面数据动态填充的

  - 后端渲染(SSR: Server Side Rendering)：数据在后端填充，返回完整页面
    - `client` 发送一个 `url`
    - `server` 返回当前页面的模板加数据，一个完整页面
  - 前端渲染(CSR: Client Side Rendering)：数据在前端填充
    - `client` 发送一个 `url`
    - `server`返回所有页面的模板
    - `client`再次点击一个链接后，刷新当前页面，需要数据才向服务器请求数据。

### react 路由

- 专门的路由库：`react-router-dom`

- 组件介绍

  - `BrowserRouter`：所有需要路由的组件，都包裹在`BrowserRouter`内。
  - `Link`：跳转到某个链接，`to`属性表示跳转到的链接。
  - `Routes`：类似于 C++的`switch`，匹配第一个路径。
  - `Route`：路由，`path`属性表示路径，`element`属性表示路由到的内容。
    > 这四个通常一起使用。核心是在 `Route` 中注册，通过点击 `Link` 中链接跳转到 `Route` 中对应路由注册的组件。

- 通过导出一个封装后的函数，能让类组件访问 hook：

  ```jsx
  class WebContent extends Component {
    state = {};
    render() {
      console.log(this.props.params);

      return <h1>Web - Content</h1>;
    }
  }
  export default function WebContentWrapper(props) {
    return <WebContent {...props} params={useSearchParams()} />;
  }
  ```

- 如何从路由中获取参数？两种方式

  - `useParams`：与`/web/content/:chapter`路由适配
    链接写`/web/content/${web.id}`
  - `useSearchParams`：与`/web/content`路由适配
    链接写`/web/content?chapter=${web.id}`

- 重定向组件`Navigate`:

  ```jsx
  <Route path="*" element={<Navigate to="/404" />} />
  ```

- 嵌套路由：`Outlet`用于在父路由组件中渲染其子路由对应的内容
