import { useState, useEffect } from 'react';

export default function useDate() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const opcionesFecha = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const opcionesHora = { hour: "numeric", minute: "numeric", second: "numeric" };
    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDateTime = new Date();
            setCurrentDateTime(newDateTime);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return { currentDateTime, opcionesFecha, opcionesHora };
}
