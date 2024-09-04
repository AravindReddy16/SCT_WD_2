import React,{useState,useEffect} from "react";
import "../styles/main.css";

export default function Main(){
    let [hour,setHour] = useState(0);
    let [minute,setMinute] = useState(0);
    let [second,setSecond] = useState(0);
    let [milli,setMilli] = useState(0);
    let [isStart,setIsStart] = useState(false);
    let [records,setRecords] = useState([]);

    useEffect(() => {
        if(isStart) {
            let interval = setInterval(() => {
                setMilli(milli => milli+1);
                if(milli >= 100){
                    setSecond(second => second+1)
                    setMilli(0);
                }
                if(second >= 60) {
                    setMinute(minute => minute+1);
                    setSecond(0);
                }
                if(minute >= 60) {
                    setHour(hour => hour+1);
                    setMinute(0);
                }
            }, 10);
            return () => clearInterval(interval);
        }
    })

    function reset() {
        setIsStart(false);
        setHour(0);
        setMinute(0);
        setSecond(0);
        setMilli(0);
        setRecords([]);
    }

    function record() {
        setRecords((record) => [...record,{"h":hour,"m":minute,"s":second,"ms":milli}]);
    }

    return (
        <div className="Main">
            <div className="topbar">
                <h1>Stopwatch</h1>
                <button onClick={() => window.close()}>Exit</button>
            </div>
            <div className="mainbox">
                <div className="display">
                    <div className="timebox">
                        <div className="Timer">
                            <div className="number">
                                <span>{hour < 10 ? "0" + hour : hour}</span>
                            </div>
                            <div className="header">
                                <span>H</span>
                            </div>
                        </div>
                        <div className="Timer">
                            <div className="number">
                                <span>{minute < 10 ? "0" + minute : minute}</span>
                            </div>
                            <div className="header">
                                <span>M</span>
                            </div>
                        </div>
                        <div className="Timer">
                            <div className="number">
                                <span>{second < 10 ? "0" + second : second}</span>
                            </div>
                            <div className="header">
                                <span>S</span>
                            </div>
                        </div>
                        <div className="Timer">
                            <div className="number">
                                <span>{milli < 10 ? "0" + milli : milli}</span>
                            </div>
                            <div className="header">
                                <span>MS</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <div className="controlbox">
                        <div className="stopwatchbox">
                            <button onClick={() => setIsStart(!isStart)}>{isStart ? "Pause" : "Start"}</button>
                            <button onClick={reset}>Reset</button>
                        </div>
                        <div className="lapbox">
                            <button onClick={record}>Lap</button>
                        </div>
                        <div className="records">
                            {records.length > 0 ? 
                            <ol lang="1">
                                {records.map((recordings,ind) => <li key={ind}>{recordings.h}h - {recordings.m}m - {recordings.s}s - {recordings.ms}ms</li>)}
                            </ol> : <p>No Records</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}