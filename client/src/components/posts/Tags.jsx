import React, { useState } from 'react';

const Tags = ({ selected, setSelected }) => {
    const [search, setSearch] = useState('');
    const [showSelector, setShowSelector] = useState(false);
    const [options, setOptions] = useState([]);

    const clearOpts = () => {
        setSearch('');
        setShowSelector(false);
        setOptions([]);
    };

    const select = (id, name) => {
        setSelected({ ...selected, [id]: name });
        clearOpts();
        window.dispatchEvent(new Event('selected'));
    };

    const remove = (id) => {
        const newSelected = { ...selected };
        delete newSelected[id];
        setSelected(newSelected);
        window.dispatchEvent(new Event('selected'));
    };

    const goSearch = () => {
        if (search) {
            setOptions({
                "1": "Single Parent",
                "2": "Expecting",
                "3": "New Parent",
                "4": "Busy Parent",
                "5": "Working Parent",
                "6": "Stay-at-home",
                "7": "First-time",
                "8": "Joint Family",
                "9": "Nuclear Family",
                "10": "Toddler",
                "11": "Teen",
                "12": "Special Needs",
                "13": "Newborn",
                "14": "Budget Parent",
                "15": "Co-Parenting",
                "16": "Step Family",
                "17": "Single Income",
                "18": "Multiple Children",
                "19": "Grandparent",
                "20": "Disabilities",
                "21": "Aging Parents",
                "22": "Twins",
                "23": "Illness",
                "24": "Home-schooling",
                "25": "Picky Eater",
                "26": "Entrepreneurial",
                "27": "Bilingual",
                "28": "Metro City",
                "29": "Rural Parenting",
                "30": "Allergies",
                "31": "ADHD",
                "32": "Autism",
                "33": "Health-conscious",
                "34": "Tech-Savvy",
                "35": "Traditional",
                "36": "Mindful",
                "37": "Eco-conscious",
                "38": "Cultural Influences",
                "39": "Financial Focus",
                "40": "Challenges",
                "41": "Support System",
                "42": "Family Ties",
                "43": "Outdoor Adventures",
                "44": "Tech Time",
                "45": "Learning Moments",
                "46": "Teen Talks",
                "47": "Bonding Time",
                "48": "Creative Kids",
                "49": "Nature Exploration",
                "50": "Parenthood Joy",
                "51": "Navigating Teens",
                "52": "Learning Curve",
                "53": "Parenting Goals",
                "54": "Wellbeing",
                "55": "Everyday Heroes",
                "56": "Parenting Balance",
                "57": "Family Love",
                "58": "Embracing Chaos",
                "59": "Positive Parenting",
                "60": "Sleep Struggles",
                "61": "Mealtime Madness",
                "62": "Busy Bees",
                "63": "Work-Life",
                "64": "Quality Time",
                "65": "Outdoor Fun",
                "66": "Sibling Fun",
                "67": "Growing Pains",
                "68": "Daily Adventures",
                "69": "Parenthood Bliss",
                "70": "Coping Challenges",
                "71": "Parenting Tips",
                "72": "Connected Family",
                "73": "Cherished Moments",
                "74": "Balancing Act",
                "75": "Tiny Triumphs",
                "76": "Parenting Journey",
                "77": "Simple Pleasures",
                "78": "Happy Chaos",
                "79": "Creative Parenting",
                "80": "Laughter Therapy",
                "81": "Parenting Magic",
                "82": "Daily Discoveries",
                "83": "Parenting Success",
                "84": "Heartfelt Moments",
                "85": "Positive Vibes",
                "86": "Daily Smiles",
                "87": "Parenting Milestones",
                "88": "Parenting Wonders"
              }
              );
            setShowSelector(true);
        } else {
            setShowSelector(false);
        }
    };
    
    

    return (
        <div className="w-full text-sm min-w-0 outline-none dark:text-white dark:bg-neutral-800 p-1 rounded-md border border-gray-300 dark:border-gray-700">
            <div className="bg-white dark:bg-neutral-800 rounded-md flex gap-1 flex-wrap" onClick={() => document.getElementById('search_input').focus()}>
                {Object.entries(selected).map(([id, name]) => (
                    <div key={id} className="dark:bg-gray-700 rounded-md flex items-center border border-gray-300 dark:border-gray-700">
                        <div className="p-1.5">{name}</div>
                        <div onClick={() => remove(id)} className="p-2 select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5745 1L1 12.5745" stroke="#FEAD69" strokeWidth="2" strokeLinecap="round" />
                                <path d="M1.00024 1L12.5747 12.5745" stroke="#FEAD69" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                ))}
                <div className="flex-1 pl-1">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} id="search_input" onInput={() => setTimeout(goSearch, 400)} placeholder="Search For Tag" className="w-full dark:bg-neutral-800 pl-2 border-0 focus:border-0 focus:outline-none focus:ring-0 py-2 rounded-md px-0" autoComplete="off" />
                    {showSelector && (
                        <div className="absolute overflow-y-scroll h-1/2 w-1/2 mt-2 bg-white dark:bg-neutral-700 z-30 rounded-md font-medium">
                            <div className="p-2 space-y-1">
                                {Object.entries(options).map(([id, name]) => (
                                    <div key={id}>
                                        {selected && !selected[id] && (
                                            <div onClick={() => select(id, name)} className="border-2 cursor-pointer rounded-md p-2">{name}</div>
                                        )}
                                    </div>
                                ))}
                                {options.length === 0 && (
                                    <div className="text-gray-500">No result</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tags;
