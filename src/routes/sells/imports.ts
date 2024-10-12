// Dependencias
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentCommand } from "../../store/productsInOrder.store";
import { useModal } from "../../hooks/useModal";
import { useAuthStore } from "../../store/auth/auth.store";
import { sells } from "../../lib/sellTypes.lib";
import { HOST_PATH, RESTAURANT_PATH } from "../../lib/routes.paths.lib";
import { BILLBOARD_MODAL, MAIN_MENU } from "../../lib/modals.lib";

// Importaciones de Componentes
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import MainMenu from "../../components/menus/mainMenu/mainMenu";
import BillBoard from "../../components/billBoard/billBoard";

// Estilos
import "../../styles/global/global.css";
import styles from "./sells.module.css";

// Iconos
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import backIcon from "../../assets/icon/backIcon.svg";
import table from "../../assets/icon/table.svg";
import ticket from "../../assets/icon/ticket.svg";
import cashSignal from "../../assets/icon/cashSignal.svg";
import burgerMenu from "../../assets/icon/burgerMenu.svg";

export {
  React,
  useNavigate,
  useCurrentCommand,
  useModal,
  useAuthStore,
  sells,
  HOST_PATH,
  RESTAURANT_PATH,
  BILLBOARD_MODAL,
  MAIN_MENU,
  HeaderTwo,
  MainMenu,
  BillBoard,
  styles,
  dividerIcon,
  backIcon,
  table,
  ticket,
  cashSignal,
  burgerMenu,
};
