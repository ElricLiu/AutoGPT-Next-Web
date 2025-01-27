import React from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import { Trans, useTranslation } from "next-i18next";

export interface SignInDialogProps {
  show: boolean;
  close: () => void;
}

export const SignInDialog = ({ show, close }: SignInDialogProps) => {
  const { signIn } = useAuth();
  const { t } = useTranslation(['chat','common']);

  return (
    <Dialog
      header={`${t('common:sign-in')} 🔐`}
      isShown={show}
      close={close}
      footerButton={<Button onClick={() => void signIn()}>{t('common:sign-in')}</Button>}
    >
      <Trans i18nKey="signin-tips" ns="chat">
        <p>
          Please
          <a className="link" onClick={() => void signIn()}>
            sign in
          </a>
          to deploy an Agent! 🤖
        </p>
        <p>
          You can also use Cody chat and deep seek coder v3 after signing in.
        </p>
      </Trans>
    </Dialog>
  );
};
