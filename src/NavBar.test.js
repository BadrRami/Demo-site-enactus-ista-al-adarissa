import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

/* Helper pour render avec Router */
const renderNavBar = (route = "/") => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <NavBar />
    </MemoryRouter>
  );
};

afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark-mode");
});

describe("NavBar Component", () => {

  test("affiche les liens de navigation", () => {
    renderNavBar();

    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Évènements")).toBeInTheDocument();
    expect(screen.getByText("Annonces")).toBeInTheDocument();
    expect(screen.getByText("À propos")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("affiche le bouton Login si utilisateur non connecté", () => {
    localStorage.setItem("isConnected", "false");

    renderNavBar();

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Profil")).not.toBeInTheDocument();
    expect(screen.queryByText("Déconnexion")).not.toBeInTheDocument();
  });

  test("affiche Profil et Déconnexion si utilisateur connecté", () => {
    localStorage.setItem("isConnected", "true");

    renderNavBar();

    expect(screen.getByText("Profil")).toBeInTheDocument();
    expect(screen.getByText("Déconnexion")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  test("le lien Accueil est actif quand la route est /", () => {
    renderNavBar("/");

    const accueilLink = screen.getByText("Accueil");
    expect(accueilLink.className).toContain("active");
  });

  test("active le dark mode au clic sur le bouton thème", () => {
    renderNavBar();

    const toggleThemeBtn = screen.getByLabelText("Toggle theme");
    fireEvent.click(toggleThemeBtn);

    expect(document.documentElement.classList.contains("dark-mode")).toBe(true);
  });

  test("ouvre le menu mobile au clic sur le bouton toggle", () => {
    renderNavBar();

    const toggleMenuBtn = screen.getByLabelText("Toggle navigation");
    fireEvent.click(toggleMenuBtn);

    const menu = document.querySelector(".navbar-menu");
    expect(menu.className).toContain("open");
  });

  test("la déconnexion met isConnected à false", () => {
    localStorage.setItem("isConnected", "true");

    delete window.location;
    window.location = { href: "" };

    renderNavBar();

    fireEvent.click(screen.getByText("Déconnexion"));

    expect(localStorage.getItem("isConnected")).toBe("false");
  });

});
