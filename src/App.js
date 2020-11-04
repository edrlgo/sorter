import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

const array = [
    "Armenia",
    "Belarus",
    "France",
    "Georgia",
    "Germany",
    "Kazakhstan",
    "Malta",
    "Netherlands",
    "Poland",
    "Russia",
    "Serbia",
    "Spain",
    "Ukraine"
];

const App = () => {
    const [items, setItems] = useState({
        firstItem: "",
        secondItem: ""
    });

    const [itemList, setItemList] = useState([]);
    const [itemHistory, setItemHistory] = useState([]);
    const [rankingDone, setRankingDone] = useState(false);

    const addRank = useCallback((item) => {
        let newItemList = [...itemList];
        const itemAddIndex = itemList.findIndex(x => x.item === item);

        newItemList[itemAddIndex].rank++;

        setItemList(newItemList);
    }, [itemList]);

    const haveCompared = useCallback((firstItem, secondItem) => {
        let history = itemHistory.find(x => 
            (x.add === firstItem && x.remove === secondItem) || 
            (x.add === secondItem && x.remove === firstItem)
        );

        if (history !== undefined) {
            return true;
        }

        return false;
    }, [itemHistory]);

    useEffect(() => {
        init(array.sort());
    }, []);

    useEffect(() => {
        let firstItem = "", secondItem = "";
        let done = false;

        for (let i = 0; i < itemList.length; i++) {
            const curRank = itemList[i].rank;
            const otherArr = itemList.filter(a => a !== itemList[i]);
            firstItem = itemList[i].item;
            
            for (let j = 0; j < otherArr.length; j++) {
                if (otherArr[j].rank === curRank) {
                    secondItem = otherArr[j].item;

                    let compared = haveCompared(firstItem, secondItem);

                    if (compared) {
                        addRank(firstItem);
                    }

                    break;
                }
            }

            if (secondItem !== "") {
                done = false;
                break;
            }

            done = true;
        }

        setRankingDone(done);

        setItems({
            firstItem: done ? items.firstItem : firstItem,
            secondItem: done ? items.secondItem : secondItem
        });
    }, [addRank, haveCompared, itemList, items.firstItem, items.secondItem]);

    const onClick = (flag) => {
        let itemAdd = flag === 0 ? items.firstItem : items.secondItem;
        let itemRemove = flag === 0 ? items.secondItem : items.firstItem;

        addRank(itemAdd);
        addHistory(itemAdd, itemRemove);
    };

    const init = (arr) => {
        const newList = arr.map(x => {
            return {
                item: x,
                rank: 0
            };
        });

        setItemList(newList);
        setItemHistory([]);
    };

    const addHistory = (itemAdd, itemRemove) => {
        let newHistory = [...itemHistory];

        newHistory.push({
            add: itemAdd,
            remove: itemRemove
        });

        setItemHistory(newHistory);
    };

    return (
        <div className="App">
            <h1>Sorter</h1>

            <button onClick={(e) => onClick(0)} disabled={rankingDone} className="choose-button">
                {items.firstItem}
            </button>

            <button onClick={(e) => onClick(1)} disabled={rankingDone} className="choose-button">
                {items.secondItem}
            </button>

            <div className={rankingDone ? 'show' : 'hide'}>
                <table border="1">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        itemList.sort((a, b) => b.rank - a.rank).map((il, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{il.item}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                <button className="reset-button" onClick={() => init(array.sort())}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default App;