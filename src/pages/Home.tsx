import { css } from "@emotion/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/authStore";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const userName = user || t("user");
  console.log(user);

  const containerStyles = css`
    width: 100%;
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const cardStyles = css`
    background-color: white;
    padding: 40px;
    border-radius: 7px;
  `;

  const titleStyles = css`
    font-size: 25px;
    font-weight: 700;
    color: #000433;
    font-family: Inter, sans-serif;
  `;

  const textStyles = css`
    font-size: 20px;
    font-weight: 600;
    color: #000433;
    line-height: 40px;
    font-family: Inter, sans-serif;
  `;

  return (
    <div css={containerStyles}>
      <div css={cardStyles}>
        <h1 css={titleStyles}>{t("helloUser", { name: userName })}</h1>

        <p css={textStyles}>
          {t("welcomeMessage", { name: userName })}
          <br />
          {t("welcomeMessage2")}
        </p>
      </div>
    </div>
  );
};

export default Home;
