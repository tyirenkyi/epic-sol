import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardComponent from "../components/dashboard/";
import NFTCoupons from "../components/dashboard/NFTCoupons";
import Reports from "../components/dashboard/Reports";
import Products from "../components/dashboard/products";

const nav = ["Dashboard", "Products", "NFT Coupons", "Reports"];

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const SwitchTab = () => {
    console.log(selectedTab);
    switch (selectedTab) {
      case "Dashboard":
        return <DashboardComponent />;
      case "Products":
        return <Products />;
      case "NFT Coupons":
        return <NFTCoupons />;
      case "Reports":
        return <Reports />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className="container-lg min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-row">
        <div className="basis-1/4 flex flex-col   p-2 h-full ">
          <h2 className="text-white py-4">SolStore</h2>
          <div className="flex flex-col my-8 h-full">
            {nav.map((navItem) => {
              return (
                <button
                  key={navItem}
                  onClick={() => setSelectedTab(navItem)}
                  className="w-full bg-clip-padding mb-4 py-3 text-base bg-slate-50 bg-opacity-0 hover:text-white hover:bg-opacity-30 rounded-md "
                >
                  {navItem}
                </button>
              );
            })}
          </div>
        </div>
        <div className="basis-3/4 p-2 m-2 bg-white rounded-xl">
          {SwitchTab()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
