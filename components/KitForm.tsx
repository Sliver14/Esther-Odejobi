"use client";

import Script from "next/script";

export default function KitForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Kit will inject the form here */}
      <div id="kit-form-226466bb" />

      <Script
        src="https://esther-odejobi.kit.com/2228ecf8bb/index.js"
        data-uid="2228ecf8bb"
        strategy="afterInteractive"
      />
    </div>
  );
}
