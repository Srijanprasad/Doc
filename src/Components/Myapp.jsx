import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function ChitChatCard() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min-copy" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
      });
    })();
  }, []);

  return (
    <>
      <button
        data-cal-namespace="15min-copy"
        data-cal-link="srijan-prasad-cq5whk/15min-copy"
        data-cal-config='{"layout":"month_view"}'
        className="py-8 w-full text-left transform transition duration-300 hover:scale-98 cursor-pointer"
      >
        <section>
          <div
            className="rounded-2xl p-6 md:p-10 flex justify-between items-start border border-white shadow-lg"
            style={{
              background: "linear-gradient(90deg, #004e4e 0%, #013220 100%)",
            }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                1 on 1 Chit-chat Session
              </h2>
              <p className="mb-2">Let&apos;s talk with or without coffee</p>
              <span className="text-sm font-medium">15 Min</span>
            </div>

            <div>
              <img
                src="icons/newwmeett.svg"
                alt="Contact Icon"
                className="w-20 h-20"
              />
            </div>
          </div>
        </section>
      </button>
    </>
  );
}
