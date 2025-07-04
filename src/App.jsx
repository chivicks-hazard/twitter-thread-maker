// import { useState } from "react";
import { useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import Thread from "./Thread";
import { Toaster, toast } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [tweet, setTweet] = useState("");
  const [threads, setThreads] = useState([]);
  const [year] = useState(new Date().getFullYear());

  const createThreads = () => {
    // * Type checking
    if (!tweet || typeof tweet !== "string") {
      toast.error("Input must be a non-empty string");

      throw new Error("Input must be a non-empty string");
    }

    const tempThreads = [];
    let currentThread = "";

    // * Split the tweet into words
    const words = tweet.trim().split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const potentialThread = currentThread + (currentThread ? " " : "") + word;

      // * Check if the potential thread is too long
      if (potentialThread.length > 280) {
        if (currentThread.length > 0) {
          tempThreads.push(currentThread);
        }

        currentThread = word;
      } else {
        currentThread = potentialThread;
      }
    }

    // * Add the last thread
    if (currentThread.length > 0) {
      tempThreads.push(currentThread);
    }

    setThreads(tempThreads);
  };

  // const createThreads = () => {
  //   let thread = "";

  //   let tempThreads = [];

  //   let tweetArray = tweet.split(" ");

  //   console.log(tweetArray[0]);

  //   for (let i = 0; i < tweetArray.length; i++) {
  //     thread += tweetArray[i] + " ";

  //     if (thread.length >= 280) {
  //       // console.log(thread);
  //       tempThreads.push(thread);

  //       thread = "";

  //       continue;
  //     }
  //   }

  //   console.log(thread);

  //   tempThreads.push(thread);

  //   tempThreads.forEach((thread, index) => {
  //     console.log(
  //       `Thread ${index + 1}: ${thread} (${thread.length} characters)`
  //     );
  //   });
  // };

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
          onClick={createThreads}
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

