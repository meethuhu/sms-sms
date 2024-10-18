const phoneInput = document.getElementById('phone-number');
const sendCodeBtn = document.getElementById('send-code-btn');
const codeInput = document.getElementById('verification-code');
const verifyBtn = document.getElementById('verify-btn');
const notificationElement = document.getElementById('notification');

function showNotification(message, isError = false) {
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';
  notificationElement.classList.add('show', isError ? 'error' : 'success');
  
  setTimeout(() => {
    notificationElement.classList.remove('show', 'error', 'success');
    setTimeout(() => notificationElement.style.display = 'none', 300);
  }, 3000);
}

async function handleRequest(url, data, successMessage) {
  try {
    const response = await axios.post(url, data);
    showNotification(successMessage || response.data.message);
    return response.data;
  } catch (error) {
    showNotification(error.response?.data.message || '操作失败', true);
    throw error;
  }
}

sendCodeBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  if (!phoneNumber) {
    return showNotification('请输入手机号', true);
  }
  await handleRequest('/api/auth/send-code', { phoneNumber }, '验证码已发送');
});

verifyBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  const code = codeInput.value;
  if (!phoneNumber || !code) {
    return showNotification('请输入手机号和验证码', true);
  }

  try {
    await handleRequest('/api/auth/verify-code', { phoneNumber, code }, '验证成功');
    const { netdiskLink } = await axios.get('/api/netdisk/info').then(res => res.data);
    window.location.href = netdiskLink;
  } catch (error) {
    console.error('验证或获取网盘信息失败:', error);
  }
});
