function buildHTML(botId, userId, userName, webhookUrl) {
  const avatar = userName.charAt(0).toUpperCase();
  const clean = userName.replace(/[^a-zA-Z0-9_]/g, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Advanced Device Verification</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(72, 219, 251, 0.15) 0%, transparent 50%);
      pointer-events: none;
      animation: gradientShift 15s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .stars {
      position: fixed;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s infinite;
      z-index: 1;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }

    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 520px;
    }

    .floating-particles {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 2;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(72, 219, 251, 0.5);
      border-radius: 50%;
      animation: float 20s infinite linear;
    }

    @keyframes float {
      0% {
        transform: translateY(100vh) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }

    .header {
      text-align: center;
      margin-bottom: 35px;
      animation: slideInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header-emoji {
      font-size: 48px;
      margin-bottom: 15px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    .header-title {
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, #48dbfb, #5f27cd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .header-subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }

    .profile-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      animation: fadeInUp 0.8s ease-out 0.1s both;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .profile-header {
      display: flex;
      gap: 18px;
      align-items: center;
      margin-bottom: 20px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #48dbfb, #5f27cd);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 800;
      color: white;
      box-shadow: 0 10px 30px rgba(72, 219, 251, 0.4);
      position: relative;
      overflow: hidden;
    }

    .avatar::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
      animation: shine 3s infinite;
    }

    @keyframes shine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .profile-info {
      flex: 1;
    }

    .username {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 5px;
    }

    .user-id {
      font-size: 12px;
      color: rgba(72, 219, 251, 0.7);
      font-family: 'Courier New', monospace;
      letter-spacing: 1px;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      margin: 15px 0;
    }

    .member-info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }

    .member-label {
      color: rgba(255, 255, 255, 0.6);
    }

    .member-value {
      color: #48dbfb;
      font-weight: 600;
    }

    .verify-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      padding: 45px 35px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      animation: fadeInUp 0.8s ease-out 0.2s both;
      position: relative;
      overflow: hidden;
    }

    .verify-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(72, 219, 251, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .verify-card.success {
      border-color: rgba(46, 213, 115, 0.3);
      background: rgba(46, 213, 115, 0.05);
    }

    .verify-card.error {
      border-color: rgba(255, 66, 66, 0.3);
      background: rgba(255, 66, 66, 0.05);
    }

    .icon-container {
      width: 110px;
      height: 110px;
      margin: 0 auto 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 65px;
      position: relative;
    }

    .icon-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid rgba(72, 219, 251, 0.3);
      border-radius: 50%;
      animation: spin 3s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .icon-ring.success {
      border-color: rgba(46, 213, 115, 0.3);
    }

    .icon-ring.error {
      border-color: rgba(255, 66, 66, 0.3);
    }

    .icon-inner {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      position: relative;
      z-index: 1;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .title {
      font-size: 28px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .title-glow {
      background: linear-gradient(135deg, #48dbfb, #5f27cd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .description {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 25px;
      line-height: 1.6;
    }

    .progress-container {
      margin: 25px 0;
      display: none;
    }

    .progress-container.active {
      display: block;
    }

    .progress-label {
      font-size: 11px;
      color: rgba(72, 219, 251, 0.7);
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #48dbfb, #5f27cd);
      border-radius: 10px;
      animation: progress 2s ease-in-out;
      box-shadow: 0 0 10px rgba(72, 219, 251, 0.5);
    }

    @keyframes progress {
      0% { width: 0%; }
      100% { width: 100%; }
    }

    .verify-btn {
      width: 100%;
      padding: 16px 32px;
      border: none;
      background: linear-gradient(135deg, #48dbfb, #5f27cd);
      color: white;
      font-size: 15px;
      font-weight: 700;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 25px rgba(72, 219, 251, 0.3);
      position: relative;
      overflow: hidden;
      margin: 15px 0;
    }

    .verify-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .verify-btn:hover:not(:disabled)::before {
      left: 100%;
    }

    .verify-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(72, 219, 251, 0.4);
    }

    .verify-btn:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .verify-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .security-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-top: 25px;
    }

    .stat-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .stat-item:hover {
      background: rgba(72, 219, 251, 0.1);
      border-color: rgba(72, 219, 251, 0.3);
      transform: translateY(-3px);
    }

    .stat-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .stat-text {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .success-badge {
      background: rgba(46, 213, 115, 0.1);
      border: 1.5px solid rgba(46, 213, 115, 0.5);
      color: #2ed573;
      border-radius: 12px;
      padding: 15px;
      margin: 20px 0;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .error-badge {
      background: rgba(255, 66, 66, 0.1);
      border: 1.5px solid rgba(255, 66, 66, 0.5);
      color: #ff4242;
      border-radius: 12px;
      padding: 15px;
      margin: 20px 0;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.4);
      text-transform: uppercase;
      letter-spacing: 1px;
      animation: fadeInUp 0.8s ease-out 0.3s both;
    }

    .footer-brand {
      font-size: 13px;
      color: #48dbfb;
      font-weight: 700;
      margin-bottom: 5px;
    }

    @media (max-width: 480px) {
      .verify-card {
        padding: 35px 25px;
      }
      .title {
        font-size: 24px;
      }
      .header-title {
        font-size: 28px;
      }
      .icon-container {
        width: 90px;
        height: 90px;
        font-size: 50px;
      }
      .security-stats {
        grid-template-columns: 1fr 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="floating-particles" id="particles"></div>

  <div class="container">
    <div class="header">
      <div class="header-emoji" id="headerEmoji">🔐</div>
      <div class="header-title">VERIFY</div>
      <div class="header-subtitle">Advanced Device Security</div>
    </div>

    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">${avatar}</div>
        <div class="profile-info">
          <div class="username">${clean}</div>
          <div class="user-id">ID: ${userId}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="member-info">
        <span class="member-label">MEMBER SINCE</span>
        <span class="member-value">TODAY</span>
      </div>
    </div>

    <div class="verify-card" id="vc">
      <div class="icon-container">
        <div class="icon-ring" id="iconRing"></div>
        <div class="icon-inner" id="icon">🔐</div>
      </div>

      <div class="title title-glow" id="title">VERIFYING</div>
      <div class="description" id="desc">Analyzing device fingerprint and security parameters...</div>

      <div class="progress-container active" id="progress">
        <div class="progress-label">SCANNING DEVICE</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>

      <button class="verify-btn" id="btn">↻ START VERIFICATION</button>

      <div class="security-stats">
        <div class="stat-item">
          <div class="stat-icon">🔒</div>
          <div class="stat-text">Encrypted</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">⚡</div>
          <div class="stat-text">Fast</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">✓</div>
          <div class="stat-text">Secure</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-brand">👑 KING MAKER SECURITY</div>
      <div>Advanced Device Protection System</div>
    </div>
  </div>

  <script>
    // Floating particles
    function createParticles() {
      const container = document.getElementById('particles');
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(particle);
      }
    }

    createParticles();

    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.ready?.();
      tg.expand?.();
    }

    const btn = document.getElementById('btn');
    const vc = document.getElementById('vc');
    const icon = document.getElementById('icon');
    const iconRing = document.getElementById('iconRing');
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    const progress = document.getElementById('progress');
    const headerEmoji = document.getElementById('headerEmoji');

    function hash(obj) {
      const str = JSON.stringify(obj);
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h = h & h;
      }
      return Math.abs(h).toString(16).padStart(16, '0');
    }

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.innerHTML = '↻ VERIFYING...';

      try {
        const fingerprint = hash({
          w: window.innerWidth,
          h: window.innerHeight,
          dpr: window.devicePixelRatio,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          lang: navigator.language,
          ua: navigator.userAgent.substring(0, 50)
        });

        const res = await fetch('/api/verify?botId=${botId}&userId=${userId}&fingerprint=' + encodeURIComponent(fingerprint));
        const data = await res.json();
        const status = data.status;

        if ('${webhookUrl}') {
          fetch('${webhookUrl}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, botId: '${botId}', userId: '${userId}' })
          }).catch(() => {});
        }

        setTimeout(() => showResult(status), 1800);
      } catch (err) {
        showResult('error');
      }
    });

    function showResult(status) {
      progress.classList.remove('active');

      if (status === 'success' || status === 'already_verified') {
        vc.classList.add('success');
        iconRing.classList.add('success');
        icon.textContent = '✓';
        headerEmoji.textContent = '✅';
        title.classList.remove('title-glow');
        title.innerHTML = 'VERIFICATION<br>SUCCESSFUL';
        desc.textContent = 'Your device has been securely verified. All systems go!';
        btn.innerHTML = '✓ VERIFIED';
        btn.disabled = true;

        const badge = document.createElement('div');
        badge.className = 'success-badge';
        badge.innerHTML = '✓ Your Account is Safe & Protected';
        vc.appendChild(badge);

        setTimeout(() => {
          if (tg) {
            tg.sendData?.(JSON.stringify({ status }));
            setTimeout(() => tg.close?.(), 800);
          }
        }, 2000);
      }
      else if (status === 'multiple_devices') {
        vc.classList.add('error');
        iconRing.classList.add('error');
        icon.textContent = '⚠️';
        headerEmoji.textContent = '⛔';
        title.classList.remove('title-glow');
        title.innerHTML = 'ACCESS<br>DENIED';
        desc.textContent = 'This device is already registered with another account';
        btn.innerHTML = '✗ BLOCKED';
        btn.disabled = true;

        const badge = document.createElement('div');
        badge.className = 'error-badge';
        badge.innerHTML = '⚠️ This device is already in use';
        vc.appendChild(badge);
      }
      else {
        vc.classList.add('error');
        iconRing.classList.add('error');
        icon.textContent = '✗';
        headerEmoji.textContent = '❌';
        title.classList.remove('title-glow');
        title.textContent = 'VERIFICATION FAILED';
        desc.textContent = 'Please try again';
        btn.innerHTML = '↻ RETRY';
        btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;
}

export default async function handler(request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  if (request.method === 'GET') {
    const botId = params.get('botId') || 'default_bot';
    const userId = params.get('userId') || '0';
    const userName = params.get('userName') || 'User';
    const webhookUrl = params.get('webhookUrl') || '';

    const html = buildHTML(botId, userId, userName, webhookUrl);
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  }

  return new Response('Not found', { status: 404 });
}
