import React, { useState } from 'react';

function ReadMore({ text, maxLength , textlength }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" flex flex-row justify-normal flex-wrap  w-[7.4vw]  text-s m-0">
      {/* Show part of the text based on the isExpanded state */}
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      
      {/* Button to toggle between "Read More" and "Show Less" */}
     { textlength >= maxLength && <button 
        onClick={toggleReadMore} 
        className="text-slate-700 hover:text-slate-900  "
      >
        {isExpanded ? "Less" : "More"}
      </button>}
    </div>
  );
}
 
export  { ReadMore}