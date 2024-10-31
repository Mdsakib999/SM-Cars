import React from "react";

const Header = () => {
  return (
    <div
      className="flex flex-col justify-start items-center text-white bg-cover bg-center bg-no-repeat h-[650px] w-[95%] md:w-[97%] mx-auto rounded-xl "
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <span className="text-sm md:text-lg mx-auto mt-20 mb-4 tracking-wider">
        Bangladesh’s First Used Car Dealership
      </span>
      <h1 className="text-2xl md:text-5xl font-bold text-center pb-16 px-2">
        Find Your Perfect Vehicle Online
      </h1>
      <div className="flex space-x-8">
        <div className="flex flex-col items-end">
          <div className="text-2xl text-right">Buy Cars</div>
          <p className="text-right  pt-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
          </p>
          <div className="flex justify-end w-full">
            <button className="text-white bg-orange-500 py-2 px-4 rounded-xl font-medium border border-white mt-10 ">
              Start Buying
            </button>
          </div>
        </div>
        <div className="h-[200px] border-l-2 border-white"></div>
        <div className="flex flex-col items-start">
          <div className="text-2xl text-left">Sell Cars</div>
          <p className="pt-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut
          </p>
          <button className="text-black bg-white py-2 px-4 rounded-xl font-medium border border-black mt-10">
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
