import { useEffect } from "react"

export const useClickaway = (
    ref,
    onClickAway,
    exceptionRefs
) => {
    useEffect(() => {
        function handleClickaway(event) {
            const currTarget = event.target
            if ('current' in ref) {
                handleRef(ref, currTarget)
            } else {
                ref.forEach(oneRef => {
                    handleRef(oneRef, currTarget)
                })
            }
        }

        document.addEventListener('mousedown', handleClickaway)
        return () => {
            document.removeEventListener('mousedown', handleClickaway)
        }
    }, [ref, onClickAway, exceptionRefs])

    const handleRef = (ref, currTarget) => {
        if (ref.current && !ref.current.contains(currTarget)) {
            if (exceptionRefs && exceptionRefs.length > 0) {
                let isNotClickaway = false
                exceptionRefs.forEach(rf => {
                    if (rf.current && rf.current.contains(currTarget)) {
                        isNotClickaway = isNotClickaway || true
                    }
                })

                if (!isNotClickaway) {
                    onClickAway()
                }
            } else {
                onClickAway()
            }
        }
    }
}
