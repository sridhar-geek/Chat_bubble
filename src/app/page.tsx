import Cards from "@/components/HomePage/Cards";
import Image from "next/image";
import React from "react";
import NavigationBtn from "@/components/HomePage/NavigationBtn";
import Header from "@/components/Headers/Header";

const Home = () => {
  return (
    <>
      <Header />
      <main className="px-2 py-3">
        {/* welcome text */}
        <section className="mx-auto max-w-7xl py-3 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:w-1/2 items-center gap-3 md:items-start justify-center md:justify-start">
            <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
              Start chatting with customers , anywhere anytime with applacation{" "}
            </h1>
            <p className="md:text-left font-light text-center">
              Great software that allows you to chat from any place at any time
              without any interruption.
            </p>
            <NavigationBtn />
            <div className="flex gap-4 justify-between items-center">
              <Image
                src="/dashboard1.png"
                alt="people"
                width={50}
                height={50}
              />
              <div className="flex flex-col items-start">
                <p className="font-bold text-xl">2909</p>
                <p>Happy Customers</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold text-xl">4.8/5</p>
                <p> Rating</p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/dashboard2.png"
              alt="Dashboard"
              height={800}
              width={800}
            />
          </div>
        </section>
        {/* features */}
        <section className=" mx-auto py-5 max-w-7xl bg-[#fafafa1c] rounded-md">
          <h2 className="text-xl text-center font-bold py-6 text-gray-600 transition-colors">
            Features for better Experience
          </h2>
          <div className="max-w-6xl mx-auto flex flex-col w-full justify-between items-center md:flex-row gap-5">
            <Cards
              heading="Video Messaging"
              svg="/dashboard/video.svg"
              content=" This software is very easy for you to manage you can use it as you
          wish."
            />
            <Cards
              heading="Keep Safe and Private"
              svg="/dashboard/wifi.svg"
              content=" This software is very easy for you to manage you can use it as you
          wish."
            />
            <Cards
              heading="Save your time"
              svg="/dashboard/timer.svg"
              content=" This software is very easy for you to manage you can use it as you
          wish."
            />
          </div>
        </section>
        {/* Meetings */}
        <section className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 py-4">
          <div>
            <Image
              src="/dashboard/videoCall.png"
              alt="Dashboard"
              height={800}
              width={800}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-full text-center">
            <h1 className="text-xl font-bold ">
              Meet your customers, with live video chat
            </h1>
            <p>
              Great software that allows you to chat from any place at any time
              without any interruption
            </p>
            <p>
              Great software that allows you to chat from any place at any time
              without any interruption.Great software that allows you to chat
              from any place at any time without any interruption.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
