import styles from "./disableProducts.module.css";
import bloquedCircle from "../../assets/icon/bloquedCircle.svg";
import dividerOne from "../../assets/icon/divider010.svg";
import { useEffect, useState } from "react";
import { useCategoriesStore } from "../../store/categories.store";
import { useProductsStore } from "../../store/products.store";
import searchIcon from "../../assets/icon/searchIcon.svg";
import dividerTwo from "../../assets/icon/divider0100.svg";
import bloquedIcon from "../../assets/icon/bloquedBtn.svg";
import indicatorOne from "../../assets/icon/enableIcon.svg";
import indicatorTwo from "../../assets/icon/paymentIcon.svg";
import backArrowBtn from "../../assets/icon/backArrowBtn.svg";
import arrow from "../../assets/icon/filterIcon.svg";
import { useModal } from "@/shared";
import { CONFIRM_PAYMENT_MODAL } from "@/lib/modals.lib";
import ConfirmChanges from "../modals/confirm/confirmChanges";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}

export default function DisableProducts({ isOpen, onClose, children }: Props) {
  const [selectCategory, setSelectCategory] = useState(null);
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categoriesArray = useCategoriesStore((state) => state.categoriesArray);
  const getProducts = useProductsStore((state) => state.getProducts);
  const productsArray = useProductsStore((state) => state.productsArray);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [searchProduct, setSearchProducts] = useState("");
  const disableProduct = useProductsStore((state) => state.disableProduct);
  const isLoading = useProductsStore((state) => state.isLoading);
  const errors = useProductsStore((state) => state.errors);
  const message = useProductsStore((state) => state.message);

  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  // Ensure productsArray is an array before using filter
  const filterBar = Array.isArray(productsArray)
    ? productsArray.filter((element) =>
        element.productName.toLowerCase().includes(searchProduct.toLowerCase())
      )
    : [];

  const filterByStatus = status
    ? filterBar.filter((element) => element.status === status)
    : filterBar;

  const confirmChanges = useModal(CONFIRM_PAYMENT_MODAL);

  return (
    <main className={styles.screen}>
      <div>
        <div>
          <div>
            <img src={bloquedCircle} alt="title-icon" />
            <h3>Desactivar productos</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <div>
            <div>
              <h3>Categorias</h3>
              <img src={dividerOne} alt="divider-icon" />
            </div>
            <div>
              {categoriesArray?.map((element) => (
                <button
                  key={element.id} // Make sure to add a unique key
                  style={
                    element.categoryName === selectCategory?.categoryName
                      ? { background: "white", color: "black" }
                      : {}
                  }
                  onClick={() => {
                    setSelectCategory(element);
                  }}
                >
                  {element.categoryName}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div>
              <div className={styles.containerInput}>
                <div className={styles.categoriesSelect}>
                  <div
                    className={styles.customSelect}
                    onClick={() => {
                      setToggleStatus(!toggleStatus);
                    }}
                  >
                    <div className={styles.selectTrigger}>
                      <img src={arrow} alt="" className={styles.arrowSelect} />
                      <span>
                        {status
                          ? status === "enabled"
                            ? "Activo"
                            : "Inactivo"
                          : "Todos"}
                      </span>
                    </div>
                    <div
                      className={toggleStatus ? styles.options : styles.hidden}
                    >
                      <span
                        onClick={() => {
                          setStatus("enabled");
                        }}
                        className={styles.option}
                      >
                        Activo
                      </span>
                      <span
                        onClick={() => {
                          setStatus("disabled");
                        }}
                        className={styles.option}
                      >
                        Inactivo
                      </span>
                      <span
                        onClick={() => {
                          setStatus(null);
                        }}
                        className={styles.option}
                      >
                        Todos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={searchIcon} alt="search-icon" />
                <input
                  type="text"
                  placeholder="Limonada mineral... Refresco sin azucar.... cafe americano..."
                  onChange={(e) => {
                    setSearchProducts(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3>Producto</h3>
                  <h3>Disponible</h3>
                  <h3>Acciones</h3>
                </div>
                <img src={dividerTwo} alt="f" />
              </div>
              {confirmChanges.isOpen &&
              confirmChanges.modalName === CONFIRM_PAYMENT_MODAL ? (
                <ConfirmChanges
                  actionType={getProducts}
                  errors={errors}
                  loading={isLoading}
                  isOpen={confirmChanges.isOpen}
                  onClose={confirmChanges.closeModal}
                >
                  Cambios guardados
                </ConfirmChanges>
              ) : null}
              <div>
                {filterByStatus?.map((element) => (
                  <div key={element._id}>
                    <h3>{element.productName}</h3>
                    <div>
                      {element.status === "enabled" ? (
                        <>
                          <img src={indicatorOne} alt="indicator-icon" />
                          <h3>Sí</h3>
                        </>
                      ) : (
                        <>
                          <img src={indicatorTwo} alt="indicator-icon" />
                          <h3>No</h3>
                        </>
                      )}
                    </div>
                    <div>
                      {element.status === "enabled" ? (
                        <button
                          onClick={() => {
                            confirmChanges.openModal();
                            disableProduct(element._id, { status: "disabled" });
                          }}
                        >
                          <img src={bloquedIcon} alt="bloqued-icon" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            confirmChanges.openModal();
                            disableProduct(element._id, { status: "enabled" });
                          }}
                        >
                          <img src={backArrowBtn} alt="back-icon" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
