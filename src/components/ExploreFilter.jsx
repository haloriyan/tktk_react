import { useState } from "react";
import MXDropdown from "./MXDropdown";
import filterStyles from "./styles/ExploreFilter.module.css";

const ExploreFilter = () => {
    const users = [
        {id: 1,name: "Masyifa",email: "syifa_azl@gmail.com"},
        {id: 2,name: "Aldi",email: "aldi.mustafak2@gmail.com"},
        {id: 3,name: "Zahra Amaila",email: "zahra.lailatul389@gmail.com"},
        {id: 4,name: "Gilang Widya",email: "gilang.widya@gmail.com"},
        {id: 5,name: "Rahman Alhakim",email: "rahman@gmail.com"},
        {id: 6,name: "Wanda Wafiq",email: "wanda_w@gmail.com"},
        {id: 7,name: "Khalifa",email: "m.khalifa@gmail.com"},
        {id: 8,name: "Anas Laksono",email: "anaslole25@gmail.com"},
        {id: 9,name: "Miftahul Huda",email: "m.huda_79@gmail.com"},
    ];
    const [user, setUser] = useState([]);

    return (
        <div className={filterStyles.area}>
            {/* <div>selected : {JSON.stringify(user)}</div> */}
            <MXDropdown options={users} value={user} setValue={setUser} config={{
                key: 'name',
                label: 'Pilih User'
            }} />
        </div>
    )
}

export default ExploreFilter;