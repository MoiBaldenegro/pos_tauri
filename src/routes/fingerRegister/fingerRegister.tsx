// styles
import HeaderOne from "../../components/headers/headerOne/headerOne";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import styles from "./fingerRegister.module.css";
// icons
import divider from "./../../assets/icon/dividerUsers.svg";
import searchIcon from "./../../assets/icon/searchIcon.svg";
import usersCircleIcon from "./../../assets/icon/usersCircleIcon.svg";
import homeButtonIcon from "./../../assets/icon/homeButtonIcon.svg";
import registerFingerIcon from "./../../assets/icon/RegisterFingerIcon.svg";
import pendingIcon from "../../assets/icon/paymentIcon.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import UseUsers from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import Register from "./register/register";
import { User } from "../../types/User";
import { initialUser } from "./utils/initialUser";
import { useNavigate } from "react-router-dom";

export default function FingerRegister() {
  const { usersArray, getUsers } = UseUsers();
  const [selectUser, setSelectUser] = useState<User>(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        <section>
          <div>
            <img src={registerFingerIcon} alt="register-finger-icon" />
            <h2>Registro de huellas</h2>
          </div>
          {selectUser.name.length > 0 ? (
            <Register user={selectUser} setUser={setSelectUser} />
          ) : (
            <div className={styles.noUserSelected}></div>
          )}
        </section>
        <section className={styles.employeesContainer}>
          <div>
            <img src={usersCircleIcon} alt="users-icon-circle" />
            <h1>Empleados</h1>
          </div>
          <div>
            <img src={searchIcon} alt="search-icon" />
            <input
              placeholder="Dave mustaine...    James hetfield...    etc..."
              type="search"
            />
          </div>
          <div>
            <div className={styles.usersContainerHeader}>
              <h2>Código</h2>
              <h2>Nombre completo</h2>
              <h2>huella</h2>
            </div>
            <img src={divider} alt="divider" />
            {usersArray?.map((element: any, index: any) => (
              <div
                key={index}
                className={styles.userBox}
                onClick={() => {
                  setSelectUser({
                    email: element.email,
                    name: element.name,
                    color: element.color,
                    employeeNumber: element.employeeNumber,
                    lastName: element.lastName,
                    samples: element.samples,
                    _id: element._id,
                  });
                }}
              >
                <div
                  className={styles.avatar}
                  style={{ background: element.color }}
                >
                  <h1>{element.name.slice(0, 2).toUpperCase()}</h1>
                </div>
                <h3>{element.employeeNumber}</h3>
                <h3
                  className={styles.name}
                >{`${element.name.toUpperCase()} ${element.lastName.toUpperCase()}`}</h3>
                <div>
                  <img
                    src={element.samples.length ? enableIcon : pendingIcon}
                    alt="icon-status"
                  />
                  <span>{element.samples.length ? "Sí" : "No"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <button
          onClick={() => {
            navigate("/sell-types");
          }}
        >
          <img src={homeButtonIcon} alt="home-icon" />
          Inicio
        </button>
      </footer>
    </div>
  );
}
