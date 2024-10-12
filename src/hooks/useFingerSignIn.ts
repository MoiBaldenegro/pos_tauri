import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";
import { useState } from "react";
import axios from "../configs/axios";
import { USERS_PATH } from "../lib/routes.paths.lib";

export default function UseFingerSignIn(openModal: any) {
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

      fingerprintReader.on("QualityReported", onQualityReported);
      fingerprintReader.on("SamplesAcquired", onSamplesAcquired);

      await fingerprintReader.startAcquisition(
        SampleFormat.PngImage,
        "D10C5D6F-6A62-A447-89B7-A4BB77B7BA10"
      );
      console.log("Fingerprint acquisition started successfully.");
    } catch (error) {
      console.error("Error during fingerprint reader initialization:", error);
    }
  };

  const onQualityReported = async (event: any) => {
    const quality = event.quality;
    const sample = event.samples;
    try {
      if (quality !== 0) {
        console.log("La calidad de la muestra no es buena.");
      } else {
        setMessage("Captura exitosa");
        openModal();

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
      } catch (error) {
        console.error("Error al detener la adquisición:", error);
      } finally {
        // Asegurarse de la limpieza consistente, establecer reader como null.
        setReader(null);
      }
    }
  };

  const onSamplesAcquired = async (event: any) => {
    try {
      const samples = event.samples;
      console.log(samples);
      const fingercapture = samples[0].replace(/_/g, "/").replace(/-/g, "+");

      const res = axios.post("https://localhost:7228/extract-features", {
        fingerprintSample: fingercapture,
      });

      setReader(null);
      return (await res).data;
    } catch (error) {
      console.error("Error al procesar muestras de huellas dactilares:", error);
    }
  };

  return {
    initReader,
    huella,
    setHuella,
    message,
    setReader,
    complete,
    isLoading,
    errors,
    onQualityReported,
  };
}
