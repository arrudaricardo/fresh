import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import LemonDrop from "./LemonDrop.tsx";

function LemonDropHome() {
  const width = useSignal(0);
  useEffect(() => {
    function resize() {
      width.value = document.body.clientWidth;
    }
    resize();
    globalThis.addEventListener("resize", resize);
    return () => {
      globalThis.removeEventListener("resize", resize);
    };
  }, []);

  // Pretend you didn't see this. This positions the drop area
  // manually.
  const w = width.value;
  let left = 0;
  let tankWidth = "100%";
  let dropHeight = "300px";
  if (w > 1280) {
    left = 1280 / 100 * 23;
    tankWidth = "160%";
    console.log(w, left);
  } else if (w > 1080) {
    left = 1280 / 100 * 24;
    tankWidth = "160%";
  } else if (w > 768) {
    left = 1280 / 100 * 20;
    tankWidth = "160%";
  } else {
    tankWidth = "110%";
    left = 16;
    dropHeight = "200px";
  }

  return (
    <div class="w-full relative h-32 sm:h-32 pointer-events-none">
      <div class="w-full absolute bottom-0 h-96 overflow-hidden">
        <div class="w-full absolute bottom-0">
          <div
            class="w-full flex items-center justify-center flex-col relative"
            style={`left: ${left}px;`}
          >
            <LemonDrop isHome tankWidth={tankWidth} dropHeight={dropHeight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LemonDropHome;
