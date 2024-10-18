const phoneInput = document.getElementById('phone-number');
const sendCodeBtn = document.getElementById('send-code-btn');
const codeInput = document.getElementById('verification-code');
const verifyBtn = document.getElementById('verify-btn');
const loginPage = document.getElementById('login-page');
const guidePage = document.getElementById('guide-page');
const sharePasswordSpan = document.getElementById('share-password');
const netdiskLinkBtn = document.getElementById('netdisk-link-btn');
const notificationElement = document.getElementById('notification');

function showNotification(message, isError = false) {
  notificationElement.textContent = message;
  notificationElement.style.display = 'block'; // 确保元素可见
  notificationElement.classList.add('show');
  if (isError) {
    notificationElement.classList.add('error');
  } else {
    notificationElement.classList.remove('error');
  }
  setTimeout(() => {
    notificationElement.classList.remove('show');
    setTimeout(() => {
      notificationElement.style.display = 'none'; // 隐藏元素
    }, 300); // 等待过渡效果结束
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

  try {
    const response = await axios.post('/api/auth/verify-code', { phoneNumber, code });
    showNotification(response.data.message);
    showGuidePage();
  } catch (error) {
    showNotification(error.response.data.message || '验证失败', true);
  }
});

async function showGuidePage() {
  try {
    const response = await axios.get('/api/netdisk/info');
    sharePasswordSpan.textContent = response.data.sharePassword;
    netdiskLinkBtn.onclick = () => window.open(response.data.netdiskLink, '_blank');
    loginPage.style.display = 'none';
    guidePage.style.display = 'block';
  } catch (error) {
    showNotification('获取网盘信息失败', true);
  }
}
