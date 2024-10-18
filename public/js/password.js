document.getElementById('login-btn').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('/api/admin/login', { password });
        if (response.data.success) {
            window.location.href = '/@admin';
        } else {
            alert('密码错误');
        }
    } catch (error) {
        alert('登录失败');
    }
});