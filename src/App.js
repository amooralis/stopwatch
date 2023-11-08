import React, {useState, useEffect} from 'react';
import photo from './photo.png'
import './App.css'

function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [isInformationShown, setInformationShown] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timeRecords, setTimeRecords] = useState([]);


    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const info = () => {
        if (isInformationShown) {
            return <div className="data">
                <img src={photo} alt='фото'/>
                <p><b>Алиса Морозова</b></p>
                <p><b>22г</b></p>
            </div>;
        } else {
            return;
        }
    };

    const updateTimer = () => {
        if (isRunning) {
            setSeconds((prevSeconds) => prevSeconds + 1)
        }
    }

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };


    const makeShown = () => {
        setInformationShown(!isInformationShown);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
        setTimeRecords([]);
    };

    const addFunc = () => {
        const newTimeRecord = formatTime(seconds);
        setTimeRecords((prevTimeRecords) => [...prevTimeRecords, newTimeRecord]);
    };

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(updateTimer, 1000)
            return () => {
                clearInterval(timer);
            }
        }
    })

    return (
        <div className="App">
            <div className='left-side'>
                <Stopwatch toggleTimer={toggleTimer} isRunning={isRunning} resetTimer={resetTimer}
                           formatTime={formatTime} seconds={seconds} addFunc={addFunc}/>
                <SomeList timeRecords={timeRecords}/>
            </div>
            <div className="information">
                <StudentInfo makeShown={makeShown} isInformationShown={isInformationShown} info={info}/>
            </div>
        </div>
    );
}

function Stopwatch({toggleTimer, formatTime, seconds, resetTimer, addFunc, isRunning}) {
    return (
        <div className="timer">
            <button className="main-buttons" onClick={toggleTimer}>Stopwatch</button>
            {isRunning && (<p><b>{formatTime(seconds)} секунд</b></p>)}
            <div className="little-buttons">
                <button onClick={addFunc}>Add</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

        </div>
    );
}

function SomeList({timeRecords}) {
    return (
        <div className="list">
            <p><b>Время на таймере:</b></p>
            <ul>
                {timeRecords.map((record, index) => (
                    <li key={index}>{record}</li>
                ))}
            </ul>
        </div>
    );
}

function StudentInfo({makeShown, isInformationShown, info}) {
    return (
        <>
            <button className="main-buttons" onClick={makeShown}>StudentInfo</button>
            <div>{info(isInformationShown)}</div>
        </>
    );
}

export default App;
