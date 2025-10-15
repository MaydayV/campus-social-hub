/**
 * 管理后台核心脚本
 * 实现平台、分类、账号的增删改查，以及 Excel 导入导出功能
 */

// 全局数据存储
let configData = {
    pingtai: [],
    fenlei: [],
    zhanghao: {}
};

// 初始化：从现有配置加载数据
document.addEventListener('DOMContentLoaded', function() {
    loadConfigData();
    renderPlatforms();
    renderCategories();
    renderAccounts();
    updateFilterOptions();
});

// 加载现有配置数据
function loadConfigData() {
    if (typeof platformConfig !== 'undefined') {
        configData = JSON.parse(JSON.stringify(platformConfig));
    }
}

// ==================== 标签页切换 ====================
function switchTab(tabName) {
    // 更新导航激活状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // 更新内容区激活状态
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ==================== 平台管理 ====================
function renderPlatforms() {
    const tbody = document.getElementById('platformsTableBody');
    tbody.innerHTML = '';
    
    if (configData.pingtai.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px; color: #999;">暂无平台数据，点击右上角添加</td></tr>';
        return;
    }
    
    configData.pingtai.forEach((platform, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><code>${platform.pingtai}</code></td>
            <td>${platform.mingcheng}</td>
            <td class="actions">
                <button class="btn btn-primary btn-sm" onclick="editPlatform(${index})">编辑</button>
                <button class="btn btn-danger btn-sm" onclick="deletePlatform(${index})">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showAddPlatformModal() {
    document.getElementById('platformModalTitle').textContent = '添加平台';
    document.getElementById('platformIndex').value = '';
    document.getElementById('platformId').value = '';
    document.getElementById('platformName').value = '';
    document.getElementById('platformId').disabled = false;
    showModal('platformModal');
}

function editPlatform(index) {
    const platform = configData.pingtai[index];
    document.getElementById('platformModalTitle').textContent = '编辑平台';
    document.getElementById('platformIndex').value = index;
    document.getElementById('platformId').value = platform.pingtai;
    document.getElementById('platformName').value = platform.mingcheng;
    document.getElementById('platformId').disabled = true; // 编辑时不允许修改标识
    showModal('platformModal');
}

function savePlatform() {
    const index = document.getElementById('platformIndex').value;
    const pingtai = document.getElementById('platformId').value.trim();
    const mingcheng = document.getElementById('platformName').value.trim();
    
    // 验证
    if (!pingtai || !mingcheng) {
        showToast('请填写所有必填项', 'error');
        return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(pingtai)) {
        showToast('平台标识只能包含字母、数字和下划线', 'error');
        return;
    }
    
    // 检查标识是否重复
    if (index === '') {
        const exists = configData.pingtai.some(p => p.pingtai === pingtai);
        if (exists) {
            showToast('该平台标识已存在', 'error');
            return;
        }
    }
    
    const platformData = { pingtai, mingcheng };
    
    if (index === '') {
        // 新增
        configData.pingtai.push(platformData);
        // 在 zhanghao 中创建对应的空对象
        configData.zhanghao[pingtai] = {};
        showToast('平台添加成功', 'success');
    } else {
        // 编辑
        configData.pingtai[index] = platformData;
        showToast('平台更新成功', 'success');
    }
    
    closeModal('platformModal');
    renderPlatforms();
    updateFilterOptions();
}

function deletePlatform(index) {
    const platform = configData.pingtai[index];
    
    if (!confirm(`确定要删除平台"${platform.mingcheng}"吗？\n删除后，该平台下的所有账号也将被删除！`)) {
        return;
    }
    
    // 删除平台
    configData.pingtai.splice(index, 1);
    // 删除该平台的所有账号
    delete configData.zhanghao[platform.pingtai];
    
    showToast('平台删除成功', 'success');
    renderPlatforms();
    renderAccounts();
    updateFilterOptions();
}

// ==================== 分类管理 ====================
function renderCategories() {
    const tbody = document.getElementById('categoriesTableBody');
    tbody.innerHTML = '';
    
    if (configData.fenlei.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px; color: #999;">暂无分类数据，点击右上角添加</td></tr>';
        return;
    }
    
    configData.fenlei.forEach((category, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><code>${category.biaoshi}</code></td>
            <td>${category.mingcheng}</td>
            <td class="actions">
                <button class="btn btn-primary btn-sm" onclick="editCategory(${index})">编辑</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">删除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showAddCategoryModal() {
    document.getElementById('categoryModalTitle').textContent = '添加分类';
    document.getElementById('categoryIndex').value = '';
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryId').disabled = false;
    showModal('categoryModal');
}

function editCategory(index) {
    const category = configData.fenlei[index];
    document.getElementById('categoryModalTitle').textContent = '编辑分类';
    document.getElementById('categoryIndex').value = index;
    document.getElementById('categoryId').value = category.biaoshi;
    document.getElementById('categoryName').value = category.mingcheng;
    document.getElementById('categoryId').disabled = true; // 编辑时不允许修改标识
    showModal('categoryModal');
}

function saveCategory() {
    const index = document.getElementById('categoryIndex').value;
    const biaoshi = document.getElementById('categoryId').value.trim();
    const mingcheng = document.getElementById('categoryName').value.trim();
    
    // 验证
    if (!biaoshi || !mingcheng) {
        showToast('请填写所有必填项', 'error');
        return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(biaoshi)) {
        showToast('分类标识只能包含字母、数字和下划线', 'error');
        return;
    }
    
    // 检查标识是否重复
    if (index === '') {
        const exists = configData.fenlei.some(c => c.biaoshi === biaoshi);
        if (exists) {
            showToast('该分类标识已存在', 'error');
            return;
        }
    }
    
    const categoryData = { biaoshi, mingcheng };
    
    if (index === '') {
        // 新增
        configData.fenlei.push(categoryData);
        // 在每个平台的 zhanghao 中创建对应的空数组
        Object.keys(configData.zhanghao).forEach(platform => {
            configData.zhanghao[platform][biaoshi] = [];
        });
        showToast('分类添加成功', 'success');
    } else {
        // 编辑
        configData.fenlei[index] = categoryData;
        showToast('分类更新成功', 'success');
    }
    
    closeModal('categoryModal');
    renderCategories();
    updateFilterOptions();
}

function deleteCategory(index) {
    const category = configData.fenlei[index];
    
    if (!confirm(`确定要删除分类"${category.mingcheng}"吗？\n删除后，该分类下的所有账号也将被删除！`)) {
        return;
    }
    
    // 删除分类
    configData.fenlei.splice(index, 1);
    // 删除该分类下的所有账号
    Object.keys(configData.zhanghao).forEach(platform => {
        delete configData.zhanghao[platform][category.biaoshi];
    });
    
    showToast('分类删除成功', 'success');
    renderCategories();
    renderAccounts();
    updateFilterOptions();
}

// ==================== 账号管理 ====================
function renderAccounts() {
    const tbody = document.getElementById('accountsTableBody');
    tbody.innerHTML = '';
    
    let accountCount = 0;
    let rowIndex = 1;
    
    // 遍历所有平台和分类
    configData.pingtai.forEach(platform => {
        const platformId = platform.pingtai;
        const platformAccounts = configData.zhanghao[platformId] || {};
        
        configData.fenlei.forEach(category => {
            const categoryId = category.biaoshi;
            const accounts = platformAccounts[categoryId] || [];
            
            accounts.forEach((account, accountIndex) => {
                accountCount++;
                const tr = document.createElement('tr');
                tr.setAttribute('data-platform', platformId);
                tr.setAttribute('data-category', categoryId);
                
                tr.innerHTML = `
                    <td>${rowIndex++}</td>
                    <td><span style="background: #e6f7ff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${platform.mingcheng}</span></td>
                    <td><span style="background: #f0f5ff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${category.mingcheng}</span></td>
                    <td><strong>${account.mingcheng}</strong></td>
                    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${account.jieshao || '-'}</td>
                    <td><img src="${account.touxiang}" class="avatar-preview" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E'"></td>
                    <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><a href="${account.lianjie}" target="_blank" style="color: #1890ff;">${account.lianjie}</a></td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm" onclick="editAccount('${platformId}', '${categoryId}', ${accountIndex})">编辑</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAccount('${platformId}', '${categoryId}', ${accountIndex})">删除</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
    });
    
    if (accountCount === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #999;">暂无账号数据，点击右上角添加</td></tr>';
    }
}

function showAddAccountModal() {
    document.getElementById('accountModalTitle').textContent = '添加账号';
    document.getElementById('accountPlatformOld').value = '';
    document.getElementById('accountCategoryOld').value = '';
    document.getElementById('accountIndex').value = '';
    document.getElementById('accountPlatform').value = '';
    document.getElementById('accountCategory').value = '';
    document.getElementById('accountName').value = '';
    document.getElementById('accountDesc').value = '';
    document.getElementById('accountAvatar').value = '';
    document.getElementById('accountLink').value = '';
    
    // 填充平台和分类下拉框
    updateAccountModalSelects();
    showModal('accountModal');
}

function editAccount(platformId, categoryId, index) {
    const account = configData.zhanghao[platformId][categoryId][index];
    
    document.getElementById('accountModalTitle').textContent = '编辑账号';
    document.getElementById('accountPlatformOld').value = platformId;
    document.getElementById('accountCategoryOld').value = categoryId;
    document.getElementById('accountIndex').value = index;
    document.getElementById('accountPlatform').value = platformId;
    document.getElementById('accountCategory').value = categoryId;
    document.getElementById('accountName').value = account.mingcheng;
    document.getElementById('accountDesc').value = account.jieshao || '';
    document.getElementById('accountAvatar').value = account.touxiang;
    document.getElementById('accountLink').value = account.lianjie;
    
    updateAccountModalSelects();
    showModal('accountModal');
}

function saveAccount() {
    const platformOld = document.getElementById('accountPlatformOld').value;
    const categoryOld = document.getElementById('accountCategoryOld').value;
    const index = document.getElementById('accountIndex').value;
    
    const platform = document.getElementById('accountPlatform').value;
    const category = document.getElementById('accountCategory').value;
    const mingcheng = document.getElementById('accountName').value.trim();
    const jieshao = document.getElementById('accountDesc').value.trim();
    const touxiang = document.getElementById('accountAvatar').value.trim();
    const lianjie = document.getElementById('accountLink').value.trim();
    
    // 验证
    if (!platform || !category || !mingcheng || !touxiang || !lianjie) {
        showToast('请填写所有必填项', 'error');
        return;
    }
    
    if (!lianjie.match(/^https?:\/\/.+/)) {
        showToast('链接地址必须以 http:// 或 https:// 开头', 'error');
        return;
    }
    
    const accountData = { mingcheng, jieshao, touxiang, lianjie };
    
    if (index === '') {
        // 新增
        if (!configData.zhanghao[platform]) {
            configData.zhanghao[platform] = {};
        }
        if (!configData.zhanghao[platform][category]) {
            configData.zhanghao[platform][category] = [];
        }
        configData.zhanghao[platform][category].push(accountData);
        showToast('账号添加成功', 'success');
    } else {
        // 编辑
        if (platformOld === platform && categoryOld === category) {
            // 同平台同分类，直接更新
            configData.zhanghao[platform][category][index] = accountData;
        } else {
            // 跨平台或跨分类，需要先删除旧位置的数据
            configData.zhanghao[platformOld][categoryOld].splice(index, 1);
            // 再添加到新位置
            if (!configData.zhanghao[platform]) {
                configData.zhanghao[platform] = {};
            }
            if (!configData.zhanghao[platform][category]) {
                configData.zhanghao[platform][category] = [];
            }
            configData.zhanghao[platform][category].push(accountData);
        }
        showToast('账号更新成功', 'success');
    }
    
    closeModal('accountModal');
    renderAccounts();
}

function deleteAccount(platformId, categoryId, index) {
    const account = configData.zhanghao[platformId][categoryId][index];
    
    if (!confirm(`确定要删除账号"${account.mingcheng}"吗？`)) {
        return;
    }
    
    configData.zhanghao[platformId][categoryId].splice(index, 1);
    showToast('账号删除成功', 'success');
    renderAccounts();
}

function updateAccountModalSelects() {
    const platformSelect = document.getElementById('accountPlatform');
    const categorySelect = document.getElementById('accountCategory');
    
    platformSelect.innerHTML = '<option value="">请选择平台</option>';
    configData.pingtai.forEach(p => {
        platformSelect.innerHTML += `<option value="${p.pingtai}">${p.mingcheng}</option>`;
    });
    
    categorySelect.innerHTML = '<option value="">请选择分类</option>';
    configData.fenlei.forEach(c => {
        categorySelect.innerHTML += `<option value="${c.biaoshi}">${c.mingcheng}</option>`;
    });
}

function updateFilterOptions() {
    const platformFilter = document.getElementById('filterPlatform');
    const categoryFilter = document.getElementById('filterCategory');
    
    if (platformFilter) {
        platformFilter.innerHTML = '<option value="">全部平台</option>';
        configData.pingtai.forEach(p => {
            platformFilter.innerHTML += `<option value="${p.pingtai}">${p.mingcheng}</option>`;
        });
    }
    
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">全部分类</option>';
        configData.fenlei.forEach(c => {
            categoryFilter.innerHTML += `<option value="${c.biaoshi}">${c.mingcheng}</option>`;
        });
    }
}

function filterAccounts() {
    const platformFilter = document.getElementById('filterPlatform').value;
    const categoryFilter = document.getElementById('filterCategory').value;
    
    const rows = document.querySelectorAll('#accountsTableBody tr');
    
    rows.forEach(row => {
        const platform = row.getAttribute('data-platform');
        const category = row.getAttribute('data-category');
        
        let show = true;
        if (platformFilter && platform !== platformFilter) show = false;
        if (categoryFilter && category !== categoryFilter) show = false;
        
        row.style.display = show ? '' : 'none';
    });
}

// ==================== Excel 导入导出 ====================
function exportExcel() {
    try {
        // 创建工作簿
        const wb = XLSX.utils.book_new();
        
        // Sheet 1: 平台配置
        const platformsData = [['平台标识', '平台名称']];
        configData.pingtai.forEach(p => {
            platformsData.push([p.pingtai, p.mingcheng]);
        });
        const ws1 = XLSX.utils.aoa_to_sheet(platformsData);
        XLSX.utils.book_append_sheet(wb, ws1, '平台配置');
        
        // Sheet 2: 分类配置
        const categoriesData = [['分类标识', '分类名称']];
        configData.fenlei.forEach(c => {
            categoriesData.push([c.biaoshi, c.mingcheng]);
        });
        const ws2 = XLSX.utils.aoa_to_sheet(categoriesData);
        XLSX.utils.book_append_sheet(wb, ws2, '分类配置');
        
        // Sheet 3: 账号配置
        const accountsData = [['平台标识', '分类标识', '账号名称', '头像URL', '链接URL', '简介']];
        configData.pingtai.forEach(platform => {
            const platformId = platform.pingtai;
            const platformAccounts = configData.zhanghao[platformId] || {};
            
            configData.fenlei.forEach(category => {
                const categoryId = category.biaoshi;
                const accounts = platformAccounts[categoryId] || [];
                
                accounts.forEach(account => {
                    accountsData.push([
                        platformId,
                        categoryId,
                        account.mingcheng,
                        account.touxiang,
                        account.lianjie,
                        account.jieshao || ''
                    ]);
                });
            });
        });
        const ws3 = XLSX.utils.aoa_to_sheet(accountsData);
        XLSX.utils.book_append_sheet(wb, ws3, '账号配置');
        
        // 导出文件
        XLSX.writeFile(wb, `新媒体平台配置_${new Date().toISOString().slice(0,10)}.xlsx`);
        showToast('Excel 导出成功', 'success');
    } catch (error) {
        showToast('导出失败：' + error.message, 'error');
    }
}

function importExcel() {
    const input = document.getElementById('excelFileInput');
    input.click();
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // 读取平台配置
                const platformSheet = workbook.Sheets['平台配置'];
                if (platformSheet) {
                    const platformData = XLSX.utils.sheet_to_json(platformSheet, { header: 1 });
                    configData.pingtai = [];
                    for (let i = 1; i < platformData.length; i++) {
                        if (platformData[i][0] && platformData[i][1]) {
                            configData.pingtai.push({
                                pingtai: platformData[i][0].toString().trim(),
                                mingcheng: platformData[i][1].toString().trim()
                            });
                        }
                    }
                }
                
                // 读取分类配置
                const categorySheet = workbook.Sheets['分类配置'];
                if (categorySheet) {
                    const categoryData = XLSX.utils.sheet_to_json(categorySheet, { header: 1 });
                    configData.fenlei = [];
                    for (let i = 1; i < categoryData.length; i++) {
                        if (categoryData[i][0] && categoryData[i][1]) {
                            configData.fenlei.push({
                                biaoshi: categoryData[i][0].toString().trim(),
                                mingcheng: categoryData[i][1].toString().trim()
                            });
                        }
                    }
                }
                
                // 初始化 zhanghao 结构
                configData.zhanghao = {};
                configData.pingtai.forEach(p => {
                    configData.zhanghao[p.pingtai] = {};
                    configData.fenlei.forEach(c => {
                        configData.zhanghao[p.pingtai][c.biaoshi] = [];
                    });
                });
                
                // 读取账号配置
                const accountSheet = workbook.Sheets['账号配置'];
                if (accountSheet) {
                    const accountData = XLSX.utils.sheet_to_json(accountSheet, { header: 1 });
                    for (let i = 1; i < accountData.length; i++) {
                        const row = accountData[i];
                        if (row[0] && row[1] && row[2] && row[3] && row[4]) {
                            const platformId = row[0].toString().trim();
                            const categoryId = row[1].toString().trim();
                            
                            if (configData.zhanghao[platformId] && configData.zhanghao[platformId][categoryId]) {
                                configData.zhanghao[platformId][categoryId].push({
                                    mingcheng: row[2].toString().trim(),
                                    touxiang: row[3].toString().trim(),
                                    lianjie: row[4].toString().trim(),
                                    jieshao: row[5] ? row[5].toString().trim() : ''
                                });
                            }
                        }
                    }
                }
                
                // 刷新所有显示
                renderPlatforms();
                renderCategories();
                renderAccounts();
                updateFilterOptions();
                
                showToast('Excel 导入成功', 'success');
                input.value = ''; // 清空文件选择
            } catch (error) {
                showToast('导入失败：' + error.message, 'error');
            }
        };
        reader.readAsArrayBuffer(file);
    };
}

// ==================== 生成配置文件 ====================
function generateConfig() {
    try {
        // 生成配置文件内容
        const configContent = `/**
 * 学校新媒体平台配置文件
 * 
 * 此文件由管理后台自动生成
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

const platformConfig = ${JSON.stringify(configData, null, 4)};
`;
        
        // 创建下载
        const blob = new Blob([configContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.js';
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('配置文件生成成功，请下载后替换 js/config.js', 'success');
    } catch (error) {
        showToast('生成失败：' + error.message, 'error');
    }
}

// ==================== 工具函数 ====================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="font-weight: 500;">${message}</div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
};

