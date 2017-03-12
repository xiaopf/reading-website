# nodejs+express+mongoDB建站总结
## 一、使用教程
### 1.nodejs安装
去[++nodejs官网++](https://nodejs.org/en/)根据自己需求下载相应资源进行安装，网上安装的教程很多不赘述。
### 2.mongoDB及可视化工具robomongo安装
网站的数据通过mongoDB进行存储，去[mongoDB官网](https://www.mongodb.com/download-center?jmp=nav#community)进行下载安装，命令行工具看着不是特别方便，所以可以用免费的数据可视化工具robomongo进行管理，可以去[robomongo官网](https://robomongo.org/)下载安装。
### 3.下载源代码及配置
下载一个zip的压缩包，然后解压缩，里面是没有数据，没有模块文件的，所以需要自己进行配置，才能使用的，首先打开命令行工具，用cd命令进入到解压完毕的目录，然后通过下面的命令进行依赖模块的下载安转。然后目录中就多了一个node_modules文件夹。

```
npm install

```
依赖模块安装完成后，接下来需要配置数据了，首先是mongoDB的连接，（需要指定一个数据存储位置，我一般就放在刚刚解压的源代码根目录），进入根目录创建一个data文件夹，再进入data文件夹创建一个webData文件夹，然后打开命令行工具，用cd命令进入源代码根目录，输入下面代码进行数据目录指定

```
mongod --dbpath data/webData
```
完毕后，mongoDB算是连接上了，数据就存在指定的目录中（以后每次运行网站都需要用命令行，开启数据库）。这个时候就可以打开可视化工具robomongo了，它会自动弹出connect对话框，具体就不展开了。

现在我们就可以网数据库里面导入数据了，在源代码根目录中有一个 top250_books_info 文件夹，里面有一个json文件，是豆瓣top250的书籍信息，然后打开命令行工具，用cd命令进入上述文件夹。通过以下命令将数据导入进mongoDB数据库。

```
mongoimport -d webData -c books books.json

```
现在打开robomongo就可以看到webData名称的database了，里面的collections有一个叫books的集合，那就是刚刚导入的数据了。

### 4.启动网站
需要配置的地方全部配置完成，这个时候就可以打开命令行工具了，进入根目录运行下面命令

```
npm start
```
打开浏览器输入[网站地址](http://localhost:3000/) http://localhost:3000/ 就可以进入登陆页了，这里还有一个地方需要注意的，就是前台注册的账号全都是user（user就是只有浏览权限的用户，管理员是admin）所以我们需要借助robomongo进行权限修改，进入collections里面（前提是你已经注册了账户）然后找到你想要设置为管理员的账户，然后编辑数据，admin那一项把user设置为admin即可，管理员账户会把后台入口展示出来，后台可以添加，删除，更新书籍数据，还可以删除用户数据。

## 二、网站展示
### 1.网站的注册登录页面
整站必须登入才能访问，否则全部转回登陆页面。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/1.png" alt="">

通过signup和signin小小的导航来实现注册和登录的切换。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/2.png" alt="">

### 2.注册的输入框
name和email的输入框采用的是ajax实时数据比对，每输入一个字符，ajax就会向后台进行数据请求，如果数据在后台存在，弹出提示信息警告用户，email同时还采用了正则比对，如果不符合标准也弹出警告信息。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/3.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/4.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/5.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/6.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/7.png" alt="">

直到输入没问题，输入框末尾出现绿色的对勾，这证明注册信息没有问题。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/8.png" alt="">

然后点击signup，数据通过ajax请求发送到后台，前台页面不用刷新，如果数据保存好，会弹出绿色的提示条，提示条过几秒会自动消失。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/9.png" alt="">

### 3.登录的输入框
输入完name和password后点击signin如果任何一个输入框内的数据有问题都会弹出警告提示，如果没有问题则会跳转到index首页。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/10.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/11.png" alt="">

### 4.网站首页
顶上是导航栏，导航栏会存在于网站的每个页面，内容区就是数据的信息，数据信息默认是按照综合排名进行排列的，也可以点击右上角的其他两个选项，按出版时间，按平分高低。管理员账户和普通账户打开显示的内容是不一样的，普通账户无法看到后台入口选项。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/13.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/13.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/14.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/15.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/16.png" alt="">

### 5.搜索页
在每个页面中，都有搜索框，都可以实现搜索功能，搜索功能可以根据书名，作者，isbn13码进行查找，支持模糊查找。搜索结果会展示在搜索页面中。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/17.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/18.png" alt="">

### 6.详情页

首页和搜索页全都可以进入详情页，详情页是书籍的信息完整展示.下面还有评论功能，可以直接评价也可以评价他人，还可以对他人的评价进行点赞和踩。用户在自己的账户登录状态下可以删除自己的评论

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/19.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/21.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/22.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/23.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/24.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/25.png" alt="">

### 7.用户资料页面
展示用户的相关数据，可以更改名字，邮箱，头像，和座右铭。头像上传后通过iframe实现无刷新数据上传。点击保存数据通过ajax请求发送到后台，如果成功，弹出提示保存成功。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/36.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/37.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/38.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/39.png" alt="">

### 8.管理员录入页
书籍的所有信息填入输入框，可以手动填写，也可以利用豆瓣api进行导入，第一行三个输入框，如果是一本书，在第一个输入框内输入书籍id，点击获取，数据就自动填入输入框了，点击保存即可。如果是批量的话，在后面的两个框中填入起始和结束的书籍id，点击获取，数据会自动保存进数据库中！（小心使用，封ip）

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/26.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/27.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/28.png" alt="">

### 9.管理员书籍列表页
书及列表页有所有书籍的信息展示，可以更新和删除，更新的话会跳转到数据录入页面，已有信息会填入输入框，管理员更新后，保存即更新完毕。删除按钮点击会提示是否确认，确认的话，书籍删除命令通过ajax请求，发送到后台，删除完毕提示删除成功。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/29.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/30.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/31.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/32.png" alt="">

### 10.管理员用户列表页
用户列表页面只允许删除用户，不可以更改用户数据。删除按钮点击会提示是否确认，确认的话，用户删除命令通过ajax请求，发送到后台，删除完毕提示删除成功。

<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/33.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/34.png" alt="">
<img src="https://raw.githubusercontent.com/xiaopf/reading-website/master/public/images/web_pics/35.png" alt="">











