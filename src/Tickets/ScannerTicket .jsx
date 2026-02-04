import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import supabase from "../SupaBase";
import LeftBar from "../LeftBar";
import './Scanner.css'

const ScannerTicket = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scanStatus, setScanStatus] = useState('scanning');
  const [scannedCount, setScannedCount] = useState(0);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(async (decodedText) => {
      console.log("QR scanné :", decodedText);
      setScanStatus('scanning');

      // 1️⃣ Vérifier ticket en DB
      const { data, error } = await supabase
        .from("Tickets")
        .select("*")
        .eq("code", decodedText)
        .single();

      if (error || !data) {
        setScanStatus('error');
        alert("❌ Ticket invalide");
        return;
      }

      // 2️⃣ Vérifier si déjà utilisé
      if (data.statut === "Déjà utilisé") {
        setScanStatus('error');
        alert("🚫 Ticket déjà utilisé");
        return;
      }

      // 3️⃣ Mettre à jour le statut
      const { error: updateError } = await supabase
        .from("Tickets")
        .update({ statut: "Déjà utilisé" })
        .eq("id", data.id);

      if (updateError) {
        setScanStatus('error');
        alert("❌ Erreur lors de la validation");
        return;
      }

      setScanStatus('success');
      setScannedCount(prev => prev + 1);
      alert("✅ Ticket valide ! Accès autorisé");
      
      // Remettre en mode scanning après 2 secondes
      setTimeout(() => setScanStatus('scanning'), 2000);
    });

    return () => scanner.clear().catch(() => {});
  }, []);

  return (
    <div className="scanner-container">
      <div className="grid-overlay"></div>

      <LeftBar />

      <div className="scanner-main-content">
        <h2>
          <i className="bi bi-qr-code-scan"></i>
          Scanner un ticket
        </h2>

        <div className="scanner-card">
          <div className="scanner-instructions">
            <h3>
              <i className="bi bi-info-circle-fill"></i>
              Instructions
            </h3>
            <ul>
              <li>Placez le QR code dans le cadre</li>
              <li>Maintenez votre appareil stable</li>
              <li>Assurez-vous d'avoir un bon éclairage</li>
            </ul>
          </div>

          <div id="reader"></div>

          {scanStatus === 'scanning' && (
            <div className="status-badge scanning">
              <i className="bi bi-camera-video"></i>
              En attente de scan...
            </div>
          )}

          {scanStatus === 'success' && (
            <div className="status-badge success">
              <i className="bi bi-check-circle"></i>
              Ticket validé !
            </div>
          )}

          {scanStatus === 'error' && (
            <div className="status-badge error">
              <i className="bi bi-x-circle"></i>
              Ticket refusé
            </div>
          )}

          <div className="scanner-stats">
            <div className="stat-item">
              <div className="stat-number">{scannedCount}</div>
              <div className="stat-label">Scannés</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <i className="bi bi-camera"></i>
              </div>
              <div className="stat-label">Actif</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerTicket;