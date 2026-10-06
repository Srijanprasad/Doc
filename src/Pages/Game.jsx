import { motion as Motion } from "framer-motion";

function Game() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 py-8 md:py-10"
    >
      <section className="mb-6" aria-labelledby="play-game-heading">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          A little something I built
        </p>
        <h1
          id="play-game-heading"
          className="text-3xl font-semibold text-white"
        >
          Take a break and play
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          Play my Pac-Man arcade game right here. Click inside the game to get
          started.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cyan-100/80 md:hidden">
          On your phone, tap Start Mission, then use the arrow pad below the
          maze to steer.
        </p>
      </section>

      <div className="overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#080a18] shadow-[0_0_30px_rgba(34,211,238,0.08)]">
        <iframe
          src="https://pacman-nine-alpha.vercel.app/"
          title="Play Srijan's Pac-Man arcade game"
          allow="gamepad"
          allowFullScreen
          scrolling="no"
          className="h-[1066px] w-full border-0 bg-[#080a18] min-[431px]:h-[1220px] min-[801px]:h-[900px]"
        />
      </div>
    </Motion.div>
  );
}

export default Game;
