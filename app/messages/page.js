 'use client';

import { useEffect, useRef } from 'react';

export default function Messages() {
  const audioRef = useRef(null);

  useEffect(() => {
    const starsContainer = document.getElementById('stars');
    const starCount = window.innerWidth < 768 ? 60 : 130;
    for (let i = 0; i < starCount; i++) {
      const s = document.createElement('div');
      const big = Math.random() > 0.85;
      s.className = 'star' + (big ? ' big' : '');
      const size = big ? Math.random() * 2 + 2 : Math.random() * 1.4 + 0.6;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.top = Math.random() * 100 + '%';
      s.style.left = Math.random() * 100 + '%';
      s.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
      starsContainer.appendChild(s);
    }

    const reveals = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    reveals.forEach((r) => obs.observe(r));

    const guide = document.getElementById('guide');
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const top = 15 + scrollPercent * 70;
      guide.style.top = top + '%';
    };

    window.addEventListener('scroll', handleScroll);

    const playAudio = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.volume = 0.06;
        await audioRef.current.play();
        document.getElementById('sound-toggle')?.classList.add('on');
        const icon = document.getElementById('sound-icon');
        if (icon) icon.className = 'fa-solid fa-volume-high';
      } catch (err) {
        // still blocked on some browsers
      }
    };

    const playAudioHandler = () => playAudio();

    window.addEventListener('scroll', playAudioHandler, { passive: true, once: true });
    window.addEventListener('pointerdown', playAudioHandler, { once: true });
    window.addEventListener('touchstart', playAudioHandler, { passive: true, once: true });
    window.addEventListener('click', playAudioHandler, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', playAudioHandler);
      window.removeEventListener('pointerdown', playAudioHandler);
      window.removeEventListener('touchstart', playAudioHandler);
      window.removeEventListener('click', playAudioHandler);
    };
  }, []);

  const toggleSound = async () => {
    const btn = document.getElementById('sound-toggle');
    const icon = document.getElementById('sound-icon');
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        btn.classList.add('on');
        if (icon) icon.className = 'fa-solid fa-volume-high';
      } catch (e) {
      }
    } else {
      audioRef.current.pause();
      btn.classList.remove('on');
      if (icon) icon.className = 'fa-solid fa-volume-xmark';
    }
  };

  return (
    <>
      <div id="stars"></div>

      <audio
        ref={audioRef}
        id="bg-audio"
        loop
        playsInline
        preload="auto"
        src="/1x.mp3"
      />

      <div id="sound-toggle" onClick={toggleSound}>
        <i className="fa-solid fa-volume-xmark" id="sound-icon"></i>
      </div>

      <div id="guide">
        <i className="fa-solid fa-star"></i>
        <div className="line"></div>
      </div>

      <section id="hero">
        <div className="eyebrow">untuk seseorang yang berarti,</div>
        <h1>
          Hi, <em>Qina.</em>
        </h1>
        <p className="sub">
          Ada beberapa hal yang ingin aku sampaikan pelan-pelan. Nggak buru-buru. Kamu boleh baca sesuai ritme kamu sendiri &mdash; aku akan tetap di sini, di setiap baris.
        </p>
        <div className="scroll-cue">
          <span>gulir untuk lanjut</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
            <p>
            First of all, aku <em>really feel sorry</em> untuk semua yang aku ucapkan semalam. Sampai detik ini, penyesalan itu masih ada &mdash; karena kebodohanku dalam berkomunikasi, dan karena aku gagal memahami apa yang sebenarnya sedang kamu rasakan.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Cara penyampaianku salah, dan itu membuatmu merasa sedang aku <em>judge</em>. Padahal sama sekali bukan itu yang ada di pikiranku. Yang aku maksud bukan menyesal kamu cerita ke aku, justru <em>sebaliknya</em>.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Aku bersyukur dan merasa <em>terhormat</em> karena kamu mau percaya sama aku sejauh itu. Aku tahu itu bukan hal yang mudah buatmu.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Yang sebenarnya ada di pikiranku hanya rasa <em>khawatir</em>. Takut suatu hari kamu bertemu orang yang salah, lalu cerita yang susah payah kamu bagikan justru dimanfaatkan.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Tapi yang sampai ke hatimu malah seolah aku menghakimi &mdash; membuatmu merasa malu, insecure, bahkan berpikir seharusnya kamu nggak pernah cerita ke aku. Itu yang paling aku sesali.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Aku sadar diri, aku masih bukan siapa-siapa di hidupmu. Tapi justru karena itu aku benar-benar minta maaf &mdash; karena gagal memahamimu di saat yang seharusnya aku lebih banyak <em>mendengarkan</em> daripada berbicara.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Pesan ini bukan untuk memaksamu memaafkan aku, bukan juga untuk membela diri. Aku hanya ingin bertanggung jawab dan memastikan kamu tahu aku benar-benar menyesal. Soal dimaafkan atau tidak &mdash; itu sepenuhnya di tanganmu.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Aku akan tetap ada di tempat yang sama. Nggak akan berpindah, nggak akan pergi, nggak akan menghilang. Bukan karena berharap kamu harus kembali cerita, tapi karena memang itu yang ingin aku lakukan.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section>
        <div className="letter" data-reveal>
          <p>
            Kalau suatu saat kamu butuh bantuan, teman cerita, atau sekadar ingin didengarkan &mdash; aku masih di sini. Aku sudah belajar dari kesalahan ini, dan nggak akan mengulanginya lagi.
          </p>
        </div>
      </section>

      <section className="spacer"></section>

      <section id="closing">
        <div className="eyebrow">satu hal terakhir,</div>
        <h1>
          Aku tidak pernah <em>menyesal</em>
          <br />kamu cerita ke aku.
        </h1>
        <p className="sub">
          Yang aku sesali hanya cara aku merespons kepercayaan itu, sampai membuatmu merasa dihakimi.
        </p>
        <div className="promise-list">
          <div className="promise">tetap di sini, nggak ke mana-mana</div>
          <div className="promise">lebih banyak mendengarkan</div>
          <div className="promise">menghormati keputusanmu</div>
        </div>
        <div className="signature">Maaf ya, Qina.</div>
      </section>

      <footer>ditulis pelan-pelan, dengan sungguh-sungguh.</footer>
    </>
  );
}
