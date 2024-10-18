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

    let currentPage = 1;
    const pageSize = 50;
    let currentSortField = 'lastLoginTime';
    let startDate = '';
    let endDate = '';

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
        loadUsers(currentPage);
    });

    updateNetdiskBtn.addEventListener('click', async () => {
        const netdiskLink = netdiskLinkInput.value;
        const sharePassword = sharePasswordInput.value;
        try {
            const response = await axios.post('/api/admin/update-netdisk', { netdiskLink, sharePassword });
            alert(response.data.message);
        } catch (error) {
            alert('更新失败: ' + error.response.data.message);
        }
    });

    sortSelect.addEventListener('change', function() {
        currentSortField = this.value;
        currentPage = 1;
        loadUsers(currentPage);
    });

    queryBtn.addEventListener('click', () => {
        startDate = startDateInput.value;
        endDate = endDateInput.value;
        currentPage = 1;
        loadUsers(currentPage);
    });

    async function loadUsers(page) {
        try {
            const response = await axios.get('/api/admin/users', {
                params: {
                    page,
                    pageSize,
                    sortBy: currentSortField,
                    startDate,
                    endDate
                }
            });
            const users = response.data.users;
            const totalPages = response.data.totalPages;

            usersTable.innerHTML = '';
            users.forEach(user => {
                const row = usersTable.insertRow();
                row.insertCell(0).textContent = user.phoneNumber;
                row.insertCell(1).textContent = new Date(user.lastLoginTime).toLocaleString();
                row.insertCell(2).textContent = new Date(user.createdAt).toLocaleString();
            });

            currentPageSpan.textContent = page;
            prevPageBtn.disabled = page === 1;
            nextPageBtn.disabled = page === totalPages;
        } catch (error) {
            alert('加载用户数据失败: ' + error.response.data.message);
        }
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadUsers(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        loadUsers(currentPage);
    });
});
