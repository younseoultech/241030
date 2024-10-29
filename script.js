document.addEventListener('DOMContentLoaded', () => {
  const bigBangMessage = document.getElementById('bigbang-message');
  const loadingMessage = document.getElementById('loading-message');
  const bufferValue = document.getElementById('buffer-value');
  const particleCanvas = document.getElementById('particle-canvas');
  const ctx = particleCanvas.getContext('2d');
  let buffer = 0;
  let dragging = false;
  let particles = [];

  // 클릭 시 버퍼링 메시지 표시
  bigBangMessage.addEventListener('click', () => {
    bigBangMessage.classList.add('hidden'); // 빅뱅 메시지 숨김
    loadingMessage.classList.remove('hidden'); // 버퍼링 메시지 표시
  });

  // 드래그 시작 / 종료 이벤트
  window.addEventListener('mousedown', () => dragging = true);
  window.addEventListener('mouseup', () => dragging = false);

  // 드래그 시 버퍼링 값 증가
  window.addEventListener('mousemove', () => {
    if (dragging && buffer < 100) {
      buffer += 0.25; // 느리게 증가
      bufferValue.textContent = `${Math.floor(buffer)}%`;

      if (buffer >= 100) {
        setTimeout(() => {
          window.location.href = 'spline2.html'; // 두 번째 Spline 페이지로 이동
        }, 500); // 0.5초 후 이동
      }
    }
  });

  // 파티클 생성 함수
  function createParticle(x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = Math.random() * 5 + 2;
      particles.push({ x, y, vx, vy, size, alpha: 1 });
    }
  }

  // 파티클 업데이트 및 렌더링 함수
  function updateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles = particles.filter(p => p.alpha > 0);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    });

    requestAnimationFrame(updateParticles);
  }

  // 캔버스 초기화 및 리사이즈 처리
  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // 마우스 클릭 시 파티클 생성
  window.addEventListener('click', (event) => {
    createParticle(event.clientX, event.clientY);
  });

  updateParticles(); // 파티클 애니메이션 시작
});
