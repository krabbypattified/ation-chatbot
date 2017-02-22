// Simple data

// fire awaitingMessage
// on awaitingMessage: removeQueue
// the first thing
// trigger a ... render.
// when that finishes,

// queue will add thing to theQueue
// theQueue will execute something IF Something Exists, pluck it off theQueue, then wait for that something to finish, then loop
// theQueue waits to be called.



// function queue
// if called, it executes. Then says it'll take x ms. If still executing, it puts thing on hold Array.
// When x ms is up, it checks if Array has stuff in it. if not, do nothing. if so, execute that.

// draw(sometext)
// .then(draw(sometext))
// .then(displayReply and waitForReply)
// .then(goto(GOTO path))


// The chatbot
// printAllPathContent(initialPath)
// .then(displayReply and waitForReply)
// .then(printAllPathContent(theGOTO))
// .then(displayReply and waitForReply)
// ...

// The data
// Each is a node that has speech and choices
