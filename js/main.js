(function () {
  /* ---- 滚动淡入动画 ---- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.card, .timeline-item, .emperor-card, .figure-card, .culture-card').forEach((el) => {
    el.classList.add('fade-in')
    observer.observe(el)
  })

  /* ---- 当前页面导航高亮 ---- */
  const navLinks = document.querySelectorAll('.nav-links a')
  const currentPath = window.location.pathname.split('/').pop() || 'index.html'
  navLinks.forEach((link) => {
    if (link.getAttribute('href').endsWith(currentPath)) {
      link.classList.add('active')
    }
  })

  /* ---- 返回顶部按钮（只有页面较长时显示）---- */
  const backBtn = document.createElement('button')
  backBtn.textContent = '↑'
  backBtn.setAttribute('aria-label', '返回顶部')
  Object.assign(backBtn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    background: '#a81c1c',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    opacity: '0',
    transition: 'opacity 0.3s',
    zIndex: '999',
  })
  document.body.appendChild(backBtn)

  window.addEventListener('scroll', () => {
    backBtn.style.opacity = window.scrollY > 500 ? '1' : '0'
  })

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})()

/* ---- 淡入动画关键帧（动态注入避免额外 CSS）---- */
const style = document.createElement('style')
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`
document.head.appendChild(style)
