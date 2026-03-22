const app = {
  activeExam: null,
  deferredPrompt: null,
  score: 0,
  timer: null,
  timeLeft: 0,
  progress: JSON.parse(localStorage.getItem('oyun_progress')) || {},
  soundEnabled: JSON.parse(localStorage.getItem('oyun_sound')) !== false,
  achievements: JSON.parse(localStorage.getItem('oyun_achievements')) || [],

  init() {
    this.renderHome();
    this.checkAchievements();
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  },

  renderHome() {
    const grid = document.getElementById('exam-grid');
    grid.innerHTML = '';
    const allCards = window.EXAM_DATA.flatMap(e => e.flashcards);
    const fact = allCards[Math.floor(Math.random()*allCards.length)];
    grid.innerHTML = `<div class="q-card glow-card" style="grid-column: 1 / -1; margin-bottom: 2rem; border-color: var(--primary);"><div class="q-num">🎮 GÜNÜN TERİMİ</div><p class="q-text">${fact.front}</p><p class="a-text">${fact.back}</p></div>`;
    window.EXAM_DATA.forEach(exam => {
      const isDone = this.progress[exam.id]?.study;
      const card = document.createElement('div'); card.className = 'card glow-card';
      card.innerHTML = `${isDone ? '<span style="position:absolute; top:1rem; right:1rem; background:var(--primary); color:#000; font-size:0.6rem; padding:2px 6px; border-radius:3px; font-weight:800;">LEVEL CLEAR</span>' : ''}
        <div class="card-icon">${this.getIcon(exam.id)}</div><h3 class="card-title">${exam.title}</h3><p class="card-desc">Soru-Cevap, Oyunlar ve Testler.</p>`;
      card.onclick = () => this.showSelection(exam); grid.appendChild(card);
    });
  },

  getIcon(id) {
    const icons = { '1-1': '🕹️', '1-2': '🖼️', '2-1': '🎬', '2-2': '🤖' };
    return icons[id] || '📄';
  },

  showSelection(exam) {
    this.activeExam = exam;
    document.getElementById('selected-title').innerText = exam.title;
    this.showView('view-selection');
    this.renderBadges();
  },

  showHome() { this.activeExam = null; this.showView('view-home'); this.renderHome(); },

  showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0,0);
  },

  startSummary() {
    const c = document.getElementById('content-container');
    c.innerHTML = `
      <div class="game-container" style="text-align:left;">
        <h2 style="text-align:center; margin-bottom:2rem; color:var(--primary);">📖 ${this.activeExam.title} ÖZETİ</h2>
        <div class="q-card" style="line-height:1.8; font-size:1.1rem; border-left:4px solid var(--accent); background:#050505;">
          ${this.activeExam.summary}
        </div>
        <div style="text-align:center; margin-top:2rem;">
          <button class="btn" onclick="app.startStudy()">📚 ÇALIŞMAYA BAŞLA</button>
        </div>
      </div>
    `;
    this.showView('view-content');
  },

  startOpenEnded() {
    const c = document.getElementById('content-container');
    const qs = this.activeExam.openEndedQuestions || [];
    
    if(qs.length === 0) {
      c.innerHTML = `<div class="game-container"><h3 style="text-align:center;">Bu ünite için açık uçlu soru bulunamadı.</h3></div>`;
      return;
    }

    c.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2.5rem; flex-wrap:wrap;">
          <h2 style="color:var(--accent); margin:0;">${this.activeExam.title} / Açık Uçlu Sınav</h2>
          <button class="btn btn-secondary" style="padding:0.7rem 1.2rem; font-size:0.7rem;" onclick="app.printOpenEnded()">🖨️ PDF İNDİR</button>
      </div>
      ${qs.map((q, i) => `<div class="q-card" style="margin-bottom:2rem;"><div class="q-num">SORU ${i+1}</div><p class="q-text" style="font-weight:bold; font-size:1.1rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">${q.q}</p><p class="a-text" style="color:var(--accent); line-height:1.6; font-size:1.05rem;"><strong style="color:var(--text);">Cevap:</strong> ${q.a}</p></div>`).join('')}
    `;
    this.saveProgress('openEnded');
    this.showView('view-content');
  },

  startStudy() {
    const c = document.getElementById('content-container');
    c.innerHTML = `<h2>${this.activeExam.title}</h2>${this.activeExam.questions.map((q, i) => `<div class="q-card"><div class="q-num">MISSION ${i+1}</div><p class="q-text">${q.q}</p><p class="a-text">${q.a}</p></div>`).join('')}`;
    this.saveProgress('study');
    this.showView('view-content');
  },

  startFlashcards() {
    const c = document.getElementById('content-container');
    c.innerHTML = `<div class="fc-grid">${this.activeExam.flashcards.map(f => `<div class="fc-card" onclick="this.classList.toggle('flipped')"><div class="fc-inner"><div class="fc-front">${f.front}</div><div class="fc-back">${f.back}</div></div></div>`).join('')}</div>`;
    this.saveProgress('flash');
    this.showView('view-content');
  },

  startGame(type) {
    this.score = 0;
    this.showView('view-content');
    if(type === 'tf') this.playTF();
    else if(type === 'word') this.playWord();
    else if(type === 'test') this.playTest();
    else if(type === 'time') this.playTime();
  },

  playTF() {
    const q = this.activeExam.questions[Math.floor(Math.random()*this.activeExam.questions.length)];
    const isCorrect = Math.random() > 0.5;
    const displayA = isCorrect ? q.a : this.activeExam.questions[Math.floor(Math.random()*this.activeExam.questions.length)].a;
    const c = document.getElementById('content-container');
    c.innerHTML = `<div class="game-container"><h3>Doğru mu Yanlış mı?</h3><div class="q-card"><p class="q-text">${q.q}</p><p class="a-text" style="color:var(--accent)">Cevap: ${displayA}</p></div><div class="tf-btns"><button class="btn btn-true" onclick="app.checkTF(true, ${isCorrect === (displayA === q.a)})">DOĞRU</button><button class="btn btn-false" onclick="app.checkTF(false, ${isCorrect === (displayA === q.a)})">YANLIŞ</button></div></div>`;
  },

  checkTF(playerChoice, actuallyCorrect) {
    if(playerChoice === actuallyCorrect) { this.score++; this.playTF(); }
    else this.endGame('Game Over!', `Skorun: ${this.score}`);
  },

  playWord() {
    const q = this.activeExam.questions[Math.floor(Math.random()*this.activeExam.questions.length)];
    const word = q.a.replace(/[.,]/g, '').toUpperCase();
    let hidden = word.split('').map(c => c === ' ' ? ' ' : '_').join('');
    const c = document.getElementById('content-container');
    c.innerHTML = `<div class="game-container"><h3>Kelimeyi Tahmin Et</h3><p style="margin-bottom:1rem;">${q.q}</p><div class="word-display" id="word-box">${hidden}</div><div class="keyboard">${"ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('').map(l => `<button class="key" onclick="app.guess('${l}', '${word}', this)">${l}</button>`).join('')}</div></div>`;
  },

  guess(l, word, btn) {
    btn.classList.add('used');
    const box = document.getElementById('word-box');
    let current = box.innerText.split('');
    let found = false;
    word.split('').forEach((char, i) => { if(char === l) { current[i] = l; found = true; } });
    box.innerText = current.join('');
    if(!current.includes('_')) { this.saveProgress('game'); this.endGame('Tebrikler!', `Kelime: ${word}`); }
  },

  playTime() {
    this.timeLeft = 60;
    this.timer = setInterval(() => {
      this.timeLeft--;
      document.getElementById('game-status').innerText = `SÜRE: ${this.timeLeft}s | PUAN: ${this.score}`;
      if(this.timeLeft <= 0) { clearInterval(this.timer); this.endGame('Süre Bitti!', `Toplam Puan: ${this.score}`); }
    }, 1000);
    this.nextTimeQ();
  },

  nextTimeQ() {
    const q = this.activeExam.questions[Math.floor(Math.random()*this.activeExam.questions.length)];
    const options = [q.a, ...this.activeExam.questions.filter(x => x.a !== q.a).map(x => x.a).sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random());
    const c = document.getElementById('content-container');
    c.innerHTML = `<div class="game-container"><div class="q-card"><p class="q-text">${q.q}</p></div><div class="test-options">${options.map(o => `<button class="option-btn" onclick="app.checkTimeQ('${o}', '${q.a}')">${o}</button>`).join('')}</div></div>`;
  },

  checkTimeQ(choice, correct) {
    if(choice === correct) this.score++;
    this.nextTimeQ();
  },

  endGame(title, msg) {
    clearInterval(this.timer);
    document.getElementById('game-status').innerText = '';
    const body = document.getElementById('result-body');
    body.innerHTML = `<h2 style="color:var(--primary); margin-bottom:1rem;">${title}</h2><p style="font-size:1.5rem; margin-bottom:2rem;">${msg}</p><button class="btn" onclick="app.closeModal()">TAMAM</button>`;
    document.getElementById('modal-result').classList.add('active');
  },

  closeModal() { document.getElementById('modal-result').classList.remove('active'); this.showSelection(this.activeExam); },

  saveProgress(type) {
    if(!this.progress[this.activeExam.id]) this.progress[this.activeExam.id] = {};
    this.progress[this.activeExam.id][type] = true;
    localStorage.setItem('oyun_progress', JSON.stringify(this.progress));
  },

  renderBadges() {
    const container = document.getElementById('badges');
    const types = ['study', 'flash', 'game'];
    const icons = { study: '📚', flash: '🎴', game: '🎮' };
    container.innerHTML = types.map(t => `<span class="badge ${this.progress[this.activeExam.id]?.[t] ? 'earned' : ''}">${icons[t]}</span>`).join(' ');
  },

  printNotes() {
    const area = document.getElementById('print-area');
    let html = `<div style="text-align:center"><h1 style="font-family:sans-serif">${this.activeExam.title} - Çalışma Kağıdı</h1><p>Hazırlayan: Fatih PATIR</p></div><hr>`;
    html += this.activeExam.questions.map(q => `<div style="margin-bottom:15px; border-bottom:1px solid #ddd; padding:10px;"><strong>S: ${q.q}</strong><br>C: ${q.a}</div>`).join('');
    area.innerHTML = html;
    window.print();
  },

  printOpenEnded() {
    const a = document.getElementById('print-area');
    let html = `<div style="text-align:center"><h1 style="font-family:sans-serif">${this.activeExam.title} - Açık Uçlu Sınav Soruları</h1><p>Hazırlayan: Fatih PATIR</p></div><hr>`;
    if(this.activeExam.openEndedQuestions) {
      html += this.activeExam.openEndedQuestions.map((q, i) => `
        <div style="margin-bottom:25px; padding:15px; border-bottom:1px solid #eee; font-family:sans-serif;">
          <strong style="font-size:13pt;">Soru ${i+1}: ${q.q}</strong><br><br>
          <div style="font-size:12pt; color:#222;"><strong>Cevap:</strong> ${q.a}</div>
        </div>
      `).join('');
    }
    a.innerHTML = html;
    window.print();
  },

  toggleTheme() {
    document.body.classList.toggle('theme-blueprint');
    localStorage.setItem('oyun_theme_blue', document.body.classList.contains('theme-blueprint'));
  }
};

window.onload = () => app.init();
