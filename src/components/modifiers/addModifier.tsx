import styles from "./addModifier.module.css";
import addCircle from "../../assets/icon/addCircle.svg";
import saveIcon from "../../assets/icon/disquetIcon.svg";
import cleanIcon from "../../assets/icon/cleanBtn.svg";
import dividerOne from "../../assets/icon/divider01000.svg";
import dividerTwo from "../../assets/icon/divider02000.svg";
import { useDishesStore } from "../../store/dishes.store";
import crossBtn from "../../assets/icon/crossButton.svg";
import { useEffect, useState } from "react";
import { staticModifiers } from "../../lib/modifiers.lib";
import { useModifiersStore } from "../../store/modifiers.store";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  product: any;
}
export default function AddModifier({
  isOpen,
  onClose,
  children,
  product,
}: Props) {
  const getDishes = useDishesStore((state) => state.getDishes);
  const dishesArray = useDishesStore((state) => state.dishesArray);
  const getModifiers = useModifiersStore((state) => state.getModifiers);
  const modifiersArray = useModifiersStore((state) => state.modifiersArray);
  const [dishes, setDishes] = useState<any[]>([]);
  const [selectedModifier, setSelectedModifier] = useState();

  useEffect(() => {
    console.log(modifiersArray);
    getModifiers();
    getDishes();
  }, []);
  return (
    <main className={styles.screen}>
      <div>
        <div>
          <div>
            <img src={addCircle} alt="tittle-icon" />
            <h3>Complementos y modificadores</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <h3>{product.productName}</h3>
          <div>
            {dishes?.map((element, index) => (
              <div>
                <h3>{element.dishesName}</h3>
                <button
                  onClick={() => {
                    const filterDishes = dishes.filter((_, i) => i !== index);
                    setDishes(filterDishes);
                  }}
                >
                  <img src={crossBtn} alt="cross-button" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div>
              <h3>Complementos</h3>
              <img src={dividerOne} alt="divider-icon" />
            </div>
            <div>
              {dishesArray?.map((element, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const settingDishes = !dishes.length
                      ? [element]
                      : [...dishes, element];
                    setDishes(settingDishes);
                  }}
                >
                  {element.dishesName}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div>
              <h3>Modificadores</h3>
              <img src={dividerTwo} alt="divider-two" />
            </div>
            <div>
              <div>
                {staticModifiers.map((element) => (
                  <button
                    style={
                      selectedModifier?.tittle === element.tittle
                        ? {
                            background: "white",
                            color: "black",
                            fontWeight: "400",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSelectedModifier(element);
                    }}
                    key={element.tittle}
                  >
                    {element.tittle}
                  </button>
                ))}
              </div>
              <div>
                {modifiersArray?.map((element, index) => (
                  <button key={index}>{element.modifierName}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setDishes([]);
            }}
          >
            <img src={cleanIcon} alt="clean-icon" />
            Borrar todo
          </button>
          <button className={styles.saveBtn}>
            <img src={saveIcon} alt="save-icon" />
            Guardar
          </button>
        </div>
      </div>
    </main>
  );
}
