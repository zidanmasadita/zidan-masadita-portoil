"use client";

import React from "react";
import Image from "next/image";

export default function ThumbnailPage() {
  return (
    <div style={{
      background: "#111",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      {/* 1200x630 is the exact optimal size for LinkedIn link thumbnails */}
      <div style={{
        width: "1200px",
        height: "630px",
        backgroundColor: "#faf6ed", /* matches your cream theme */
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        fontFamily: "'Nunito', sans-serif"
      }}>
        
        {/* Background Decorative Veggies (Optional abstract look) */}
        <div style={{ position: "absolute", top: -50, left: -50, opacity: 0.1, transform: "scale(1.5)" }}>
          <Image src="/veggie_stickers.png" alt="bg" width={800} height={800} />
        </div>
        <div style={{ position: "absolute", bottom: -50, right: -50, opacity: 0.1, transform: "scale(1.5)" }}>
          <Image src="/veggie_stickers.png" alt="bg" width={800} height={800} />
        </div>

        {/* Logos */}
        <div style={{ position: "absolute", top: "40px", left: "50px" }}>
          <Image src="/logo-bg.png" alt="Logo 1" width={180} height={60} style={{ objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", top: "40px", right: "50px" }}>
          <Image src="/logo-il.png" alt="Logo 2" width={180} height={60} style={{ objectFit: "contain" }} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "64px",
          fontWeight: 900,
          color: "#1a1818",
          marginTop: "40px",
          marginBottom: "50px",
          zIndex: 10,
          textAlign: "center",
          letterSpacing: "-1px"
        }}>
          Zidan Masadita <span style={{ color: "#74a830" }}>Portfolio</span>
        </h1>

        {/* 3 Mobile Phones */}
        <div style={{
          display: "flex",
          gap: "40px",
          zIndex: 10,
          alignItems: "center"
        }}>
          {/* Phone 1 */}
          <div style={{
            width: "230px",
            height: "460px",
            background: "#1a1818",
            borderRadius: "32px",
            padding: "8px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            transform: "translateY(15px) rotate(-2deg)"
          }}>
            <Image src="/Dashboard.png" alt="Dashboard" width={214} height={444} style={{ borderRadius: "24px", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Phone 2 (Center - elevated) */}
          <div style={{
            width: "250px",
            height: "500px",
            background: "#1a1818",
            borderRadius: "32px",
            padding: "8px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
            transform: "translateY(-15px)",
            zIndex: 2
          }}>
            <Image src="/Inventory.png" alt="Inventory" width={234} height={484} style={{ borderRadius: "24px", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Phone 3 */}
          <div style={{
            width: "230px",
            height: "460px",
            background: "#1a1818",
            borderRadius: "32px",
            padding: "8px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            transform: "translateY(15px) rotate(2deg)"
          }}>
            <Image src="/Badge Progression.png" alt="Badge Progression" width={214} height={444} style={{ borderRadius: "24px", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

      </div>
    </div>
  );
}
