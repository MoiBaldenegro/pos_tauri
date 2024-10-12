import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";
import { useState } from "react";
import axios from "../configs/axios";
import { USERS_PATH } from "../lib/routes.paths.lib";

export default function UseFingerCapture() {
  const [reader, setReader] = useState<FingerprintReader | null>(null);
  const [message, setMessage] = useState<string>();
  const [complete, setComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [huella, setHuella] = useState<any[]>([]);

  const initReader = async () => {
    try {
      const fingerprintReader = new FingerprintReader();
      setReader(fingerprintReader);
      console.log("Fingerprint reader initialized:", fingerprintReader);

      fingerprintReader.on("SamplesAcquired", onSamplesAcquired);
      fingerprintReader.on("QualityReported", onQualityReported);

      await fingerprintReader.startAcquisition(
        SampleFormat.Raw,
        "D10C5D6F-6A62-A447-89B7-A4BB77B7BA10"
      );
      console.log("Fingerprint acquisition started successfully.");
    } catch (error) {
      console.error("Error during fingerprint reader initialization:", error);
    }
  };

  const onSamplesAcquired = async (event: any) => {
    try {
      const samples = event.samples;
      console.log(samples);

      const fingercapture = samples[0].Data.replace(/_/g, "/").replace(
        /-/g,
        "+"
      );

      // Actualizar el estado proporcionando un nuevo array con las nuevas muestras
      setHuella((prevHuella) => {
        const fingersArray = prevHuella?.length
          ? [...prevHuella, fingercapture]
          : [fingercapture];
        return fingersArray;
      });

      setReader(null);
    } catch (error) {
      console.error("Error al procesar muestras de huellas dactilares:", error);
    }
  };

  const onQualityReported = async (event: any) => {
    const quality = event.quality;
    try {
      if (quality !== 0) {
        console.log("La calidad de la muestra no es buena.");
      } else {
        setMessage("Captura exitosa");
        setTimeout(() => {
          setMessage("");
        }, 800);
      }
    } catch (error) {
      console.error("Error durante la verificación de calidad:", error);
    } finally {
      try {
        // Asegurarse de que stopAcquisition siempre se llame, incluso en caso de un error.
        await reader?.stopAcquisition("D10C5D6F-6A62-A447-89B7-A4BB77B7BA10");
        console.log("Adquisición detenida correctamente.");
      } catch (error) {
        console.error("Error al detener la adquisición:", error);
      } finally {
        // Asegurarse de la limpieza consistente, establecer reader como null.
        setReader(null);
      }
    }
  };

  const saveSamples = async (id: string, data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await axios.put(`${USERS_PATH}/${id}`, { samples: data });
      if (!res.data) {
        setIsLoading(false);
        setErrors("No se ha podido actualizar");
        throw new Error(`No se pudo actualizar`);
      }

      setIsLoading(false);
      const userUpdated = res.data;
      return userUpdated;
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setErrors("Error de red. Verifica tu conexión a Internet.");
        return;
      }
      setErrors("Ha ocurrido algo inesperado");
      console.error(`Ha ocurrido algo inesperado ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initReader,
    huella,
    setHuella,
    message,
    setReader,
    complete,
    saveSamples,
    isLoading,
    errors,
    onQualityReported,
  };
}
