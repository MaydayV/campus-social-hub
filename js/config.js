/**
 * 学校新媒体平台配置文件
 * ====================================
 * 
 * 配置文件结构说明：
 * 1. pingtai: 平台类型配置，定义所有支持的平台
 * 2. fenlei: 学院分类配置，定义所有的分类类型
 * 3. zhanghao: 各平台下的账号配置，按分类组织
 * 
 * 配置文件使用说明：
 * ====================================
 * 
 * 1. 新增平台类型
 *    示例：在 pingtai 数组中添加新平台
 *    {
 *        pingtai: 'xiaohongshu',  // 平台唯一标识，只能包含字母、数字和下划线
 *        mingcheng: '小红书'      // 平台显示名称
 *    }
 *    注意：添加平台后，需要在 zhanghao 中创建对应的账号配置对象
 * 
 * 2. 新增学院分类
 *    示例：在 fenlei 数组中添加新分类
 *    {
 *        biaoshi: 'yishu',       // 分类唯一标识，只能包含字母、数字和下划线
 *        mingcheng: '艺术学院'   // 分类显示名称
 *    }
 *    注意：添加分类后，可以在各平台的账号配置中使用此分类
 * 
 * 3. 新增平台账号
 *    示例：在 zhanghao 对象中添加账号数据
 *    zhanghao: {
 *        wechat: {              // 对应平台的唯一标识
 *            xiaoji: [          // 对应分类的唯一标识
 *                {
 *                    mingcheng: '新账号名称',
 *                    touxiang: 'https://example.com/logo.png',  // 200x200px
 *                    lianjie: 'https://example.com/account',
 *                    jieshao: '账号简介'
 *                }
 *            ]
 *        }
 *    }
 * 
 * 具体操作步骤：
 * ====================================
 * 
 * 1. 新增平台的完整步骤：
 *    a. 在 pingtai 数组中添加平台配置
 *    b. 在 zhanghao 对象中创建新平台的配置对象
 *    c. 在新平台配置对象中添加各分类的账号数组
 * 
 * 2. 新增分类的完整步骤：
 *    a. 在 fenlei 数组中添加分类配置
 *    b. 在需要的平台的 zhanghao 配置中添加该分类的账号数组
 * 
 * 3. 新增账号的完整步骤：
 *    a. 确定账号所属平台和分类
 *    b. 在对应平台的对应分类数组中添加账号信息
 *    c. 准备好账号的 logo 图片（建议尺寸200x200像素）
 * 
 * 注意事项：
 * ====================================
 * 
 * 1. 唯一标识规范：
 *    - 只能包含字母、数字和下划线
 *    - 不能与现有标识重复
 *    - 建议使用有意义的英文缩写
 * 
 * 2. 图片资源：
 *    - touxiang 图片建议尺寸：200x200像素
 *    - 图片格式建议：PNG或JPG
 *    - 图片需要保存在可靠的图床或服务器上
 * 
 * 3. 链接地址：
 *    - lianjie 必须是完整的URL地址
 *    - 必须包含 https:// 或 http://
 *    - 建议使用 https 安全链接
 * 
 * 4. 数据完整性：
 *    - 所有必填字段都不能为空
 *    - 删除平台或分类时注意同步清理相关配置
 *    - 修改标识时注意更新所有相关引用
 */

const platformConfig = {
    /**
     * 平台类型配置
     * 
     * 字段说明：
     * - pingtai: 平台唯一标识，用于关联账号数据（只能包含字母、数字和下划线）
     * - mingcheng: 平台显示名称
     */
    pingtai: [
        {
            pingtai: 'wechat',
            mingcheng: '公众号'
        },
        {
            pingtai: 'weibo',
            mingcheng: '微博'
        },
        {
            pingtai: 'douyin',
            mingcheng: '抖音'
        },
        {
            pingtai: 'bilibili',
            mingcheng: 'B站'
        }
    ],

    /**
     * 学院分类配置
     * 
     * 字段说明：
     * - biaoshi: 分类唯一标识（只能包含字母、数字和下划线）
     * - mingcheng: 分类显示名称
     */
    fenlei: [
        {
            biaoshi: 'xiaoji',
            mingcheng: '校级媒体'
        },
        {
            biaoshi: 'ligong',
            mingcheng: '理工学院'
        },
        {
            biaoshi: 'wenke',
            mingcheng: '文科学院'
        },
        {
            biaoshi: 'shangke',
            mingcheng: '商科学院'
        }
    ],

    /**
     * 账号配置
     * 
     * 字段说明：
     * - mingcheng: 账号名称
     * - touxiang: 账号logo图片URL
     * - lianjie: 账号主页链接
     * - jieshao: 账号描述
     */
    zhanghao: {
        // 微信公众号账号配置
        wechat: {
            xiaoji: [
                {
                    mingcheng: '校团委',
                    touxiang: 'https://picsum.photos/200?random=1',
                    lianjie: 'https://example.com/youth-league',
                    jieshao: '发布校园活动、青年资讯'
                },
                {
                    mingcheng: '校学生会',
                    touxiang: 'https://picsum.photos/200?random=2',
                    lianjie: 'https://example.com/student-union',
                    jieshao: '服务同学、传递校园资讯'
                }
            ],
            ligong: [
                {
                    mingcheng: '计算机学院',
                    touxiang: 'https://picsum.photos/200?random=3',
                    lianjie: 'https://example.com/computer',
                    jieshao: '发布学院动态、专业资讯'
                },
                {
                    mingcheng: '物理学院',
                    touxiang: 'https://picsum.photos/200?random=4',
                    lianjie: 'https://example.com/physics',
                    jieshao: '分享科研动态、学术资讯'
                }
            ],
            wenke: [
                {
                    mingcheng: '文学院',
                    touxiang: 'https://picsum.photos/200?random=5',
                    lianjie: 'https://example.com/literature',
                    jieshao: '传播人文知识、分享学术动态'
                },
                {
                    mingcheng: '新闻传播学院',
                    touxiang: 'https://picsum.photos/200?random=6',
                    lianjie: 'https://example.com/journalism',
                    jieshao: '传播新闻理论与实践'
                }
            ],
            shangke: [
                {
                    mingcheng: '经济管理学院',
                    touxiang: 'https://picsum.photos/200?random=7',
                    lianjie: 'https://example.com/economics',
                    jieshao: '分享经济管理前沿资讯'
                }
            ]
        },

        // 微博账号配置
        weibo: {
            xiaoji: [
                {
                    mingcheng: '校团委',
                    touxiang: 'https://picsum.photos/200?random=8',
                    lianjie: 'https://example.com/weibo-youth',
                    jieshao: '校园生活、青年风采'
                }
            ],
            ligong: [
                {
                    mingcheng: '计算机学院',
                    touxiang: 'https://picsum.photos/200?random=9',
                    lianjie: 'https://example.com/weibo-computer',
                    jieshao: '科技前沿、学院动态'
                }
            ]
        },

        // 抖音账号配置
        douyin: {
            xiaoji: [
                {
                    mingcheng: '校团委',
                    touxiang: 'https://picsum.photos/200?random=10',
                    lianjie: 'https://example.com/douyin-youth',
                    jieshao: '记录精彩校园生活'
                }
            ],
            wenke: [
                {
                    mingcheng: '新闻传播学院',
                    touxiang: 'https://picsum.photos/200?random=11',
                    lianjie: 'https://example.com/douyin-journalism',
                    jieshao: '校园资讯、短视频创作'
                }
            ]
        },

        // B站账号配置
        bilibili: {
            xiaoji: [
                {
                    mingcheng: '校团委',
                    touxiang: 'https://picsum.photos/200?random=12',
                    lianjie: 'https://example.com/bilibili-youth',
                    jieshao: '分享校园精彩瞬间'
                }
            ],
            ligong: [
                {
                    mingcheng: '计算机学院',
                    touxiang: 'https://picsum.photos/200?random=13',
                    lianjie: 'https://example.com/bilibili-computer',
                    jieshao: '技术分享、学院活动'
                }
            ]
        }
    }
};

/**
 * 配置文件使用说明：
 * 
 * 1. 新增平台：
 *    - 在 pingtai 数组中添加新平台配置
 *    - 在 zhanghao 对象中创建对应平台的账号配置
 * 
 * 2. 新增分类：
 *    - 在 fenlei 数组中添加新分类配置
 *    - 在各平台的账号配置中添加对应分类的数组
 * 
 * 3. 新增账号：
 *    - 在对应平台的对应分类数组中添加账号配置
 * 
 * 4. 删除内容：
 *    - 删除平台：移除 pingtai 中的配置项，同时移除 zhanghao 中对应的配置
 *    - 删除分类：移除 fenlei 中的配置项，同时移除各平台中对应的分类配置
 *    - 删除账号：直接移除对应数组中的账号配置项
 * 
 * 注意事项：
 * 1. biaoshi 必须唯一，且只能包含字母、数字和下划线
 * 2. 添加新平台或分类时，确保 biaoshi 不与现有配置冲突
 * 3. lianjie 需要是完整的链接地址
 * 4. touxiang 图片建议使用正方形图片，推荐尺寸 200x200
 */ 