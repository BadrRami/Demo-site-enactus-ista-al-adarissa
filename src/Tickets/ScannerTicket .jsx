import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import supabase from "../SupaBase";

const ScannerTicket = () => {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(async (decodedText) => {
      console.log("QR scanné :", decodedText);

      // 1️⃣ Vérifier ticket en DB
      const { data, error } = await supabase
        .from("Tickets")
        .select("*")
        .eq("code", decodedText)
        .single();

      if (error || !data) {
        alert("❌ Ticket invalide");
        return;
      }

      // 2️⃣ Vérifier si déjà utilisé
      if (data.statut === "Déjà utilisé") {
        alert("🚫 Ticket déjà utilisé");
        return;
      }

      // 3️⃣ Mettre à jour le statut
      const { error: updateError } = await supabase
        .from("Tickets")
        .update({ statut: "Déjà utilisé" })
        .eq("id", data.id);

      if (updateError) {
        alert("❌ Erreur lors de la validation");
        return;
      }

      alert("✅ Ticket valide ! Accès autorisé");
      scanner.clear(); // arrêter la caméra après scan
    });

    return () => scanner.clear().catch(() => {});
  }, []);

  return (
    <div>
      <h2>
        <i className="bi bi-qr-code-scan"></i> Scanner un ticket
      </h2>
      <div id="reader" style={{ width: "100%", maxWidth: "400px" }}></div>
    </div>
  );
};

export default ScannerTicket;
