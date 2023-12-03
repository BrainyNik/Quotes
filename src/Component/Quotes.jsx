import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  GenerateRandomCategory,
  categories,
} from "../Utilities/GenerateRandomCategory";


const Quotes = () => {

  
  const [quote, setQuote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    JSON.parse(localStorage.getItem("currentCategory")) || "random"
  );
  const [isVisible, setIsVisible] = useState(false);



  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("currentCategory", JSON.stringify(category));
    setIsVisible(false);
  };

 const fetchQuotesByCategory = useCallback(
   async () => { 
     let random;
     if (selectedCategory === "random") {
        random = GenerateRandomCategory();
     }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}${random ? random : selectedCategory}`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_API_SECRET_KEY,
          },
        }
      );

      if (response.status === 200) {
        const quotes = response.data;
        
        setQuote(quotes[0]);
       
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  },
   [selectedCategory]
 );



  useEffect(() => {
    // Fetch initial quotes
    
    fetchQuotesByCategory();

    // Set up a timer to fetch new quotes every 10 seconds
    const timer = setInterval(() => {
      fetchQuotesByCategory();
    }, 10000);

    return () => {
      //   Clear the timer when the component unmounts
      clearInterval(timer);
    };
  }, [fetchQuotesByCategory]);

  return (
  <div className="quotes">
      
      {quote ? (
        <p>{quote.quote}</p>
      ) : (
        <div className="loadingio-spinner-ellipsis-mty16tstggo">
          <div className="ldio-d4jd6rw09ab">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {quote ? <p>- {quote.author}</p> : ""}

      <div className="category">
        <button className="category_btn" onClick={toggleVisibility}>
          {selectedCategory ? `Category : ${selectedCategory}` : "Categories"}
        </button>
        {isVisible && (
          <div className="categories">
            {categories?.map((category, index) => (
              <li key={index}>
                <button
                  className="cat_btn"
                  onClick={() => changeCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
