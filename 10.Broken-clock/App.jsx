import React from "react"
import Counter from "./components/Counter"
import FakePhone from "./components/FakePhone"
import Clock from "./components/Clock"

export default function App() {
    
    const [displayClock, setDisplayClock] = React.useState(false)

    function toggleClock() {
        setDisplayClock((currentValue) => !currentValue)
    }

    return (
        <div>
            <div className="phone-wrapper">
                <FakePhone>
                    {displayClock && <Clock toggleClock={toggleClock} />}

                    {!displayClock && (
                        <div className="toggle-button-container">
                            <button
                                className="toggle-button"
                                onClick={toggleClock}
                            >
                            </button>
                        </div>
                    )}
                </FakePhone>
            </div>

            <Counter displayClock={displayClock} />
        </div>
    )
}
