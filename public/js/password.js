document.getElementById('login-btn').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('/api/admin/login', { password });
        if (response.data.success) {
            window.location.href = '/@admin';
        } else {
            alert(response.data.message || '密码错误');
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            alert(error.response.data.message);
        } else {
            alert('登录失败');
        }
    }
});
