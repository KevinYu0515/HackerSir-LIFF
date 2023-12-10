import { type NextPage } from "next";
import { useEffect } from "react";
import { useLiff } from "~/LiffContext";

const Logout: NextPage = () => {
  const { liff } = useLiff();

  useEffect(() => {
    liff.logout();

    // reload the page to reset the liff state
    window.location.reload();
  });

  return <div>Logout</div>;
};

export default Logout;
