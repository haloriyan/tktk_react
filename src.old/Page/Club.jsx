import React, { useState } from "react";
import Header from "./Partials/Header";
import * as BaseStyle from "../styles/base";
import BottomNav from "./Partials/BottomNav";
import ClubNews from "./Partials/Club/News";
import ClubTeam from "./Partials/Club/Team";
import NextMatch from "./Partials/Home/NextMatch";

const Club = () => {
    const [description, setDescription] = useState(`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores et, voluptates qui nihil a provident autem accusamus eum nam, nulla voluptatum exercitationem doloremque quod dolorum at aperiam dicta aut consequuntur?\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores et, voluptates qui nihil a provident autem accusamus eum nam, nulla voluptatum exercitationem doloremque quod dolorum at aperiam dicta aut consequuntur?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores et, voluptates qui nihil a provident autem accusamus eum nam, nulla voluptatum exercitationem doloremque quod dolorum at aperiam dicta aut consequuntur?`);
    const [descriptionShow, setDescriptionShow] = useState('less');

    return (
        <>
            <div className="content" style={{zIndex: 2}}>
                <Header />
                <img 
                    src="/images/dummy/soccer.jpg" alt="Soccer" 
                    className="w-100 ratio-16-9"
                    style={{
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                    }}
                />
                <div className="InfoArea pl-4 pr-4 flex row item-end">
                    <img 
                        src="/images/dummy/IM-logo.jpg" alt="IM" 
                        className="h-80 ratio-1-1 rounded-max"
                        style={{
                            marginTop: -50,
                            borderColor: '#fff',
                            borderWidth: 10,
                            borderStyle: 'solid'
                        }}
                    />
                    <div className="text bold ml-2 mb-2 flex grow-1">
                        Indonesia Memes
                    </div>
                    <div className="bg-primary rounded text small mb-15 p-05 pl-2 pr-2">
                        Follow
                    </div>
                </div>

                <div className="h-20"></div>
                <div className="flex row item-center mb-2">
                    <div className="text bold size-20 flex grow-1">Tentang</div>
                </div>
                
                {
                    descriptionShow == 'less' ?
                        <div>
                            <pre className="text mt-1">{description.split(' ').splice(0, 25).join(' ')}</pre>
                            <span className="text primary pointer small" onClick={() => setDescriptionShow('all')}>Selengkapnya</span>
                        </div>
                    :
                        <div>
                            <pre className="text mt-1">{description}</pre>
                            <span className="text primary pointer small" onClick={() => setDescriptionShow('less')}>Lebih Sedikit</span>
                        </div>
                }

                <div className="h-20"></div>
                <NextMatch />

                <div className="h-20"></div>
                <ClubTeam />
                <div className="h-20"></div>
                <ClubNews />

                <div className="h-80"></div>

                <BottomNav />
            </div>
        </>
    )
}

export default Club;