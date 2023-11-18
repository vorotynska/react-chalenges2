import React from "react"
import sonnetsData from "./data/sonnetsData"
import Header from "./components/Header"
import { nanoid } from "nanoid"

export default function App() {
    
  const inputRef = React.useRef()
  const [searchInput, setSearchInput] = React.useState("")

  function handleClick() {
    setSearchInput(inputRef.current.value.trim())
  }


/* Challenge

  When the user clicks the "Search" button, the text they wrote in the input field becomes the value of the searchInput state (this code has already been written). Using this value, your task is to complete the user's search as follows: 
  
    1. For each sonnet in the sonnetsData array that contains the searchInput value in one of its 
       lines, create a div with a className of "sonnet" in the "sonnets-container" div (line 34). 
    
    2. In the "sonnet" div, insert the sonnet's number property as the text content 
       of an <h3> element and then insert *each* line of the sonnet from its lines property/array as the text content of a <p> element, resulting in one <p> per line of the sonnet. 
       
    3. Test your code by searching for common words like "love", "summer", "winter", and "strange" 
       as well as words that don't appear in any sonnets, like "hello" and "weird."
*/

  const sonnets = searchInput ? sonnetsData
    .filter(sonnet => sonnet.lines
      .some(line => line.includes(searchInput)))
    .map(sonnet => (
      <div key={nanoid()} className="sonnet">
        <h3>{sonnet.number}</h3>
        {sonnet.lines.map(line => (
          <p key={nanoid()}>
            {line.split(" ").map(word => (
              word.includes(searchInput) ? <span key={nanoid()}>{word}</span> : ` ${word} `
            ))}
          </p>))}
      </div>
    )) : null
  
  const noResultsMessage = (
    <p className="no-results-message">
      Alas, thy search hath yielded no results. 
    </p>
  )
  
  let results 
  
  if (sonnets && sonnets.length > 0) {
    results = sonnets
  } else if (searchInput) {
    results = noResultsMessage
  } else {
    results = null
  }

  return (
    <div className="wrapper">
    <Header searchProps={{inputRef, handleClick}}/>
      
      <div className="sonnets-container"> 
        {results}
      </div>
      
    </div>
  )
}

/*Bonus Challenges
      
    - If there are no search results, render a <p> element in the "sonnets-container" div saying   
      "Alas, thy search hath yielded no results". Give the <p> element a className of "no-results-message."
      
    - If there are results, put a <span> around each word in the sonnet that matches the 
      searchInput value. This will automatically highlight the word (the CSS is already set up). 
*/