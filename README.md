# 校园新媒体平台导航

一个优雅的校园新媒体平台导航网站，帮助学生快速找到并关注各个学院和部门的官方社交媒体账号。

<img src="https://s21.ax1x.com/2025/02/19/pEQ9Acq.png" alt="预览图" width="800"/>

## 功能特点

- 🎯 多平台聚合：整合微信公众号、微博、抖音、B站等多个平台
- 🏢 分类展示：按照校级媒体、学院分类等多维度组织展示
- 🎨 优雅界面：采用现代化设计，提供流畅的用户体验
- 📱 响应式布局：完美适配电脑、平板和手机等各类设备
- ⚡ 轻量快速：无需后端，纯静态部署，加载迅速
- 🛠 易于配置：采用 JS 配置文件，方便维护和更新

## 项目结构 
```
├── index.html # 主页面
├── css/
│ └── style.css # 样式文件
├── js/
│ ├── config.js # 配置文件
│ └── main.js # 主逻辑文件
└── image.png # 预览图片
```

## 快速开始

1. 克隆或下载项目文件
2. 修改 `js/config.js` 配置文件
3. 部署到任意 Web 服务器

## 配置说明

### 1. 新增平台
```
在 `config.js` 中的 `pingtai` 数组添加新平台：
javascript
{
pingtai: 'xiaohongshu', // 平台唯一标识
mingcheng: '小红书' // 平台显示名称
}
```

### 2. 新增分类
```
在 `config.js` 中的 `fenlei` 数组添加新分类：
javascript
{
biaoshi: 'yishu', // 分类唯一标识
mingcheng: '艺术学院' // 分类显示名称
}
```
### 3. 新增账号
```
在 `config.js` 中的 `zhanghao` 对象添加账号信息：
javascript
{
mingcheng: '新账号名称',
touxiang: 'https://example.com/logo.png', // 200x200px
lianjie: 'https://example.com/account',
jieshao: '账号简介'
}
```
## 自定义主题

项目使用 CSS 变量进行主题配置，你可以在 `css/style.css` 中修改以下变量来自定义主题：
```
css
:root {
--primary-color: #c62f2f; / 主题色 /
--secondary-color: #e54545; / 次要色 /
--accent-color: #ff9c00; / 强调色 /
/ 更多变量配置... /
}
```
## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE11+

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- 响应式设计

## 注意事项

1. 图片资源：
   - 账号头像建议尺寸：200x200像素
   - 建议使用 PNG 或 JPG 格式
   - 确保图片链接可靠稳定

2. 链接地址：
   - 必须使用完整的 URL 地址
   - 建议使用 HTTPS 安全链接

3. 数据完整性：
   - 确保所有必填字段不为空
   - 修改标识时注意更新相关引用
   - 删除内容时注意清理相关配置

## 开源协议

MIT License
