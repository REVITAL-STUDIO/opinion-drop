"use client";
import React, { useEffect, useState } from "react";
import downGraph from "publicVector-62.svg";

const Engagement = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 3000;
    const stepTime = duration / end;

    const interval = setInterval(() => {
      start++;
      setProgress(start);
      if (start === end) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full p-4 rounded-full my-4">
      <div className=" w-1/4 bg-[#fff]/90 relative mx-auto rounded-xl flex justify-center items-center">
        {/* Attention Currency */}
        <div className="w-1/2 flex flex-col justify-center items-center relative p-4">
          <span className="text-base text-black font-semibold ">
            Attention Currency
          </span>
          {/* Progression Bar */}
          <div className="progress relative w-24 top-4 h-24 rounded-full overflow-hidden ">
            <div className="barOverflow absolute w-full h-full clip-rect-0-100-100-50">
              <div
                className="bar absolute w-full h-full  clip-rect-0-50-100-0 transform origin-center"
                style={{ transform: `rotate(${45 + progress * 1.8}deg)` }}
              ></div>
            </div>
            <div className="w-full flex flex-col items-center absolute top-[60%]">
              <div className="flex items-center text-black">
                <span className="text-base font-black flex">{progress}</span>%
              </div>
            </div>
          </div>
        </div>
        {/* Trending */}
        <div className="w-1/2 flex flex-col justify-center items-center relative p-4">
          <span className="text-base text-black font-semibold mb-1">Trending</span>
          <div className="w-full h-[100px]  relative flex justify-center items-center">
            <svg
              width="150"
              height="51"
              viewBox="0 0 203 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" absolute mx-auto z-10"
            >
              <path
                d="M48.0738 45.6733L49.6276 43.7148L47.6981 42.184L46.1387 44.0905L48.0738 45.6733ZM72.3771 64.9551L70.8233 66.9136L72.7217 68.4198L74.2863 66.5692L72.3771 64.9551ZM103.261 28.424L104.978 26.6067L103.058 24.7926L101.352 26.81L103.261 28.424ZM147.307 70.0324L145.591 71.8498L147.57 73.7193L149.264 71.5885L147.307 70.0324ZM203 0L176.142 10.5832L198.737 28.5509L203 0ZM3.93509 103.583L50.0089 47.2562L46.1387 44.0905L0.0649107 100.417L3.93509 103.583ZM46.52 47.6318L70.8233 66.9136L73.931 62.9966L49.6276 43.7148L46.52 47.6318ZM74.2863 66.5692L105.171 30.038L101.352 26.81L70.468 63.3411L74.2863 66.5692ZM101.545 30.2413L145.591 71.8498L149.024 68.2151L104.978 26.6067L101.545 30.2413ZM149.264 71.5885L190.952 19.1664L187.039 16.0543L145.351 68.4764L149.264 71.5885Z"
                fill="#FF0000"
              />
            </svg>
            <svg
              width="150"
              height="51"
              viewBox="0 0 185 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute mx-auto opacity-30"
            >
              <path
                d="M32.5449 41.0821L34.4808 39.5002L32.2594 36.7817L30.4169 39.77L32.5449 41.0821ZM48.4983 60.6059L46.5625 62.1878L49.2286 65.4506L50.8145 61.5469L48.4983 60.6059ZM62.677 25.7061L64.6493 24.1699L61.9899 20.7554L60.3608 24.7651L62.677 25.7061ZM89.8599 60.6059L87.8876 62.1421L89.9652 64.8096L91.9067 62.0414L89.8599 60.6059ZM128.859 5L130.73 3.34108L128.63 0.973586L126.813 3.56448L128.859 5ZM185 68.2939L179.209 40.0132L157.613 59.1687L185 68.2939ZM5.12802 90.3121L34.6729 42.3942L30.4169 39.77L0.871984 87.6879L5.12802 90.3121ZM30.609 42.664L46.5625 62.1878L50.4342 59.024L34.4808 39.5002L30.609 42.664ZM50.8145 61.5469L64.9932 26.6471L60.3608 24.7651L46.1822 59.6649L50.8145 61.5469ZM60.7047 27.2423L87.8876 62.1421L91.8322 59.0697L64.6493 24.1699L60.7047 27.2423ZM91.9067 62.0414L130.906 6.43552L126.813 3.56448L87.8131 59.1704L91.9067 62.0414ZM126.989 6.65892L168.199 53.1202L171.94 49.8024L130.73 3.34108L126.989 6.65892Z"
                fill="#507FD9"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engagement;
