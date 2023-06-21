import React from "react";
import Header from "./Partials/Header";
import BottomNav from "./Partials/BottomNav";
import MatchOccurring from "./Partials/Home/MatchOccurring";
import NextMatch from "./Partials/Home/NextMatch";

const Home = () => {
    return (
        <>
            <Header />
            <BottomNav />
            <div className="content">
                <MatchOccurring />
                <NextMatch />
                <div className="h-80"></div>
            </div>
        </>
    )
}

export default Home;