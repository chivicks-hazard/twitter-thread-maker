// import { useState } from "react";
import { useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import Thread from "./Thread";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [tweet, setTweet] = useState("");
  const [threads, setThreads] = useState([]);
  const [year] = useState(new Date().getFullYear());

  return (
    <div className="flex flex-col justify-center items-center relative pt-17 overflow-y-auto bg-black">
      <a
        href="https://github.com/chivicks-hazard/twitter-thread-maker"
        target="_blank"
        className="text-white text-3xl absolute top-10 right-10 hover:text-5xl duration-500"
      >
        <FaGithub />
      </a>

      <Toaster richColors position="top-right" theme="dark" />

      <div className="flex flex-col justify-center items-center mt-10">
        <FaXTwitter className="text-white text-7xl mb-10" />

        {/* Header */}
        <h1 className="text-white text-3xl font-belanosima">
          Twitter Thread Maker
        </h1>

        <p className="text-white text-xl max-sm:text-center">
          Making it easy to create your Twitter threads
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <p className="text-white text-md">Type in your tweet below</p>

        <textarea
          rows={5}
          cols={100}
          type="text"
          className="focus:outline-none resize-none text-white rounded-lg p-2 border border-white w-3/4 md:w-full mt-2"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />

        <button
          onClick={() => {
            let thread = "";

            let tempThreads = [];
            for (let i = 0; i < tweet.length; i++) {
              thread += tweet[i];

              if (thread.length === 280) {
                console.log(thread);
                tempThreads.push(thread);

                thread = "";

                continue;
              }
            }

            setThreads(tempThreads);
          }}
          className="bg-gray-200 focus:bg-white hover:bg-white text-black rounded-lg p-2 mt-6 md:mt-2 cursor-pointer"
        >
          Generate Threads
        </button>
      </div>

      <div className="text-white text-md max-sm:text-center mt-5">
        This project has no affliation with <FaXTwitter className="inline" /> or
        it's subsidiaries.
      </div>

      <div className="flex flex-col gap-5 justify-center items-center mt-10 md:mt-5 w-3/4 md:w-1/2">
        {threads.map((thread, i) => {
          return <Thread key={i + 1} thread={thread} />;
        })}
      </div>

      <footer className="mt-10 pb-3 text-white text-xl">
        <p className="text-center fs-4 fw-bold">
          Made by{" "}
          <a
            href="https://chivickshazard.vercel.app/"
            target="_blank"
            className="hover:underline"
          >
            Chivicks Hazard
          </a>
        </p>
      </footer>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;

