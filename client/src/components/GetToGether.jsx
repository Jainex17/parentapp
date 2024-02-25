import React from "react";
import { Card } from "./Card";

export const GetToGether = () => {
  return (
    <>
      <div className="container">
        <div className="text-center mx-5 pb-5 border-b border-neutral-800">
          <h1 className="text-4xl font-bold mt-10 text-black dark:text-slate-100">
            Get Together
          </h1>
          <p className="text-lg mt-4 dark:text-slate-200 text-black">
            Connect with people who share your interests.
          </p>
        </div>

        <div className="flex flex-col my-10 mx-10">
          <h1 className="text-2xl font-bold">From Following</h1>
            
            <div className="flex flex-col mt-5">
                <Card
                    title="GuardianConnect: Bridging Parents and Meetings for Student Success"
                    desc="GuardianConnect is a feature designed to bridge the gap between parents and meetings, thereby ensuring the success of students."
                    time="2 hours ago"
                    link="https://meet.google.com/mwe-wqah-bvt"
                    username="dan_abramov"
                    userpfp="https://randomuser.me/api/portraits/men/3.jpg"

                />
                <Card
                    title="FamilyLink: Strengthening Parental Engagement in Meetings"
                    desc="FamilyLink is an integrated solution aimed at enhancing parental involvement in meetings pertaining to their children's educational journey. "
                    time="3 hours ago"
                    username="sophie_alpert"
                    userpfp="https://randomuser.me/api/portraits/women/32.jpg"
                />
            </div>
            
        </div>
        <div className="flex flex-col my-5 mx-10">
          <h1 className="text-2xl font-bold">From Public</h1>
            
            <div className="flex flex-col mt-5">
                <Card
                    title="ParentPortal: Empowering Parents in Meeting Participation"
                    desc="ParentPortal is a comprehensive feature designed to empower parents by facilitating their seamless participation in meetings relevant to their children's activities and progress."
                    time="4 hours ago"
                    username="ryan_florence"
                    userpfp="https://randomuser.me/api/portraits/men/31.jpg"
                />
                <Card
                    title="ParentSquare: Enhancing Parental Involvement in Meetings"
                    desc="ParentSquare is a feature designed to enhance parental involvement in meetings, thereby ensuring the success of students."
                    time="5 hours ago"
                    username="kent_cdodds"
                    userpfp="https://randomuser.me/api/portraits/men/33.jpg"
                />
            </div>
            
        </div>
      </div>
    </>
  );
};
