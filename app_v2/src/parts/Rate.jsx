import { useState } from "react";
import styled from "styled-components";
import { Flex } from "."

const Star = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &.on {
    color: #000;
  }
  &.off {
    color: #ccc;
  }
`;

export default function({ changed = () => {} }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <Flex>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Star
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {
		setRating(index);
	   	changed(index);
	    }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            &#9733;
          </Star>
        );
      })}
    </Flex>
  );
};