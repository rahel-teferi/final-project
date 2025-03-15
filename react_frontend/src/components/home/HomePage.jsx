import React from "react";
import books from "/Books.jpg";
import banner from "/banner-bg.png";
import Library1 from "/Library_1.jpg";

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "90vh",
      }}
    >
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "80px",
            padding: "150px 0 ",
            backgroundImage: `url(${Library1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "50vh",
          }}
        ></div>

        <div
          style={{
            // position: "absolute",
            textAlign: "center",
            marginTop: "-100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "90%",
            maxWidth: "1400px",
            margin: "auto",
            gap: "2vw",
            backgroundColor: "white",
            flexWrap: "wrap",
            paddingTop: "20px",
          }}
        >
          <h2 style={{ margin: "50px 0" }}>New arrials at our Library</h2>

          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "1400px",
              margin: "auto",
              gap: "2vw",
              backgroundColor: "white",
              flexWrap: "wrap",
              paddingTop: "20px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "lightBlue",
                width: "250px",
                height: "300px",
              }}
            >
              <img
                style={{
                  padding: "15px",
                  backgroundColor: "lightBlue",
                  width: "100%",
                  height: "100%",
                }}
                src="/Books.jpg"
              />
            </div>
            <div
              style={{
                backgroundColor: "lightBlue",
                width: "250px",
                height: "300px",
              }}
            >
              <img
                style={{
                  backgroundColor: "lightBlue",
                  width: "100%",
                  height: "100%",
                  padding: "15px",
                }}
                src="/Books.jpg"
              />
            </div>
            <div
              style={{
                backgroundColor: "lightBlue",
                width: "250px",
                height: "300px",
              }}
            >
              <img
                style={{
                  padding: "15px",
                  backgroundColor: "lightBlue",
                  width: "100%",
                  height: "100%",
                }}
                src="/Books.jpg"
              />
            </div>
            <div
              style={{
                backgroundColor: "lightBlue",
                width: "250px",
                height: "300px",
              }}
            >
              <img
                style={{
                  padding: "15px",
                  backgroundColor: "lightBlue",
                  width: "100%",
                  height: "100%",
                }}
                src="/Books.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
