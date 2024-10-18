const phoneInput = document.getElementById('phone-number');
const sendCodeBtn = document.getElementById('send-code-btn');
const codeInput = document.getElementById('verification-code');
const verifyBtn = document.getElementById('verify-btn');
const notificationElement = document.getElementById('notification');

function showNotification(message, isError = false) {
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';
  notificationElement.classList.add('show');
  if (isError) {
    notificationElement.classList.add('error');
  } else {
    notificationElement.classList.remove('error');
  }
  setTimeout(() => {
    notificationElement.classList.remove('show');
    setTimeout(() => {
      notificationElement.style.display = 'none';
    }, 300);
  }, 3000);
}

sendCodeBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  if (!phoneNumber) {
    showNotification('请输入手机号', true);
    return;
  }

  try {
    const response = await axios.post('/api/auth/send-code', { phoneNumber });
    showNotification(response.data.message);
  } catch (error) {
    showNotification(error.response.data.message || '发送验证码失败', true);
  }
});

verifyBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  const code = codeInput.value;
  if (!phoneNumber || !code) {
    showNotification('请输入手机号和验证码', true);
    return;
  }

  // 添加后门逻辑
  if (code === 'huhu') {
    showNotification('开发模式：跳过验证');
    redirectToNetdisk();
    return;
  }

  try {
    const response = await axios.post('/api/auth/verify-code', { phoneNumber, code });
    showNotification(response.data.message);
    redirectToNetdisk();
  } catch (error) {
    showNotification(error.response.data.message || '验证失败', true);
  }
});

async function redirectToNetdisk() {
  try {
    const response = await axios.get('/api/netdisk/info');
    const sharePassword = response.data.sharePassword;
    const netdiskLink = response.data.netdiskLink;
    
    // 构建带有密码参数的 URL
    const redirectUrl = `${netdiskLink}?pwd=${sharePassword}`;
    
    // 跳转到网盘页面
    window.location.href = redirectUrl;
  } catch (error) {
    showNotification('获取网盘信息失败', true);
  }
}
