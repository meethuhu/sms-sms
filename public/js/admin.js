document.addEventListener('DOMContentLoaded', function() {
    const netdiskBtn = document.getElementById('netdisk-btn');
    const usersBtn = document.getElementById('users-btn');
    const netdiskPage = document.getElementById('netdisk-page');
    const usersPage = document.getElementById('users-page');
    const updateNetdiskBtn = document.getElementById('update-netdisk-btn');
    const netdiskLinkInput = document.getElementById('netdisk-link');
    const sharePasswordInput = document.getElementById('share-password');
    const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const sortSelect = document.getElementById('sort-select');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const queryBtn = document.getElementById('query-btn');
    const totalPagesSpan = document.getElementById('total-pages');
    const pageInput = document.getElementById('page-input');
    const goToPageBtn = document.getElementById('go-to-page');
    const todayBtn = document.getElementById('today-btn');

    let currentPage = 1;
    const pageSize = 50;
    let currentSortField = 'createdAt';  // 默认排序字段改为 createdAt
    let startDate = '';
    let endDate = '';
    let totalPages = 1;

    netdiskBtn.addEventListener('click', () => {
        netdiskPage.style.display = 'block';
        usersPage.style.display = 'none';
        netdiskBtn.classList.add('active');
        usersBtn.classList.remove('active');
    });

    usersBtn.addEventListener('click', () => {
        netdiskPage.style.display = 'none';
        usersPage.style.display = 'block';
        netdiskBtn.classList.remove('active');
        usersBtn.classList.add('active');
        loadUsers(currentPage, currentSortField);
    });

    // 初始加载用户页面
    loadUsers(currentPage, currentSortField);

    updateNetdiskBtn.addEventListener('click', async () => {
        const share_link = netdiskLinkInput.value;
        const password = sharePasswordInput.value;
        try {
            const response = await axios.post('/api/admin/update-netdisk', { share_link, password });
            alert(response.data.message);
        } catch (error) {
            alert('更新失败: ' + error.response.data.message);
        }
    });

    sortSelect.addEventListener('change', function() {
        currentSortField = this.value;
        startDateInput.value = '';
        endDateInput.value = '';
        currentPage = 1;
        loadUsers(currentPage, currentSortField);
    });

    queryBtn.addEventListener('click', () => {
        startDate = startDateInput.value;
        endDate = endDateInput.value;
        currentPage = 1;
        loadUsers(currentPage, currentSortField);
    });

    todayBtn.addEventListener('click', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // 设置时间为当天的开始
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (currentSortField === 'lastLoginTime') {
            // 如果是按最后登录时间排序，我们查询今天的登录
            startDateInput.value = formatDate(today);
            endDateInput.value = formatDate(tomorrow);
        } else if (currentSortField === 'createdAt') {
            // 如果是按注册时间排序，我们查询今天的注册
            startDateInput.value = formatDate(today);
            endDateInput.value = formatDate(tomorrow);
        }
        currentPage = 1;
        loadUsers(currentPage, currentSortField);
    });

    goToPageBtn.addEventListener('click', () => {
        const pageNumber = parseInt(pageInput.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            currentPage = pageNumber;
            loadUsers(currentPage, currentSortField);
        } else {
            alert('请输入有效的页码');
        }
    });

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function loadUsers(page, sortBy) {
        try {
            const response = await axios.get('/api/admin/users', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    startDate: startDateInput.value || undefined,
                    endDate: endDateInput.value || undefined
                }
            });
            const users = response.data.users;
            totalPages = response.data.totalPages;

            usersTable.innerHTML = '';
            users.forEach(user => {
                const row = usersTable.insertRow();
                row.insertCell(0).textContent = user.id;
                row.insertCell(1).textContent = user.phoneNumber;
                row.insertCell(2).textContent = formatDateTime(new Date(user.lastLoginTime));
                row.insertCell(3).textContent = formatDateTime(new Date(user.createdAt));
            });

            currentPageSpan.textContent = page;
            totalPagesSpan.textContent = `共 ${totalPages} 页`;
            prevPageBtn.disabled = page === 1;
            nextPageBtn.disabled = page === totalPages;
            pageInput.max = totalPages;
        } catch (error) {
            alert('加载用户数据失败: ' + error.response.data.message);
        }
    }

    function formatDateTime(date) {
        return date.toLocaleString('zh-CN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'  // 使用中国时区
        });
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadUsers(currentPage, currentSortField);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        loadUsers(currentPage, currentSortField);
    });
});
