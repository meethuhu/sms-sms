const phoneInput = document.getElementById('phone-number');
const sendCodeBtn = document.getElementById('send-code-btn');
const codeInput = document.getElementById('verification-code');
const verifyBtn = document.getElementById('verify-btn');
const loginPage = document.getElementById('login-page');
const guidePage = document.getElementById('guide-page');
const sharePasswordSpan = document.getElementById('share-password');
const netdiskLinkBtn = document.getElementById('netdisk-link-btn');

sendCodeBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  if (!phoneNumber) {
    alert('请输入手机号');
    return;
  }

  try {
    const response = await axios.post('/api/auth/send-code', { phoneNumber });
    alert(response.data.message);
  } catch (error) {
    alert(error.response.data.message || '发送验证码失败');
  }
});

verifyBtn.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value;
  const code = codeInput.value;
  if (!phoneNumber || !code) {
    alert('请输入手机号和验证码');
    return;
  }

  try {
    const response = await axios.post('/api/auth/verify-code', { phoneNumber, code });
    alert(response.data.message);
    showGuidePage();
  } catch (error) {
    alert(error.response.data.message || '验证失败');
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
    alert('获取网盘信息失败');
  }
}
