import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import styles from "./register.module.css";
// Icons
import trashIcon from "../../../assets/icon/trashIcon.svg";
import finger from "./../../../assets/icon/fingerIcon.svg";
import leftHand from "./../../../assets/icon/leftHand.svg";
import rightHand from "./../../../assets/icon/rightHand.svg";
import crossCancel from "./../../../assets/icon/crossCancel.svg";
import UseFingerCapture from "../../../hooks/useFingerCapture";
import confirm from "../../../assets/icon/checkIcon.svg";
import notConfirm from "../../../assets/icon/notConfirm.svg";
import Loader from "../../../components/loader/loader";
import { useModal } from "../../../hooks/useModal";
import ConfirmChanges from "../../../components/modals/confirm/confirmChanges";

interface Props {
  user: User;
  setUser: (argument: any) => void;
}
export default function Register({ user, setUser }: Props) {
  const { initReader, huella, setHuella, saveSamples, isLoading, errors } =
    UseFingerCapture();
  const [startCapture, setStartCapture] = useState(false);
  const [active, setActive] = useState(false);
  const confirmChanges = useModal("confirmChanges");

  useEffect(() => {
    if (huella.length === 4) {
      saveSamples(user._id, huella);
      confirmChanges.openModal();
      setHuella([]);
      return;
    }
  }, [huella]);
  return (
    <main className={styles.container}>
      {user?.samples.length > 0 ? (
        isLoading ? (
          <div className={styles.loaderContainer}>
            <Loader />
            <span>Guardando</span>{" "}
          </div>
        ) : (
          <div>
            {user?.name ? (
              <section className={styles.headerRegister}>
                <div style={{ background: user.color }}>
                  {user.name.slice(0, 2).toLocaleUpperCase()}
                </div>
                <h6>{`${user.name} ${user.lastName}`}</h6>
              </section>
            ) : (
              <section className={styles.headerRegister}></section>
            )}
            <section className={styles.registerProcessTwo}>
              <img
                className={styles.handFirst}
                src={leftHand}
                alt="left-hand"
              />
              <div>
                <h3>Huella registrada</h3>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    saveSamples(user._id, []);
                    confirmChanges.openModal();
                  }}
                >
                  <img src={trashIcon} alt="trash-icon" />
                  Eliminar
                </button>
              </div>
            </section>
            {!isLoading && confirmChanges.isOpen ? (
              <ConfirmChanges
                action={setUser}
                route="/"
                onClose={confirmChanges.closeModal}
                isOpen={confirmChanges.isOpen}
              >
                {
                  <>
                    <img
                      src={errors ? notConfirm : confirm}
                      alt="confim-icon"
                    />
                    <br />
                    <br />
                    <h2>{errors ? "Reintentar" : "Guardado"}</h2>
                  </>
                }
              </ConfirmChanges>
            ) : null}
          </div>
        )
      ) : (
        <>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loader />
              <span>Guardando</span>{" "}
            </div>
          ) : (
            <div>
              {user?.name ? (
                <section className={styles.headerRegister}>
                  <div style={{ background: user.color }}>
                    {user.name.slice(0, 2).toLocaleUpperCase()}
                  </div>
                  <h6>{`${user.name} ${user.lastName}`}</h6>
                </section>
              ) : (
                <section className={styles.headerRegister}></section>
              )}
              {active ? (
                <section className={styles.registerProcess}>
                  <div className={styles.handsContainer}>
                    <div>
                      <img
                        className={styles.hand}
                        src={rightHand}
                        alt="right-hand"
                      />
                      {startCapture && (
                        <div className={styles.fingerIndicator}></div>
                      )}
                    </div>
                  </div>
                  <div className={styles.indicatorsContainer}>
                    {!startCapture && (
                      <div>
                        <p>
                          ¡Bienvenido! Para mejorar la seguridad, te invitamos a
                          registrar tu huella digital.
                        </p>
                        <span>
                          Asegúrate de que tus manos estén limpias y secas antes
                          de comenzar.
                        </span>
                        <button
                          onClick={() => {
                            setStartCapture(true);
                            initReader();
                          }}
                          className={styles.startCaptureBtn}
                        >
                          Iniciar captura
                        </button>
                      </div>
                    )}

                    {startCapture && (
                      <div>
                        <span>
                          - Coloca tu dedo en el sensor y Presiona tu dedo con
                          firmeza.
                        </span>
                        <br />
                        <span>
                          - Mantén tu dedo en posición hasta que veas una
                          confirmación en la pantalla.
                        </span>
                        <div className={styles.indicatorsItemContainer}>
                          <button
                            disabled={!huella.length}
                            className={styles.processIndicator}
                          >
                            1
                          </button>
                          <button
                            disabled={huella.length <= 1}
                            className={styles.processIndicator}
                          >
                            2
                          </button>
                          <button
                            disabled={huella.length <= 2}
                            className={styles.processIndicator}
                          >
                            3
                          </button>
                          <button
                            disabled={huella.length <= 3}
                            className={styles.processIndicator}
                          >
                            4
                          </button>
                        </div>
                        {huella.length <= 4 && (
                          <button
                            className={styles.cancelBtn}
                            onClick={() => {
                              setStartCapture(false);
                              setHuella([]);
                            }}
                          >
                            <img src={crossCancel} alt="cross-cancel" />
                            Cancelar
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                <section className={styles.register}>
                  <h2>No hay huellas asignadas</h2>
                  <button
                    onClick={() => {
                      setActive(true);
                    }}
                  >
                    <img src={finger} alt="finger-icon" />
                    Comenzar registro
                  </button>
                </section>
              )}
            </div>
          )}
          {!isLoading && confirmChanges.isOpen ? (
            <ConfirmChanges
              action={setUser}
              route="/"
              onClose={confirmChanges.closeModal}
              isOpen={confirmChanges.isOpen}
            >
              {<img src={errors ? notConfirm : confirm} alt="confim-icon" />}
              <br />
              <br />
              {<h2>{errors ? "Reintentar" : "Guardado"}</h2>}
            </ConfirmChanges>
          ) : null}
        </>
      )}
    </main>
  );
}
