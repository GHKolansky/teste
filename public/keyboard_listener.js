export default function createKeyboardListener(document){
    const state = {
        observers: []
    }
    function subscribe(observerFn){
        state.observers.push(observerFn)
    }
    function notifyAll(command){
        for(const observerFn of state.observers){
            observerFn(command)
        }
    }
    document.addEventListener('keydown',handleKeyDown)
    function handleKeyDown(event){
        const keyPressed = event.key
        const command = {
            playerId: 'player1',
            keyPressed: keyPressed
        }
        notifyAll(command)
    }
    return {
        subscribe
    }
}