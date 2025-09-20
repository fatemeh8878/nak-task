import React from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/authStore";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const userName = user || t("user");
  console.log(user);

  return (
    <div
      style={{
        width: "100%",
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "7px",
        }}
      >
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "700",
            color: "#000433",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {t("helloUser", { name: userName })}
        </h1>

        <p
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "##000433",
            lineHeight: "40px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {t("welcomeMessage", { name: userName })}
          <br />
          {t("welcomeMessage2")}
        </p>
      </div>
    </div>
  );
};

export default Home;
