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

  document.querySelectorAll('.card, .timeline-item, .emperor-card, .figure-card, .culture-card, .info-box').forEach((el) => {
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

  /* ---- 站内搜索 ---- */
  const searchInput = document.getElementById('search-input')
  const resultsContainer = document.getElementById('search-results')
  if (searchInput && resultsContainer) {
    // Detect if we're at root (index.html) or in pages/ subdirectory
    const inPages = window.location.pathname.includes('/pages/')
    function urlFor(path) {
      if (inPages) return path.startsWith('../') ? path.slice(3) : path
      return path.startsWith('../') ? path : 'pages/' + path
    }
    const searchIndex = [
      { title: '首页', url: 'index.html', desc: '大明风华 · 明朝历史知识库首页' },
      { title: '明朝皇帝', url: 'emperors.html', desc: '十六位皇帝生平与年号' },
      { title: '大事记', url: 'events.html', desc: '明朝重大历史事件时间线' },
      { title: '文化科技', url: 'culture.html', desc: '文学、科技、建筑、思想等文化成就' },
      { title: '人物', url: 'figures.html', desc: '明朝政治、军事、思想、文学、科学等领域人物' },
      { title: '官制与制度', url: 'government.html', desc: '内阁、六部、监察、科举、法律等制度详解' },
      { title: '经济与贸易', url: 'economy.html', desc: '农业、手工业、商业、海外贸易与财政' },
      { title: '军事与边防', url: 'military.html', desc: '卫所制、九边、战争、海防与军事技术' },
      { title: '思想与学术', url: 'thought.html', desc: '阳明心学、考据学、西学东渐与宗教' },
      { title: '参考文献', url: 'references.html', desc: '史料来源与参考书目' },
      { title: '朱元璋', url: 'emperors.html', desc: '明太祖 · 洪武 · 开国皇帝' },
      { title: '朱允炆', url: 'emperors.html', desc: '明惠宗 · 建文 · 靖难之役' },
      { title: '朱棣', url: 'emperors.html', desc: '明成祖 · 永乐 · 迁都北京' },
      { title: '朱高炽', url: 'emperors.html', desc: '明仁宗 · 洪熙' },
      { title: '朱瞻基', url: 'emperors.html', desc: '明宣宗 · 宣德 · 仁宣之治' },
      { title: '朱祁镇', url: 'emperors.html', desc: '明英宗 · 正统/天顺 · 土木堡之变' },
      { title: '朱祁钰', url: 'emperors.html', desc: '明代宗 · 景泰 · 北京保卫战' },
      { title: '朱见深', url: 'emperors.html', desc: '明宪宗 · 成化' },
      { title: '朱祐樘', url: 'emperors.html', desc: '明孝宗 · 弘治 · 弘治中兴' },
      { title: '朱厚照', url: 'emperors.html', desc: '明武宗 · 正德' },
      { title: '朱厚熜', url: 'emperors.html', desc: '明世宗 · 嘉靖' },
      { title: '朱载坖', url: 'emperors.html', desc: '明穆宗 · 隆庆 · 隆庆开关' },
      { title: '朱翊钧', url: 'emperors.html', desc: '明神宗 · 万历 · 张居正改革' },
      { title: '朱常洛', url: 'emperors.html', desc: '明光宗 · 泰昌 · 红丸案' },
      { title: '朱由校', url: 'emperors.html', desc: '明熹宗 · 天启 · 魏忠贤专权' },
      { title: '朱由检', url: 'emperors.html', desc: '明思宗 · 崇祯 · 明朝灭亡' },
      { title: '靖难之役', url: 'events.html', desc: '1399–1402 朱棣夺位' },
      { title: '郑和下西洋', url: 'events.html', desc: '1405–1433 七下西洋' },
      { title: '土木堡之变', url: 'events.html', desc: '1449 英宗被俘' },
      { title: '北京保卫战', url: 'events.html', desc: '1449 于谦抗瓦剌' },
      { title: '张居正改革', url: 'events.html', desc: '1573–1582 考成法与一条鞭法' },
      { title: '万历援朝', url: 'events.html', desc: '1592–1598 壬辰倭乱' },
      { title: '东林党争', url: 'events.html', desc: '明末政治党争' },
      { title: '甲申之变', url: 'events.html', desc: '1644 李自成破北京' },
      { title: '王阳明', url: 'figures.html', desc: '心学宗师 · 知行合一' },
      { title: '张居正', url: 'figures.html', desc: '万历首辅 · 改革家' },
      { title: '于谦', url: 'figures.html', desc: '北京保卫战 · 民族英雄' },
      { title: '戚继光', url: 'figures.html', desc: '抗倭名将 · 戚家军' },
      { title: '郑和', url: 'figures.html', desc: '航海家 · 下西洋' },
      { title: '李时珍', url: 'figures.html', desc: '本草纲目 · 药圣' },
      { title: '海瑞', url: 'figures.html', desc: '大清官 · 刚直不阿' },
      { title: '徐光启', url: 'figures.html', desc: '中西交流先驱 · 几何原本' },
      { title: '宋应星', url: 'figures.html', desc: '天工开物 · 科学家' },
      { title: '汤显祖', url: 'figures.html', desc: '牡丹亭 · 戏剧家' },
      { title: '永乐大典', url: 'culture.html', desc: '中国古代最大类书' },
      { title: '本草纲目', url: 'culture.html', desc: '李时珍 · 医学巨著' },
      { title: '天工开物', url: 'culture.html', desc: '宋应星 · 科技百科全书' },
      { title: '紫禁城', url: 'culture.html', desc: '北京故宫 · 世界文化遗产' },
      { title: '明长城', url: 'culture.html', desc: '东起山海关西至嘉峪关' },
      { title: '阳明心学', url: 'culture.html', desc: '王阳明 · 致良知 · 知行合一' },
      { title: '胡惟庸案', url: 'events.html', desc: '1380 废除丞相制度' },
      { title: '一条鞭法', url: 'events.html', desc: '张居正 · 赋税制度改革' },
      { title: '隆庆开关', url: 'events.html', desc: '1567 解除海禁' },
      { title: '南明', url: 'events.html', desc: '1644 后明朝残余政权' },
      { title: '内阁制度', url: 'government.html', desc: '明朝核心决策机构' },
      { title: '科举制度', url: 'government.html', desc: '八股取士 · 进士科' },
      { title: '卫所制度', url: 'military.html', desc: '明朝军事编制体系' },
      { title: '九边重镇', url: 'military.html', desc: '北部边防军事防线' },
      { title: '资本主义萌芽', url: 'economy.html', desc: '明代中后期商品经济' },
      { title: '一条鞭法', url: 'economy.html', desc: '赋税货币化改革' },
      { title: '白银货币化', url: 'economy.html', desc: '海外白银流入与货币体系' },
    ]

    searchInput.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase()
      if (!q) {
        resultsContainer.classList.remove('visible')
        return
      }
      const matches = searchIndex.filter(function (item) {
        return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
      })
      resultsContainer.innerHTML = ''
      if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="no-result">未找到相关内容</div>'
      } else {
        matches.slice(0, 12).forEach(function (item) {
          const a = document.createElement('a')
          a.href = urlFor(item.url)
          a.innerHTML = '<div class="result-title">' + item.title + '</div><div class="result-desc">' + item.desc + '</div>'
          resultsContainer.appendChild(a)
        })
      }
      resultsContainer.classList.add('visible')
    })

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-box')) {
        resultsContainer.classList.remove('visible')
      }
    })
  }
})()

/* ---- 淡入动画关键帧（动态注入避免额外 CSS）---- */
const style = document.createElement('style')
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`
document.head.appendChild(style)
