"use client";

import { useEffect } from "react";


function SuccessPage() {

  useEffect(() => {
  const verify = async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) return;

    await fetch(`/api/payment/verify?session_id=${sessionId}`);
  };

  verify();
}, []);


  return (
     <div>
       page component success
     </div>
  );
}

export default SuccessPage;