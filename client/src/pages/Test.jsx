import React from "react";

const Test = () => {
  if ("geolocation" in navigator) {
    console.log("location Avaliable");
  } else {
    console.log("Location Not Avaliable");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  return (
    <>
      <div className="h-screen">This is Simple Testing</div>
    </>
  );
};
export default Test;
