document.addEventListener("DOMContentLoaded", () => {
  // 1. Floating background playing card suits
  const bgContainer = document.getElementById("floatingBg");
  const suits = ["♠", "♥", "♦", "♣"];

  const spawnSuit = () => {
    const el = document.createElement("div");
    el.classList.add("floating-icon");
    el.innerText = suits[Math.floor(Math.random() * suits.length)];
    el.style.left = Math.random() * 95 + "vw";
    el.style.animationDuration = Math.random() * 8 + 8 + "s";
    el.style.fontSize = Math.random() * 20 + 20 + "px";
    bgContainer.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 16000);
  };

  for (let i = 0; i < 15; i++) {
    setTimeout(spawnSuit, i * 400);
  }
  setInterval(spawnSuit, 1200);

  // Storage helper functions
  const getStoredVal = (key, defaultVal) => {
    return localStorage.getItem(`freshers_card_${key}`) || defaultVal;
  };

  const setStoredVal = (key, val) => {
    localStorage.setItem(`freshers_card_${key}`, val);
  };

  // 2. Data Definitions with Persistent Storage & Specific Rules
  const eventsData = {
    intro: {
      val: "A",
      suit: "♠",
      suitColor: "black",
      icon: "👑",
      title: "Opening & Introduction",
      subtitle: "Start of Freshers 2026",
      timing: "10:30 AM - 11:15 AM",
      venue: "Seminar Hall",
      showDress: true,
      dress: "Western / Black & Red",
      renderContent: () => `
        <div class="hosts-wrapper">
          <div class="hosts-title"><span>♠</span> EVENT HOSTS <span>♠</span></div>
          <div class="hosts-cards">
            <div class="host-badge">
              <div class="host-avatar"><i class="fa-solid fa-microphone-lines"></i></div>
              <div class="host-info">
                <span class="host-role">Host 1</span>
                <span class="host-name" data-save="intro_host1" contenteditable="true">${getStoredVal("intro_host1", "Host Name 1")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar"><i class="fa-solid fa-microphone-lines"></i></div>
              <div class="host-info">
                <span class="host-role">Host 2</span>
                <span class="host-name" data-save="intro_host2" contenteditable="true">${getStoredVal("intro_host2", "Host Name 2")}</span>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size:0.83rem; color:#475569; line-height:1.4; margin-bottom:8px;">
          Welcome speech, traditional lamp lighting ceremony, and inaugural address by department heads & senior coordinators.
        </p>
      `
    },
    dance: {
      val: "2",
      suit: "♥",
      suitColor: "red",
      icon: "💃",
      title: "Dance Performances",
      subtitle: "Stage on Fire",
      timing: "11:15 AM - 12:00 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <div class="hosts-wrapper">
          <div class="hosts-title"><span>♥</span> DANCE HOSTS <span>♥</span></div>
          <div class="hosts-cards">
            <div class="host-badge">
              <div class="host-avatar"><i class="fa-solid fa-microphone"></i></div>
              <div class="host-info">
                <span class="host-role">Dance Host 1</span>
                <span class="host-name" data-save="dance_host1" contenteditable="true">${getStoredVal("dance_host1", "Host Name 1")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar"><i class="fa-solid fa-microphone"></i></div>
              <div class="host-info">
                <span class="host-role">Dance Host 2</span>
                <span class="host-name" data-save="dance_host2" contenteditable="true">${getStoredVal("dance_host2", "Host Name 2")}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-form-section">
          <label class="modal-section-label"><i class="fa-solid fa-compact-disc"></i> Performance Lineup & Playlist Note:</label>
          <textarea class="modal-textarea" data-save="dance_lineup" placeholder="Type performer names or song list here...">${getStoredVal("dance_lineup", `1. Welcome Group Dance (Senior Crew)\n2. Freshers Solo Showcase\n3. Western Duet Performance`)}</textarea>
        </div>
      `
    },
    gifts: {
      val: "3",
      suit: "♦",
      suitColor: "red",
      icon: "🎁",
      title: "Gift & Flower Distribution",
      subtitle: "Token of Warm Welcome",
      timing: "12:00 PM - 12:30 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <p style="font-size:0.83rem; color:#475569; line-height:1.4; margin-bottom:10px;">
          Senior batch welcomes the new entrants with handmade flowers, welcome badges, and celebration hampers!
        </p>
        <div class="modal-form-section">
          <label class="modal-section-label"><i class="fa-solid fa-box-open"></i> What is in the gift / Flower kit?</label>
          <textarea class="modal-textarea" data-save="gifts_items" placeholder="Enter what gifts will be distributed...">${getStoredVal("gifts_items", `• Red Rose Welcome Flower\n• Personalized Welcome Kit & Diary\n• Custom Casino Royale Badge & Goodie Pack`)}</textarea>
        </div>
      `
    },
    breakfast: {
      val: "4",
      suit: "♣",
      suitColor: "black",
      icon: "☕",
      title: "Breakfast & Refreshment Break",
      subtitle: "Recharge & Socialize",
      timing: "12:30 PM - 1:00 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <p style="font-size:0.83rem; color:#475569; line-height:1.4; margin-bottom:10px;">
          Time to take a breather, grab snacks, take candid photos at the card-arch backdrop, and meet new classmates.
        </p>
        <div class="modal-form-section">
          <label class="modal-section-label"><i class="fa-solid fa-utensils"></i> What will be the breakfast menu?</label>
          <textarea class="modal-textarea" data-save="breakfast_menu" placeholder="Type items served during breakfast break...">${getStoredVal("breakfast_menu", `• Hot Sandwiches & Veg Puffs\n• Fresh Fruit Juice & Cold Coffee\n• Muffins & Tea Counter`)}</textarea>
        </div>
      `
    },
    ramp: {
      val: "5",
      suit: "♥",
      suitColor: "red",
      icon: "👠",
      title: "Ramp Walk & Runway",
      subtitle: "Elegance & Confidence",
      timing: "1:00 PM - 1:45 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <div class="info-banner-box">
          <i class="fa-solid fa-crown"></i>
          <div>
            <strong>Battle for Crowns:</strong> The runway walk consists of 2 special rounds judged on attitude, elegance, and coordination.
          </div>
        </div>
        <div class="games-list">
          <div class="game-item">
            <h4>Round 1: Solo Runway</h4>
            <p>Individual walk showing personal attitude, confidence, signature pose, and a quick intro on the mic.</p>
          </div>
          <div class="game-item">
            <h4>Round 2: Couple / Duo Walk</h4>
            <p>Partners and duos walk together in synchronized chemistry, posing together at the card arch photo point.</p>
          </div>
        </div>
      `
    },
    games: {
      val: "6",
      suit: "♠",
      suitColor: "black",
      icon: "🎲",
      title: "Games & Fun Quests",
      subtitle: "Battle of the Batches",
      timing: "1:45 PM - 2:30 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <div class="games-list">
          <div class="game-item">
            <h4>1. Guess the Song</h4>
            <p>Play 3–5 seconds of a Bollywood or trending song; the first team to identify it scores a point.</p>
          </div>
          <div class="game-item">
            <h4>2. Pictionary</h4>
            <p>Draw a movie, object, or famous personality on a board while your team guesses.</p>
          </div>
          <div class="game-item">
            <h4>3. Complete the Lyrics</h4>
            <p>Stop a song midway and let contestants finish the next line with tune & energy!</p>
          </div>
          <div class="game-item">
            <h4>4. Guess the Meme</h4>
            <p>Project popular memes with captions hidden. Teams compete to supply the funniest suitable caption or identify the meme.</p>
          </div>
        </div>
      `
    },
    winners: {
      val: "👑",
      suit: "★",
      suitColor: "gold",
      icon: "🏆",
      title: "Mr. & Miss Fresher Crowning",
      subtitle: "The Royal Title Ceremony",
      timing: "2:30 PM - 3:00 PM",
      venue: "Seminar Hall",
      showDress: false,
      renderContent: () => `
        <div class="info-banner-box" style="background:#fef3c7; border-color:#f59e0b; color:#78350f;">
          <i class="fa-solid fa-award" style="color:#d97706;"></i>
          <div>
            <strong>Teacher Jury Decision:</strong> A panel of 5 respected professors & teachers evaluate poise, performance, and runway presence to declare Mr. & Miss Fresher!
          </div>
        </div>
        <div class="hosts-wrapper">
          <div class="hosts-title"><span>👑</span> PANEL OF 5 TEACHER JUDGES <span>👑</span></div>
          <div class="hosts-cards">
            <div class="host-badge">
              <div class="host-avatar" style="background:#d97706;"><i class="fa-solid fa-user-tie"></i></div>
              <div class="host-info">
                <span class="host-role">Judge 1</span>
                <span class="host-name" data-save="judge_1" contenteditable="true">${getStoredVal("judge_1", "Teacher Name 1")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar" style="background:#d97706;"><i class="fa-solid fa-user-tie"></i></div>
              <div class="host-info">
                <span class="host-role">Judge 2</span>
                <span class="host-name" data-save="judge_2" contenteditable="true">${getStoredVal("judge_2", "Teacher Name 2")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar" style="background:#d97706;"><i class="fa-solid fa-user-tie"></i></div>
              <div class="host-info">
                <span class="host-role">Judge 3</span>
                <span class="host-name" data-save="judge_3" contenteditable="true">${getStoredVal("judge_3", "Teacher Name 3")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar" style="background:#d97706;"><i class="fa-solid fa-user-tie"></i></div>
              <div class="host-info">
                <span class="host-role">Judge 4</span>
                <span class="host-name" data-save="judge_4" contenteditable="true">${getStoredVal("judge_4", "Teacher Name 4")}</span>
              </div>
            </div>
            <div class="host-badge">
              <div class="host-avatar" style="background:#d97706;"><i class="fa-solid fa-user-tie"></i></div>
              <div class="host-info">
                <span class="host-role">Judge 5</span>
                <span class="host-name" data-save="judge_5" contenteditable="true">${getStoredVal("judge_5", "Teacher Name 5")}</span>
              </div>
            </div>
          </div>
        </div>
      `
    },
    lunch: {
      val: "8",
      suit: "♦",
      suitColor: "red",
      icon: "🎉",
      title: "DJ Party & Royal Lunch",
      subtitle: "The Ultimate Grand Finale",
      timing: "3:00 PM Onwards",
      venue: "Canteen Area",
      showDress: false,
      renderContent: () => `
        <div class="info-banner-box" style="background:#fdf2f8; border-color:#f472b6; color:#9d174d;">
          <i class="fa-solid fa-fire" style="color:#e11d48;"></i>
          <div>
            <strong>Schedule Breakdown:</strong>
            <br>• <strong>3:00 PM - 4:00 PM:</strong> High-Energy Open DJ Party & Dance Floor!
            <br>• <strong>4:00 PM - 5:00 PM:</strong> Grand Royal Lunch Feast Banquet!
          </div>
        </div>

        <div class="hosts-wrapper">
          <div class="hosts-title"><span>♦</span> DJ BOOTH <span>♦</span></div>
          <div class="hosts-cards" style="grid-template-columns: 1fr;">
            <div class="host-badge">
              <div class="host-avatar" style="background:#be123c;"><i class="fa-solid fa-headphones"></i></div>
              <div class="host-info">
                <span class="host-role">DJ Artist / Sound Incharge</span>
                <span class="host-name" data-save="dj_artist" contenteditable="true">${getStoredVal("dj_artist", "DJ Artist Name / Sound Crew")}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-form-section">
          <label class="modal-section-label"><i class="fa-solid fa-compact-disc"></i> 3:00 - 4:00 PM DJ Tracks & Dance Playlist:</label>
          <textarea class="modal-textarea" data-save="dj_playlist" placeholder="Enter DJ track requests or genre notes...">${getStoredVal("dj_playlist", `• Trending Bollywood & Punjabi EDM Mix\n• Commercial Club Anthems\n• Open Request Hour for Freshers`)}</textarea>
        </div>

        <div class="modal-form-section">
          <label class="modal-section-label"><i class="fa-solid fa-bowl-food"></i> 4:00 PM - 5:00 PM Royal Lunch Feast Menu:</label>
          <textarea class="modal-textarea" data-save="lunch_menu" placeholder="Enter lunch buffet items...">${getStoredVal("lunch_menu", `• Paneer Butter Masala & Dal Makhani\n• Veg Biryani / Jeera Rice & Naan\n• Gulab Jamun & Ice Cream Sundae\n• Cold Drinks & Refreshers Counter`)}</textarea>
        </div>
      `
    }
  };

  // 3. Modal Elements
  const modal = document.getElementById("eventModal");
  const closeModal = document.getElementById("closeModal");
  const cornerTL = document.getElementById("modalCornerTL");
  const cornerBR = document.getElementById("modalCornerBR");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalTiming = document.getElementById("modalTiming");
  const modalVenue = document.getElementById("modalVenue");
  const modalDressBox = document.getElementById("modalDressBox");
  const modalDress = document.getElementById("modalDress");
  const dynamicContent = document.getElementById("modalDynamicContent");
  const resetBtn = document.getElementById("resetCurrentEventBtn");

  let currentActiveEventKey = null;

  // Open modal with corresponding card information
  document.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("click", () => {
      const eventKey = card.getAttribute("data-event");
      const data = eventsData[eventKey];
      if (!data) return;

      currentActiveEventKey = eventKey;

      if (navigator.vibrate) navigator.vibrate(25);

      // Setup Card Corners & Colors
      const suitColorHex = data.suitColor === "red" ? "#dc2626" : (data.suitColor === "gold" ? "#d97706" : "#111827");
      cornerTL.innerHTML = `<span class="val">${data.val}</span><span class="icon" style="color:${suitColorHex}">${data.suit}</span>`;
      cornerBR.innerHTML = `<span class="val">${data.val}</span><span class="icon" style="color:${suitColorHex}">${data.suit}</span>`;
      cornerTL.querySelector(".val").style.color = suitColorHex;
      cornerBR.querySelector(".val").style.color = suitColorHex;

      // Fill in details
      modalIcon.textContent = data.icon;
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalTiming.textContent = data.timing;
      modalVenue.textContent = data.venue;

      // Only show Dress Code for Introduction
      if (data.showDress) {
        modalDressBox.style.display = "flex";
        modalDress.textContent = data.dress;
      } else {
        modalDressBox.style.display = "none";
      }

      // Populate content
      dynamicContent.innerHTML = data.renderContent();

      // Attach auto-save listeners on inputs and contenteditable
      dynamicContent.querySelectorAll("[data-save]").forEach((el) => {
        const key = el.getAttribute("data-save");

        if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
          el.addEventListener("input", (e) => {
            setStoredVal(key, e.target.value);
          });
        } else {
          // Contenteditable (Host names, judge names)
          el.addEventListener("blur", (e) => {
            setStoredVal(key, e.target.innerText.trim());
          });
          el.addEventListener("keyup", (e) => {
            setStoredVal(key, e.target.innerText.trim());
          });
        }
      });

      modal.classList.add("active");
    });
  });

  // Reset to default button logic
  resetBtn.addEventListener("click", () => {
    if (!currentActiveEventKey) return;
    
    // Find all keys in current event and clear their localStorage
    const elements = dynamicContent.querySelectorAll("[data-save]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-save");
      localStorage.removeItem(`freshers_card_${key}`);
    });

    // Re-render
    const data = eventsData[currentActiveEventKey];
    if (data) {
      dynamicContent.innerHTML = data.renderContent();

      // Re-attach listener
      dynamicContent.querySelectorAll("[data-save]").forEach((el) => {
        const key = el.getAttribute("data-save");
        if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
          el.addEventListener("input", (e) => setStoredVal(key, e.target.value));
        } else {
          el.addEventListener("blur", (e) => setStoredVal(key, e.target.innerText.trim()));
          el.addEventListener("keyup", (e) => setStoredVal(key, e.target.innerText.trim()));
        }
      });
    }

    if (navigator.vibrate) navigator.vibrate(20);
  });

  // Close handlers
  closeModal.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("active");
  });
});
