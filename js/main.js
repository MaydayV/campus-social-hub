document.addEventListener('DOMContentLoaded', function() {
    initPlatformTabs();
    initCategoryTabs();
    showAccounts(platformConfig.pingtai[0].pingtai, 'all');
});

function initPlatformTabs() {
    const tabsContainer = document.querySelector('.platform-tabs');
    
    platformConfig.pingtai.forEach((platform, index) => {
        const button = document.createElement('button');
        button.className = `tab-button ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-platform', platform.pingtai);
        button.textContent = platform.mingcheng;
        
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            const activeCategory = document.querySelector('.category-button.active');
            const categoryId = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
            
            showAccounts(platform.pingtai, categoryId);
        });
        
        tabsContainer.appendChild(button);
    });
}

function initCategoryTabs() {
    const categoryContainer = document.querySelector('.category-tabs');
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'category-tabs-container';
    categoryContainer.appendChild(scrollContainer);
    
    // 添加"全部"选项
    const allButton = document.createElement('button');
    allButton.className = 'category-button active';
    allButton.setAttribute('data-category', 'all');
    allButton.textContent = '全部';
    scrollContainer.appendChild(allButton);
    
    // 添加其他分类
    platformConfig.fenlei.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.setAttribute('data-category', category.biaoshi);
        button.textContent = category.mingcheng;
        scrollContainer.appendChild(button);
    });
    
    // 添加分类切换事件
    scrollContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-button')) {
            const buttons = document.querySelectorAll('.category-button');
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            scrollToCenter(e.target, scrollContainer);
            
            const activePlatform = document.querySelector('.tab-button.active');
            const platformId = activePlatform.getAttribute('data-platform');
            const categoryId = e.target.getAttribute('data-category');
            
            showAccounts(platformId, categoryId);
        }
    });

    // 初始化时确保激活的标签在中间
    const activeButton = scrollContainer.querySelector('.category-button.active');
    if (activeButton) {
        setTimeout(() => {
            scrollToCenter(activeButton, scrollContainer);
        }, 100);
    }
}

// 滚动到中间位置的函数
function scrollToCenter(element, container) {
    // 获取元素和容器的尺寸信息
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // 计算目标滚动位置
    const elementCenter = elementRect.left + elementRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const scrollLeft = container.scrollLeft + (elementCenter - containerCenter);
    
    // 平滑滚动
    container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
}

function showAccounts(platformId, categoryId) {
    const accountsGrid = document.querySelector('.accounts-grid');
    accountsGrid.innerHTML = '';
    
    const platformAccounts = platformConfig.zhanghao[platformId];
    
    if (!platformAccounts) {
        accountsGrid.innerHTML = '<div class="no-data">暂无数据</div>';
        return;
    }
    
    if (categoryId === 'all') {
        platformConfig.fenlei.forEach(category => {
            const accounts = platformAccounts[category.biaoshi];
            if (accounts && accounts.length > 0) {
                const displayAccounts = accounts.slice(0, 4);
                addCategorySection(accountsGrid, category.mingcheng, displayAccounts, true);
            }
        });
    } else {
        const accounts = platformAccounts[categoryId];
        if (accounts && accounts.length > 0) {
            const categoryName = platformConfig.fenlei.find(c => c.biaoshi === categoryId).mingcheng;
            addCategorySection(accountsGrid, categoryName, accounts, false);
        } else {
            accountsGrid.innerHTML = '<div class="no-data">该分类暂无数据</div>';
        }
    }
}

// 修改账号展示函数
function addCategorySection(container, categoryName, accounts, showMore) {
    const section = document.createElement('div');
    section.className = 'accounts-section';
    
    // 添加标题区域
    const titleContainer = document.createElement('div');
    titleContainer.className = 'category-header';
    
    const title = document.createElement('h2');
    title.className = 'category-title';
    title.textContent = categoryName;
    titleContainer.appendChild(title);
    
    if (showMore && accounts.length > 4) {
        const moreLink = document.createElement('a');
        moreLink.className = 'more-link';
        moreLink.textContent = '查看更多';
        moreLink.href = 'javascript:void(0)';
        moreLink.onclick = () => {
            const activeCategory = platformConfig.fenlei.find(c => c.mingcheng === categoryName);
            if (activeCategory) {
                document.querySelector(`.category-button[data-category="${activeCategory.biaoshi}"]`).click();
            }
        };
        titleContainer.appendChild(moreLink);
    }
    
    section.appendChild(titleContainer);
    
    // 添加账号列表
    const accountList = document.createElement('div');
    accountList.className = 'account-list';
    
    accounts.forEach(account => {
        const accountElement = document.createElement('a');
        accountElement.className = 'account-item';
        accountElement.href = account.lianjie;
        accountElement.target = '_blank';
        
        accountElement.innerHTML = `
            <img class="account-logo" src="${account.touxiang}" alt="${account.mingcheng}">
            <div class="account-info">
                <div class="account-name">${account.mingcheng}</div>
                ${account.jieshao ? `<div class="account-desc">${account.jieshao}</div>` : ''}
            </div>
            <div class="account-platform">查看</div>
        `;
        
        accountList.appendChild(accountElement);
    });
    
    section.appendChild(accountList);
    container.appendChild(section);
} 