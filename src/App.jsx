import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  Cake,
  Camera,
  Gift,
  Heart,
  Mail,
  Music2,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { content as c } from "./content";
import catf from "../public/images/catflower.png";
import catg from "../public/images/catgun.png";
import dog from "../public/images/d.png";

function FloatingDecor() {
  const bits = [
    "♡",
    "✦",
    "✿",
    "♥",
    "⋆",
    "♡",
    "✧",
    "🎀",
    "♡",
    "✦",
    "✿",
    "♥",
    "⋆",
    "♡",
    "✧",
    "🎀",
    "♡",
    "✦",
    "✿",
    "♥",
    "⋆",
    "♡",
    "✧",
    "🎀",
    "♡",
    "✦",
    "✿",
    "♥",
    "⋆",
    "♡",
    "✧",
    "🎀",
  ];
  const positions = [
    [5, 8],
    [17, 26],
    [31, 12],
    [44, 36],
    [58, 7],
    [72, 24],
    [86, 11],
    [95, 34],
    [10, 48],
    [24, 66],
    [38, 51],
    [52, 79],
    [66, 45],
    [80, 68],
    [92, 54],
    [3, 83],
    [14, 91],
    [29, 34],
    [43, 6],
    [57, 59],
    [70, 91],
    [84, 39],
    [97, 88],
    [7, 29],
    [21, 12],
    [35, 86],
    [49, 23],
    [63, 31],
    [76, 8],
    [89, 76],
    [40, 67],
    [61, 94],
  ];
  return (
    <div className="floating-decor" aria-hidden="true">
      {bits.map((bit, i) => (
        <span
          key={i}
          style={{
            "--i": i,
            "--x": `${positions[i][0]}%`,
            "--y": `${positions[i][1]}%`,
          }}
        >
          {bit}
        </span>
      ))}
    </div>
  );
}

function ConfettiRain() {
  const pieces = Array.from({ length: 48 }, (_, i) => {
    const left = ((i * 37) % 96) + 2;
    const drift = ((i * 19) % 120) - 60;

    return (
      <span
        key={i}
        style={{
          "--left": `${left}%`,
          "--delay": `${(i % 12) * 0.07}s`,
          "--duration": `${2.8 + (i % 5) * 0.2}s`,
          "--drift": `${drift}px`,
        }}
      >
        {i % 3 === 0 ? "✦" : i % 3 === 1 ? "●" : "▪"}
      </span>
    );
  });

  return createPortal(
    <div className="confetti-rain" aria-hidden="true">
      {pieces}
    </div>,
    document.body,
  );
}

function CatGift() {
  return (
    <div
      className="cat-wrap fa-jello"
      aria-label="A cute cat holding a tiny present"
      role="img"
    >
      {/* <span className="cat-ear ear-left" />
      <span className="cat-ear ear-right" />
      <div className="cat-face">
        <span className="cat-patch" />
        <span className="cat-eye eye-left" />
        <span className="cat-eye eye-right" />
        <span className="cat-blush blush-left" />
        <span className="cat-blush blush-right" />
        <span className="cat-nose" />
        <span className="cat-mouth" />
        <span className="cat-bow">🎀</span>
      </div>
      <span className="tiny-present">🎁</span>
      <span className="cat-sparkle">✧</span> */}
      <img src={dog} alt="Happy Dog" />
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  variant = "pink",
  className = "",
}) {
  return (
    <button className={`cute-button ${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

function BackButton({ onClick }) {
  return (
    <button className="back-button" onClick={onClick}>
      <ArrowLeft size={16} /> {c.backLabel}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const isBackgroundAudioPage = page >= 4 && page <= 8;

  const go = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isBackgroundAudioPage) return;

    const audio = new Audio("/media/bdt.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audio.play().catch((error) => {
      console.error("Unable to play background audio:", error);
    });

    return () => {
      audio.pause();
    };
  }, [isBackgroundAudioPage]);

  useEffect(() => {
    if (page === 7) {
      setConfetti(true);
      const timeout = setTimeout(() => setConfetti(false), 4400);
      return () => clearTimeout(timeout);
    }

    setConfetti(false);
  }, [page]);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedPhoto]);

  const blow = () => {
    setBlown(true);
    go(7);
  };

  return (
    <main className="site-shell">
      <FloatingDecor />
      {confetti && <ConfettiRain />}
      <div className="top-sticker">
        made with <Heart size={13} fill="currentColor" /> for you
      </div>
      <section className="surprise-card" key={page}>
        <div className="card-glow" />
        {page === 1 && (
          <div className="page page-intro">
            <div className="eyebrow">
              <Sparkles size={15} /> A tiny surprise awaits
            </div>
            <h1>{c.introTitle}</h1>
            <CatGift />
            <button className="text-link" onClick={() => go(2)}>
              {c.introLink}
            </button>
            <p className="tiny-note">
              psst… it’s just for you, Pai Pai{" "}
              <span className="text-xl">😉</span>
            </p>
          </div>
        )}

        {page === 2 && (
          <div className="page">
            <div className="page-icon">💌</div>
            <h1>{c.questionTitle}</h1>
            <div className="happy-mascot">
              {/* 🐱<span>♡</span> */}
              <img src={catf} alt="Happy Cat" />
            </div>
            <p className="soft-copy">
              I made a little something with lots of love.
            </p>
            <div className="button-row">
              <PrimaryButton onClick={() => go(5)}>
                {" "}
                {c.yesLabel}{" "}
              </PrimaryButton>
              <PrimaryButton variant="cream" onClick={() => go(3)}>
                {c.noLabel}
              </PrimaryButton>
            </div>
          </div>
        )}

        {page === 3 && (
          <div className="page sad-page">
            <div className="page-icon wobble">🥺</div>
            <h1>{c.noTitle}</h1>
            {/* <p className="soft-copy">
              The tiny birthday committee is heartbroken.
            </p> */}
            <div className="sad-mascot w-45">
              {/* 🐱<span>💧</span> */}
              <img src={catg} alt="Sad Cat" />
            </div>
            <PrimaryButton onClick={() => go(2)}>
              {c.retryLabel} <span>♡</span>
            </PrimaryButton>
          </div>
        )}

        {page === 4 && (
          <div className="page">
            <div className="page-icon">🕯️</div>
            <h1>{c.wishTitle}</h1>
            <p className="soft-copy">
              Close your eyes, make a wish, and blow the candles!
            </p>
            <div
              className={`cake-art ${blown ? "candles-out" : ""}`}
              role="img"
              aria-label="A birthday cake with candles"
            >
              <div className="flame flame-one" />
              <div className="flame flame-two" />
              <div className="flame flame-three" />
              <div className="candle candle-one" />
              <div className="candle candle-two" />
              <div className="candle candle-three" />
              <div className="cake-top" />
              <div className="cake-layer layer-top">
                <i />
              </div>
              <div className="cake-layer layer-bottom">
                <i />
              </div>

              <div className="cake-plate" />
            </div>

            <PrimaryButton onClick={blow}>{c.blowLabel} 🌬️</PrimaryButton>
          </div>
        )}

        {page === 5 && (
          <div className="page gift-menu">
            <div className="eyebrow">
              <Heart size={14} fill="currentColor" /> four little gifts
            </div>
            <h1>{c.giftsTitle}</h1>
            <p className="soft-copy">
              Pick whichever one your heart likes first.
            </p>
            <div className="gift-grid">
              <button
                className="gift-tile"
                onClick={() => {
                  setBlown(false);
                  go(4);
                }}
              >
                <span className="gift-illustration cake-emoji fa-jello">
                  🎂
                </span>
                <span>{c.cakeLabel}</span>
                <small>make a wish</small>
              </button>
              <button className="gift-tile" onClick={() => go(6)}>
                <span className="gift-illustration fa-jello">📸</span>
                <span>{c.photosLabel}</span>
                <small>little memories</small>
              </button>
              <button className="gift-tile" onClick={() => go(8)}>
                <span className="gift-illustration fa-jello">💌</span>
                <span>{c.letterLabel}</span>
                <small>open my heart</small>
              </button>
              <button className="gift-tile" onClick={() => go(9)}>
                <span className="gift-illustration fa-jello">🎁</span>
                <span>{c.videoLabel}</span>
                <small>a special message</small>
              </button>
            </div>
            <div className="page-footnote">
              choose a gift · there’s no wrong answer ♡
            </div>
          </div>
        )}

        {page === 6 && (
          <div className="page wide-page">
            <div className="page-icon">
              <Camera size={30} />
            </div>
            <h1>{c.photosLabel}</h1>
            <p className="soft-copy">Tap any photo to see it up close!</p>
            <div className="photo-grid">
              {c.photoGallery.map((photo, i) => (
                <div className={`photo-card photo-${i + 1}`} key={i}>
                  {photo.src ? (
                    <button
                      className="photo-open-button"
                      type="button"
                      aria-label={`View photo: ${photo.caption}`}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img src={photo.src} alt={photo.caption} />
                    </button>
                  ) : (
                    <div className="photo-placeholder">
                      <span>{photo.emoji || "📷"}</span>
                      <small>Add your photo</small>
                    </div>
                  )}
                  <p>{photo.caption}</p>
                </div>
              ))}
            </div>
            <BackButton onClick={() => go(5)} />
          </div>
        )}

        {page === 7 && (
          <div className="page">
            <div className="birthday-crown">👑</div>
            {/* <div className="cake-confetti">🎉 🎈 ✨</div> */}
            <h1 className="birthday-heading">{c.birthdayTitle}</h1>
            {/* <div className="birthday-bear">🐻‍❣️</div> */}
            <p className="birthday-caption">{c.birthdayCaption}</p>
            {/* <div className="love-stamp">
              HUGS & KISSES <Heart size={13} fill="currentColor" />
            </div> */}

            <div className="message-stage">
              <div
                className="floating-message"
                style={{ animationDelay: "0s" }}
              >
                အကိုကြီး‌ဂေါ်ဘလင် မွေးနေ့မှစ စိတ်၏ချမ်းသာချင်း
                ကိုယ်၏ကျန်းမာချင်းတို့နှင့်ပြည့်စုံပြီး
                လာဘ်လာဘများလဲပွင့်လန်းပါစေ စိတ်သွားတိုင်းကိုယ်ပါလို့
                လိုအင်ဆန္ဒများပြည့်ဝပြီး စန်းထကာ မိန်းမရပါစေလို့ ညီလေးမိုက်
                ကဆုတောင်းပေးပါတယ်ဗျ🎂🥳
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "4s" }}
              >
                Happy Birthday ဝဲစား 🥳 ဘောင်းဘောင်းလို့‌‌ရော ရပြီလား 🫵
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "8s" }}
              >
                Happy Birthday အပျိုကြီးရှောင်ရှောင်. Bl Vd လေးတွေကို
                နေ့တိုင်းupdateစေချင်တယ်🥰
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "12s" }}
              >
                Happy Birthdayအကိုကြီး မွေးနေ့မှစပြီး
                တစ်နှစ်ပတ်လုံးပျော်ရွှင်ပါစေ.. စော်ကြည်ထီပေါက်နိဗ္ဗာန်ရောက်ပါစေ
                မုန့်ဝယ်ကျွေးပါ
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "16s" }}
              >
                Happy Birthdayဟေ့လူ 🦂 One year closer to death 😔 Anyway, wish
                u all the best pr 🖐️
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "20s" }}
              >
                Happy Birthday ပါ အကိုကြီးရေ 🎂🎉မွေးနေ့ကစပြီး
                စိတ်ချမ်းသာပျော်ရွှင်မှုတွေနဲ့ ပြည့်စုံပြီး
                လိုချင်တဲ့အိပ်မက်တွေအားလုံးလည်း အကောင်အထည်ဖော်နိုင်ပါစေ။
                အမြဲကျန်းမာပျော်ရွှင်ပြီး ဘဝမှာ အောင်မြင်မှုတွေအများကြီး
                ရရှိပါစေလို့ ဆုတောင်းပေးပါတယ်။ ✨
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "24s" }}
              >
                Happy birthday ပါ ပိုင်ပိုင်ရေ မွေးနေ့မှာ ပျော်ရွှင်ပါစေနော်
                ချစ်သောသူနဲ့လဲ ပေါင်းဖတ်နိုင်ပါစေ
                မိဘအားကကိုးရတဲ့သားလိမ္မာ‌‌လေးဖြစ်ပါ‌စေ လူပျိုကြီးမှ
                မြန်မြန်ကျွတ်ပါစေနော် ဟီး"
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "28s" }}
              >
                Happy Birthday! 🎂🖤 Wishing you endless happiness, good health,
                and success in everything you do. May life bring you more
                beautiful moments, genuine smiles, and countless reasons to be
                happy. Stay happy and keep being the wonderful person you are.
                ✨
              </div>

              <div
                className="floating-message"
                style={{ animationDelay: "32s" }}
              >
                Hbd ဝဲစားအသေဆိုးနဲ့သေ
              </div>
              <div
                className="floating-message"
                style={{ animationDelay: "38s" }}
              >
                Happy Birthday ပါ အကိုကြီးရေ အခုမွေးနေ့မှ စလို့
                နောက်နှစ်ပေါင်းများစွာအထိ မိဘအပေါ်သိတက်တဲ့ သားကောင်းရတနာလေးအဖြစ်
                ဘ၀ကို ပျော်ပျော်ရွှင်ရွှင် ဖြတ်သန်းနိုင်ပါစေ ။ အခုလို ညီမလေးတွေ
                အများကြီးရလို့လည်း အားမငယ်ပါနဲ့လို့ ၊ အကိုကြီး အဖရာပါဘဲ ၊
                တကယ်ကို အကိုတစ်ယောက်လို ပြောလိုက်ဆိုလိုက် ဆဲလိုက်
                ဆူလိုက်လုပ်နေရတာကိုဘဲ လုံလောက်နေပါပြီ ။ မုန့်ကတော့
                အကြွေးမှတ်ထားပါမယ် ။ နောက်လည်း များများ နှောင့်ယှက်မှာမို့လို့
              </div>
            </div>
            <BackButton onClick={() => go(5)} />
          </div>
        )}

        {page === 8 && (
          <div className="page letter-page">
            <div className="page-icon">
              <Mail size={29} />
            </div>
            <h1>{c.letterTitle}</h1>
            <div className="letter-paper">
              {c.letterParagraphs.map((paragraph, i) => (
                <p key={i} className="text-justify">
                  {paragraph}
                </p>
              ))}
              <div className="letter-signature">
                Kue Kue <span>♡</span>
              </div>
            </div>
            <BackButton onClick={() => go(5)} />
          </div>
        )}

        {page === 9 && (
          <div className="page">
            <div className="page-icon">
              <Music2 size={29} />
            </div>
            <h2 className="text-center text-2xl text-black">{c.videoTitle}</h2>
            <div className="media-heart">💗</div>
            {/* <p className="soft-copy">{c.videoHint}</p> */}
            {c.birthdayMedia.src ? (
              <div className="media-frame">
                {c.birthdayMedia.type === "audio" ? (
                  <audio controls src={c.birthdayMedia.src}>
                    Your browser does not support audio.
                  </audio>
                ) : (
                  <video controls playsInline src={c.birthdayMedia.src}>
                    Your browser does not support video.
                  </video>
                )}
              </div>
            ) : (
              <div className="media-placeholder">
                <Volume2 size={24} />
                <small>
                  Add your media path in <code>src/content.js</code>
                </small>
              </div>
            )}
            <div className="envelope-stamp">sealed with love ♡</div>
            <BackButton onClick={() => go(5)} />
          </div>
        )}
      </section>
      <footer className="site-footer">
        {" "}
        <span>✿</span>
      </footer>
      {selectedPhoto &&
        createPortal(
          <div
            className="photo-lightbox-backdrop"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="photo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={selectedPhoto.caption}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="photo-lightbox-close"
                type="button"
                aria-label="Close photo"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={22} />
              </button>
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
              <p>{selectedPhoto.caption}</p>
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}
