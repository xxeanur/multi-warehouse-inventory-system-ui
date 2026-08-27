

export const formatVolume = (volumeInCm3: number) => {
  if (!volumeInCm3) return "0 m³";
  
  // Her şeyi daima metreküpe çeviriyoruz
  const volumeInM3 = volumeInCm3 / 1000000;
  
  // Küçük raf hacimleri için virgülden sonra 4 haneye kadar göster (Örn: 0.045 m³)
  return `${volumeInM3.toLocaleString("tr-TR", { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 4 
  })} m³`; 
};

export const formatWeight = (weightInKg: number) => {
  if (!weightInKg) return "0 kg";
  return `${weightInKg.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} kg`;
};