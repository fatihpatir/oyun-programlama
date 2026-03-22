const app = {
  activeExam: null,
  deferredPrompt: null,
  score: 0,
  timer: null,
  timeLeft: 0,
  progress: JSON.parse(localStorage.getItem('oyun_progress')) || {},
  soundEnabled: JSON.parse(localStorage.getItem('oyun_sound')) !== false,
  achievements: JSON.parse(localStorage.getItem('oyun_achievements')) || [],
  audioCtx: null,
  theme: localStorage.getItem('oyun_theme') || 'dark',

  init() {
    this.initAudio();
    this.applyTheme();
    this.renderHome();
    this.checkAchievements();
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  },

  initAudio() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.updateSoundBtn();
  },

  playTone(freq, type, duration, vol = 0.1) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(this.audioCtx.destination);
    osc.start(); osc.stop(this.audioCtx.currentTime + duration);
  },

  playSound(type) {
    switch(type) {
      case 'click': this.playTone(800, 'sine', 0.1, 0.05); break;
      case 'success': this.playTone(600, 'sine', 0.1); setTimeout(() => this.playTone(900, 'sine', 0.2), 100); break;
      case 'fail': this.playTone(300, 'sawtooth', 0.2, 0.05); setTimeout(() => this.playTone(200, 'sawtooth', 0.3, 0.05), 150); break;
      case 'win': [440, 554, 659, 880].forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.4, 0.1), i * 150)); break;
    }
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('oyun_sound', this.soundEnabled);
    this.updateSoundBtn(); if (this.soundEnabled) this.playSound('click');
  },

  updateSoundBtn() {
    const btn = document.getElementById('btn-sound');
    if (btn) btn.innerText = this.soundEnabled ? '🔊' : '🔇';
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'blueprint' : 'dark';
    localStorage.setItem('oyun_theme', this.theme);
    this.applyTheme();
    this.playSound('click');
  },

  applyTheme() {
    document.body.className = this.theme === 'blueprint' ? 'theme-blueprint' : '';
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
    this.playSound('click');
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

  checkTF(p, c) { if(p === c) { this.playSound('success'); this.score++; this.playTF(); } else { this.playSound('fail'); this.endGame('Game Over!', `Puanın: ${this.score}`); } },

  playWord() {
    const q = this.activeExam.questions[Math.floor(Math.random()*this.activeExam.questions.length)];
    const word = q.a.replace(/[.,]/g, '').toUpperCase();
    let hidden = word.split('').map(c => c === ' ' ? ' ' : '_').join('');
    const c = document.getElementById('content-container');
    c.innerHTML = `<div class="game-container"><h3>Kelimeyi Tahmin Et</h3><p style="margin-bottom:1rem;">${q.q}</p><div class="word-display" id="word-box">${hidden}</div><div class="keyboard">${"ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('').map(l => `<button class="key" onclick="app.guess('${l}', '${word}', this)">${l}</button>`).join('')}</div></div>`;
  },

  guess(l, w, b) {
    this.playSound('click');
    b.classList.add('used');
    const box = document.getElementById('word-box');
    let current = box.innerText.split('');
    let found = false;
    w.split('').forEach((char, i) => { if(char === l) { current[i] = l; found = true; } });
    box.innerText = current.join('');
    if(!current.includes('_')) { this.playSound('win'); this.saveProgress('game'); this.endGame('Victory!', `Kelime: ${w}`); this.triggerConfetti(); }
    else if(!w.includes(l)) { this.playSound('fail'); } else { this.playSound('success'); }
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

  checkTimeQ(p, c) { if(p === c) { this.playSound('success'); this.score++; } else { this.playSound('fail'); } this.nextTimeQ(); },

  endGame(title, msg) {
    clearInterval(this.timer);
    document.getElementById('game-status').innerText = '';
    const body = document.getElementById('result-body');
    body.innerHTML = `<h2 style="color:var(--primary); margin-bottom:1rem;">${title}</h2><p style="font-size:1.5rem; margin-bottom:2rem;">${msg}</p><button class="btn" onclick="app.closeModal()">TAMAM</button>`;
    if(title.includes('Victory') || title.includes('Over') || title.includes('Süre') || title.includes('Bitti')) this.playSound('win');
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
    this.theme = this.theme === 'dark' ? 'blueprint' : 'dark';
    localStorage.setItem('oyun_theme', this.theme);
    this.applyTheme();
    this.playSound('click');
  },

  applyTheme() {
    document.body.className = this.theme === 'blueprint' ? 'theme-blueprint' : '';
  }
};

window.onload = () => app.init();
